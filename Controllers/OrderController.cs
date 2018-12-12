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
        public class IdDate
        {
            public int UserId { get; set; }
            public int Count { get; set; }
        }
        [HttpGet("GetMonth")]
        public IActionResult GetYearMonth()
        {
            var months = new List<string>();
            var sums = new List<double>();

            var SumMonth = from o in _context.Orders
                         join op in _context.OrderProducts on o.Id equals op.OrderId
                         group op by new { o.Date.Month, o.Date.Year } into g
                         orderby g.Key.Month
                         select new { 
                             Month = new DateTime(2000, g.Key.Month,01).ToString("MMMM"),
                             Sum = g.Sum(t => t.Price),
                             Year = g.Key.Year
                         };

            foreach (var table in SumMonth)
            {
                months.Add(table.Month);
                sums.Add(table.Sum);
            }     
            var result = new {Months = months, Sums = sums};


            return Ok(result);
        }

        [HttpGet("OrderStatusCount")]
        public IActionResult GetCount()
        {
            var result = from op in _context.OrderProducts
                         select(op.Price);
            result.Sum();
                                            
            return Ok(result);
        }

        public class OrderStatusCount
        {
            public int OrderStatus { get; set; }
            public int Count { get; set; }
        }

        public class SumPricePerMonth
        {
            public string Month {get; set; }
            public int Year { get; set; }
            public double Sum { get; set; }
        }
    }
}