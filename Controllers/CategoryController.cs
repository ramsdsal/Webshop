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
    public class CategoryController : Controller
    {
        private readonly DbConnectionContext _context;
        public CategoryController(DbConnectionContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public IActionResult GetAction()
        {
            var result = this._context.Categories.Select(cat => new
            {
                Id = cat.Id,
                Name = cat.Name
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