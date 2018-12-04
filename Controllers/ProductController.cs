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
    public class ProductController : Controller
    {
        private readonly DbConnectionContext _context;
        public ProductController(DbConnectionContext context)
        {
            this._context = context;
        }

        // GET api/Products
        [HttpGet]
        public IActionResult Get()
        {
            var result = this._context.Products.Select(product => new
            {
                Id = product.Id,
                Title = product.Title,
                Year = product.Year,
                Poster = product.Poster,
                Price = product.Prices.Where(price => price.Current == 1).Select(price => price.Value).DefaultIfEmpty(-1000000).Single()//Return -1000000 if no price was found
            });

            return new OkObjectResult(result);
        }
        
        [HttpGet("search")]
        public IActionResult GetSearchItems()
        {
            var result = this._context.Products.Select(product => new
            {
                product.Id,
                product.Title,
            }).ToArray();

            return new OkObjectResult(result);
        }

        [HttpGet("{id}")]
        public IQueryable Get(int id)
        {

            var result = this._context.Products
                        .Select(prod => new
                        {
                            Id = prod.Id,
                            Title = prod.Title,
                            Quantity = prod.Quantity,
                            Year = prod.Year,
                            Released = prod.Released,
                            RunTime = prod.RunTime,
                            Description = prod.Description,
                            Poster = prod.Poster,
                            TrailerUrl = prod.TrailerUrl,
                            AgeRating = prod.AgeRating, // Be aware 'Categories' is of type string, the string.join joins all of the genres with eachother to 1 string seperated with comma's
                            Categories = string.Join(" | ", prod.Categories.Select(productCategory => productCategory.Category.Name)),
                            Price = prod.Prices.Where(price => price.Current == 1).Select(price => price.Value).DefaultIfEmpty(-1000000).Single()//Return -1000000 if no price was found
                        }).Where(prod => prod.Id == id);

            return result;
        }

        // [HttpGet("GetAdminProducts/{index_page}/{page_size}")]
        // public IActionResult GetAdminProducts(int index_page, int page_size)
        // {
        //     Page<Product> paginationResult = _context.Products.GetPages(index_page, page_size, m => m.Id, "Prices");

        //     IEnumerable<object> resultToReturn = paginationResult.Items.Select(prod => new
        //     {
        //         Id = prod.Id,
        //         Title = prod.Title,
        //         Quantity = prod.Quantity,
        //         Price = prod.Prices.Where(price => price.Current == 1).Select(price => price.Value).DefaultIfEmpty(-1000000).Single(),//Return -1000000 if no price was found
        //     });
        //     return new OkObjectResult(new {TotalPages = paginationResult.TotalPages, Items = resultToReturn});
        // }

        //         //Get items per page
        // [HttpGet("page/{index_page}/{page_size}")]
        // public IActionResult GetProductsPaged(int index_page, int page_size)
        // {
        //     Page<Product> paginationResult = _context.Products.GetPages(index_page, page_size, m => m.Id, "Prices");
            
        //     IEnumerable<object> resultToReturn = paginationResult.Items.Select(prod => new 
        //     {
        //         Id = prod.Id,
        //         Title = prod.Title,
        //         Year = prod.Year,
        //         Poster = prod.Poster,                
        //         Price = prod.Prices.Where(price => price.Current == 1).Select(price => price.Value).DefaultIfEmpty(-1000000).Single()//Return -1000000 if no price was found
        //     });

        //     return new OkObjectResult(new {TotalPages = paginationResult.TotalPages, Items = resultToReturn});
        // }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}