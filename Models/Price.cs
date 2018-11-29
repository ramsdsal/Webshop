using System;

namespace webshop.Models
{
    public class Price : BaseEntity
    {
        public Product Product;
        public double Value { get; set; }
        public DateTime DateOn { get; set; }
        public DateTime? DateOff { get; set; }
        public int Current { get; set; }


    }
}