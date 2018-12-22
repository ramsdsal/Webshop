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
    public class FavoritController : Controller
    {
        private readonly DbConnectionContext _context;
        public FavoritController(DbConnectionContext context)
        {
            this._context = context;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {

            var result = this._context.Favorits
                .Where(fav => fav.UserId == id)
                .Select(fav => new
                {
                    fav.ProductId,

                });

            return new OkObjectResult(result);
        }

        [HttpPost("set")]
        public IActionResult AddToFavorite([FromBody] Favorit favorit)
        {

            if (favorit == null)
            {
                return new OkObjectResult(new { isError = true, response = "Er is iets fout gegaan... Probeer het later." });
            }

            _context.Favorits.Add(favorit);
            _context.SaveChanges();

            return new OkObjectResult(new { isError = false, response = "Prijs is succesvol toegevoegd." });
        }


    }
}