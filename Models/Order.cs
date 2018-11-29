using System;
using System.Collections.Generic;

namespace webshop.Models
{
    public class Order : BaseEntity
    {
        public int UserId { get; set; }
        public int DiscountId { get; set; }
        public Discount Discount { get; set; }
        public DateTime Date { get; set; }
        public int OrderStatus { get; set; }
        public string ZipCode { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public List<OrderProduct> Products { get; set; }

    }
}