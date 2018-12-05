using System;
using System.Collections.Generic;

namespace webshop.Models
{
    public class Product : BaseEntity
    {
        public string Title { get; set; }
        public int Year { get; set; }
        public DateTime Released { get; set; }
        public int RunTime { get; set; }
        public string Description { get; set; }
        public string Poster { get; set; }
        public int AgeRating { get; set; }
        public string TrailerUrl { get; set; }
        public int Quantity { get; set; }
        public List<Price> Prices { get; set; }
        public List<ProductCategory> Categories { get; set; }
        public List<OrderProduct> Orders { get; set; }
        public List<Favorit> Favorits { get; set; }
    }
}
