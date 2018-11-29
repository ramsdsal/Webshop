using System;

namespace webshop.Models
{

    public class Discount : BaseEntity
    {
        public string Name { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
        public double Percentage { get; set; }
        public int? Current { get; set; }
        public DateTime DateOn { get; set; }
        public DateTime? DateOff { get; set; }
    }
}