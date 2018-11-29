using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;


namespace webshop.Models
{
    public class Address : BaseEntity
    {

        public string Street { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string ZipCode { get; set; }

        public DateTime DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
        public List<UserAddress> Users { get; set; }
    }
}