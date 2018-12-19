using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webshop.Models;
using webshop.Pagination;


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

        [HttpPut("UpdateProduct")]
        public IActionResult UpdateProduct([FromBody] Product product)
        {
            Product productToUpdate = _context.Products.FirstOrDefault(pr => pr.Id == product.Id);
            if (productToUpdate != null)
            {
                productToUpdate.Title = product.Title;
                productToUpdate.Released = product.Released;
                productToUpdate.RunTime = product.RunTime;
                productToUpdate.Description = product.Description;
                productToUpdate.Poster = product.Poster;
                productToUpdate.AgeRating = product.AgeRating;
                productToUpdate.TrailerUrl = product.TrailerUrl;
                productToUpdate.Quantity = product.Quantity;

                _context.SaveChanges();

                return new OkObjectResult(new {isError = false, productUpdated = true, response = "Product is aangepast."});
            }

            return new OkObjectResult(new {isError = true, productUpdated = false, response = "Product bestaat niet."});
        }

        [HttpGet("GetUpdateProduct/{id}")]
        public IQueryable GetUpdateProduct(int id)
        {
            var result = this._context.Products
                        .Select(prod => new
                        {
                            Id = prod.Id,
                            Title = prod.Title,
                            Quantity = prod.Quantity,
                            Released = prod.Released,
                            RunTime = prod.RunTime,
                            Description = prod.Description,
                            Poster = prod.Poster,
                            TrailerUrl = prod.TrailerUrl,
                            AgeRating = prod.AgeRating,
                            Prices = prod.Prices.Select(p => p)
                        }).Where(prod => prod.Id == id);

            return result;
        }
        
        [HttpGet("GetTitles")]
        public IActionResult GetTitles()
        {
            var result = this._context.Products.Select(product => new
            {
                product.Title
            }).ToList();

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
        [HttpPost("getShoppingcart")]
        public IActionResult Post([FromBody]int[] items)
        {

            var result = this._context.Products
                       .Select(prod => new
                       {
                           Id = prod.Id,
                           Title = prod.Title,
                           Poster = prod.Poster,
                           Quantity = prod.Quantity,
                           Price = prod.Prices.Where(price => price.Current == 1).Select(price => price.Value).Single()
                       }).Where(prod => items.Contains(prod.Id));


            return new OkObjectResult(result);

        }

        [HttpGet("adminproducts/{index_page}/{page_size}")]
        public IActionResult GetAdminProducts(int index_page, int page_size)
        {
            Page<Product> paginationResult = _context.Products.GetPages(index_page, page_size, m => m.Id, "Prices");

            IEnumerable<object> resultToReturn = paginationResult.Items.Select(prod => new
            {
                Id = prod.Id,
                Title = prod.Title,
                Quantity = prod.Quantity,
                Price = prod.Prices.Where(price => price.Current == 1).Select(price => price.Value).DefaultIfEmpty(-1000000).Single(),//Return -1000000 if no price was found
            });
            return new OkObjectResult(new {TotalPages = paginationResult.TotalPages, Items = resultToReturn});
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


        [HttpPost("addproduct")]
        public IActionResult Post([FromBody] Product product)
        {
            _context.Products.Add(product);
            _context.SaveChanges();
            return Ok();
        }


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