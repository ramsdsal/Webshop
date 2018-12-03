using System;
using System.Collections.Generic;

namespace webshop.Models
{
    public class UserAuthentication : BaseEntity
    {
        public int UserId { get; set; }
        public User User { get; set; }
        public string Token { get; set; }

    }
}