using System;
using System.Collections.Generic;
using System.Globalization;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using webshop.Models;

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

        [HttpGet("GetStats/{requestedTitle}")]
        public IActionResult GetYearMonth(string requestedTitle)
        {
            var testMonths = new List<string>();
            
            var months = new List<string>();
            var testSums = new List<double>();
            var sums = new List<double>();
            var titles = new List<string>();
            var quantity = new List<int>();
            var prices = new List<double>();
            var dates = new List<string>();
            string[] sampleMonths = DateTimeFormatInfo.CurrentInfo.MonthNames;
            

            var titleQuantity = (from op in _context.OrderProducts
                         join p in _context.Products on op.ProductId equals p.Id
                         group op by p.Title into groupTitle
                         orderby groupTitle.Sum(p => p.Quantity) descending
                         select new {Title = groupTitle.Key,
                                     TotSell = groupTitle.Sum(p => p.Quantity)}).Take(5);

            var profitPerMonth = from o in _context.Orders
                         where o.OrderStatus == 1
                         join op in _context.OrderProducts on o.Id equals op.OrderId
                         group op by new { o.Date.Month, o.Date.Year } into groupTable
                         orderby groupTable.Key.Month
                         select new { 
                             Month = new DateTime(2000, groupTable.Key.Month,01).ToString("MMMM"),
                             Sum = groupTable.Sum(t => t.Price),
                             Year = groupTable.Key.Year
                         };

            var priceChange = from p in _context.Prices
                         join pr in _context.Products on p.ProductId equals pr.Id
                         where pr.Title == requestedTitle
                         orderby p.DateOn
                         select new { Title = pr.Title, Price = p.Value, Date = p.DateOn.Date };

            

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

            for (int i = 0; i < 12; i ++)
            {
                if(testMonths.Contains(sampleMonths[i]))
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
            foreach (var table in priceChange)
            {
                prices.Add(table.Price);
                dates.Add(table.Date.ToString("dd-MM-yyyy"));
            }

            var result = new {
                Months = months, Sums = sums, 
                Titles = titles, Total = quantity, 
                Dates = dates, Prices = prices};


            return Ok(result);
        }
    }
}