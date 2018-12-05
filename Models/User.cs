using System;
using System.Collections.Generic;

namespace webshop.Models
{
    public class User : BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime BirthDate { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public List<UserAddress> Addresses { get; set; }
        public List<UserRole> Roles { get; set; }
        public ConfirmationMail ConfirmationMail { get; set; }
        public UserAuthentication UserAuthentication { get; set; }
        public List<Favorit> Favorits { get; set; }

    }
}