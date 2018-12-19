using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using webshop.Models;


namespace webshop.Controllers
{
    [Route("api/[controller]")]
    public class PriceController : Controller
    {
        private readonly DbConnectionContext _context;
        public PriceController(DbConnectionContext context)
        {
            this._context = context;
        }

		 [HttpPost("AddPrice")]
        public IActionResult AddPrice([FromBody] Price price)
        {
            if (price == null)
            {
                return new OkObjectResult(new {isError = true, priceAdded = false, response = "Prijs is niet goed ingevuld."});
            }
			
			Product product = _context.Products.Where(pro => pro.Id == price.Product.Id).Include(pro => pro.Prices).FirstOrDefault();

            if (product != null)
            {
				List<Price> prices = _context.Products.Where(pro => pro.Id == product.Id).SelectMany(pro => pro.Prices).Where(pri => pri.Current == 1).ToList();
                foreach (var pri in prices)
                {
                    pri.Current = 0;
					//Date off and date on maybe??
                }
				
				price.Product = product;
				product.Prices.Add(price);
				
                _context.SaveChanges();
                
                return new OkObjectResult(new {isError = false, priceAdded = true, response = "Prijs is succesvol toegevoegd."});
            }

            return new OkObjectResult(new {isError = true, priceAdded = false, response = "Product bestaat niet."});

        }
    }
}
