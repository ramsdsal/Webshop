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

        [HttpGet("GetCategories")]
        public IActionResult GetCategories()
        {
            var result = this._context.Categories.Select(cat => new {
                text = cat.Name,
                value = cat.Id
            }).ToList();
            return Ok(result);
        }

        [HttpPost("addcategory")]
        public IActionResult Add([FromBody] Category category)
        {
            Category existingCategory = _context.Categories.FirstOrDefault(cat => cat.Name == category.Name);

            if(existingCategory == null)
            {                        
                _context.Categories.Add(category);
                _context.SaveChanges();

                return new OkObjectResult(new {isError = false, categoryAdded = true, response = "Categorie toegevoegd."});
            }
            return new OkObjectResult(new {isError = true, categoryAdded = false, response = "Categorie bestaat al"});
        }

        [HttpPost("addproductcategory")]
        public IActionResult Add([FromBody] ProductCategory productCategory)
        {            
            _context.ProductCategories.Add(productCategory);
            _context.SaveChanges();
            return Ok();
        }

    }
}