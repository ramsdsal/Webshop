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

        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            var allDiscounts = _context.Discounts.Select(d => d).OrderBy(discount => discount.Id);

            return new ObjectResult(allDiscounts);
        }

        [HttpPost("AddDiscount")]
        public IActionResult AddDiscount([FromBody] Discount discount)
        {
            if (discount == null)
            {
                return new OkObjectResult(new {isError = true, discountAdded = false, response = "Korting is niet goed ingevuld."});
            }
			
				bool discountWithSamePercentageExists = _context.Discounts.Any(dis => dis.Percentage == discount.Percentage);
                if (discountWithSamePercentageExists == false)
                {
                    _context.Discounts.Add(discount);
                    _context.SaveChanges();    

                    return new OkObjectResult(new {isError = false, discountAdded = true, response = "Korting is succesvol toegevoegd."});
              
                }

                return new OkObjectResult(new {isError = true, discountAdded = false, response = "Korting met dezelfde percentage bestaat al."});
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

        [HttpGet("UpdateDiscount/{discountId}")]
        public IActionResult UpdateDiscount(int discountId)
        {
            var result = this._context.Discounts.Select(dis => dis).OrderBy(discount => discount.Id);
            foreach (var discount in result)
            {
                if (discount.Id == discountId)
                {
                    discount.Current = 1;
                }
                else
                {
                    discount.Current = 0;
                }
            }

            _context.SaveChanges();

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