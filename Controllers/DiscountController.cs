using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using webshop.Models;
using webshop.Pagination;

namespace webshop.Controllers
{
    [Route("api/[controller]")]
    public class DiscountController : Controller
    {
        private readonly DbConnectionContext _context;
        public DiscountController(DbConnectionContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public IActionResult GetAction()
        {
            var result = this._context.Discounts
            .Where(dis => dis.Current == 1)
            .Select(dis => new
            {
                dis.Percentage
            });

            return new ObjectResult(result);
        }

        [HttpPost("addcategory")]
        public IActionResult Add([FromBody] Category category)
        {
            _context.Categories.Add(category);
            _context.SaveChanges();
            return Ok();
        }

    }
}