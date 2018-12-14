using System;
using System.Collections.Generic;
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

        [HttpGet("GetMonth")]
        public IActionResult GetYearMonth()
        {
            var months = new List<string>();
            var sums = new List<double>();

            var sumMonth = from o in _context.Orders
                         join op in _context.OrderProducts on o.Id equals op.OrderId
                         group op by new { o.Date.Month, o.Date.Year } into groupedTable
                         orderby groupedTable.Key.Month
                         select new { 
                             Month = new DateTime(2000, groupedTable.Key.Month,01).ToString("MMMM"),
                             Sum = groupedTable.Sum(t => t.Price),
                             Year = groupedTable.Key.Year
                         };

            foreach (var table in sumMonth)
            {
                months.Add(table.Month);
                sums.Add(table.Sum);
            }     
            var result = new {Months = months, Sums = sums};


            return Ok(result);
        }
        [HttpGet("mostProducts")]
        public IActionResult GetMaxProducts()
        {
            var Titles = new List<string>();
            var Quantity = new List<int>();

            var groupedTable = (from op in _context.OrderProducts
                         join p in _context.Products on op.ProductId equals p.Id
                         group op by p.Title into groupTitle
                         orderby groupTitle.Sum(p => p.Quantity) descending
                         select new {Title = groupTitle.Key,
                                     TotSell = groupTitle.Sum(p => p.Quantity)}).Take(5);
            foreach (var table in groupedTable)
            {
                Titles.Add(table.Title);
                Quantity.Add(table.TotSell);
            }
            var result = new { Titles = Titles, Total = Quantity };
            
            return Ok(result);
        }

    }
}