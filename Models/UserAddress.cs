using System;

namespace webshop.Models
{
    public class UserAddress
    {
        public int UserId { get; set; }
        public User User { get; set; }
        public int AddressId { get; set; }
        public Address Address { get; set; }
        public int? Current { get; set; }
    }
}