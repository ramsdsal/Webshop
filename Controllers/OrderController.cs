using System;
using System.Collections.Generic;
using System.Globalization;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using webshop.Models;
using Microsoft.EntityFrameworkCore;

namespace webshop.Controllers
{
    [Route("api/[controller]")]
    public class OrderController : Controller
    {
        private readonly DbConnectionContext _context;
        public OrderController(DbConnectionContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public IActionResult GetAction()
        {
            var result = _context.Orders;
            return Ok(result);
        }

        [HttpGet("GetOrdersForManage")]
        public IActionResult GetOrdersForManage()
        {
            var allOrders = _context.Orders.Select(o => o);
            var finishedOrders = allOrders.Where(o => o.OrderStatus == 1).OrderBy(o => o.Date);
            var pendingOrders = allOrders.Where(o => o.OrderStatus == 0).OrderBy(o => o.Date);

            return new OkObjectResult(new { FinishedOrders = finishedOrders, PendingOrders = pendingOrders });

        }

        [HttpPut("OrderProduct/{productId}/{quantityToOrder}")]
        public IActionResult OrderProduct(int productId, int quantityToOrder)
        {
            Product product = _context.Products.Where(pro => pro.Id == productId).FirstOrDefault();
            if (product != null)
            {
                product.Quantity += quantityToOrder;
                _context.SaveChanges();

                //Quantity changed
                return new OkObjectResult(new { NewQuantity = product.Quantity, isError = false, orderUpdated = true, response = "Product hoeveelheid is aangepast." });
            }

            //Product not found
            return new OkObjectResult(new { isError = true, orderUpdated = false, response = "Product niet gevonden." });
        }

        [HttpPut("ApproveOrder/{orderId}")]
        public IActionResult ApproveOrder(int orderId)
        {
            Order order = _context.Orders.Where(o => o.Id == orderId).Include("Products.Product").FirstOrDefault();
            if (order != null && order.OrderStatus == 1)
            {
                return new OkObjectResult(new { orderStatus = 1, isError = true, orderUpdated = false, response = "Bestelling is al geaccepteerd." });
            }

            if (order != null)
            {
                bool productsHaveEnoughQuantity = true;
                //Check if every product is in stock
                foreach (var orderProduct in order.Products)
                {
                    if (orderProduct.Product != null && orderProduct.Quantity <= orderProduct.Product.Quantity)
                    {
                        orderProduct.Product.Quantity -= orderProduct.Quantity;
                    }
                    else
                    {
                        productsHaveEnoughQuantity = false;
                    }
                }

                if (productsHaveEnoughQuantity)
                {
                    order.OrderStatus = 1;
                    _context.SaveChanges();

                    //Succesful
                    return new OkObjectResult(new { orderStatus = 1, isError = false, orderUpdated = true, response = "Bestelling is geaccepteerd." });
                }

                //Not enough Quantity of products
                return new OkObjectResult(new { orderStatus = 0, isError = true, orderUpdated = false, response = "Niet genoeg producten in voorraad, bestel eerst de benodigde producten." });
            }

            //Order could not be found
            return new OkObjectResult(new { orderStatus = 0, isError = true, orderUpdated = false, response = "Bestelling niet gevonden" });
        }

        [HttpGet("GetOrderById/{id}")]
        public IQueryable GetOrderById(int id)
        {
            var result = this._context.Orders
                        .Select(order => new
                        {
                            order.Id,
                            order.OrderStatus,
                            order.Name,
                            order.Street,
                            order.Total,
                            TotalWithDiscount = order.TotalWithDiscoun,
                            order.ZipCode,
                            Products = order.Products.Select(pr => pr).Select(pr => new
                            {
                                Id = pr.ProductId,
                                pr.Quantity,
                                pr.Price,
                                pr.Product.Title,
                                StockQuantity = _context.Products.Where(pro => pro.Id == pr.ProductId).Select(pro => pro.Quantity)
                            }),

                        }).Where(order => order.Id == id);

            return result;
        }

        [HttpGet("GetStats/")]
        public IActionResult GetYearMonth()
        {
            var testMonths = new List<string>();

            var months = new List<string>();
            var testSums = new List<double>();
            var sums = new List<double>();
            var titles = new List<string>();
            var quantity = new List<int>();
            string[] sampleMonths = DateTimeFormatInfo.CurrentInfo.MonthNames;


            var titleQuantity = (from op in _context.OrderProducts
                                 join p in _context.Products on op.ProductId equals p.Id
                                 group op by p.Title into groupTitle
                                 orderby groupTitle.Sum(p => p.Quantity) descending
                                 select new
                                 {
                                     Title = groupTitle.Key,
                                     TotSell = groupTitle.Sum(p => p.Quantity)
                                 }).Take(5);

            var profitPerMonth = from o in _context.Orders
                                 where o.OrderStatus == 1
                                 join op in _context.OrderProducts on o.Id equals op.OrderId
                                 group op by new { o.Date.Month, o.Date.Year } into groupTable
                                 orderby groupTable.Key.Month
                                 select new
                                 {
                                     Month = new DateTime(2000, groupTable.Key.Month, 01).ToString("MMMM"),
                                     Sum = groupTable.Sum(t => t.Price),
                                     Year = groupTable.Key.Year
                                 };

            var dropDownTitles = this._context.Products.Select(product => new
            {
                text = product.Title,
                value = product.Id,
            }).ToList();

            foreach (var table in titleQuantity)
            {
                titles.Add(table.Title);
                quantity.Add(table.TotSell);
            }

            foreach (var table in profitPerMonth)
            {
                testMonths.Add(table.Month);
                testSums.Add(table.Sum);
            }

            for (int i = 0; i < 12; i++)
            {
                if (testMonths.Contains(sampleMonths[i]))
                {
                    months.Add(sampleMonths[i]);
                    sums.Add(testSums[testMonths.IndexOf(sampleMonths[i])]);
                }
                else
                {
                    months.Add(sampleMonths[i]);
                    sums.Add(0);
                }
            }

            var result = new
            {
                Months = months,
                Sums = sums,
                Titles = titles,
                Total = quantity,
                Dropdown = dropDownTitles
            };


            return Ok(result);
        }

        [HttpGet("GetPriceChanges/{id}")]
        public IActionResult GetPriceChanges(int id)
        {
            var prices = new List<double>();
            var dates = new List<string>();

            var priceChange =
                from p in _context.Prices
                join pr in _context.Products on p.ProductId equals pr.Id
                where p.ProductId == id
                orderby p.DateOn
                select new { Title = pr.Title, Price = p.Value, Date = p.DateOn.Date };


            foreach (var table in priceChange)
            {
                prices.Add(table.Price);
                dates.Add(table.Date.ToString("dd-MM-yyyy"));
            }

            var result = new { Dates = dates, Prices = prices };

            return Ok(result);
        }

        [HttpPost("save")]
        public IActionResult SaveOrder([FromBody] Order order)
        {

            _context.Orders.Add(order);
            _context.SaveChanges();

            return new OkResult();

        }
    }
}