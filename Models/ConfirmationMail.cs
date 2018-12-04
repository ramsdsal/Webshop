using System;

namespace webshop.Models
{

    public class ConfirmationMail : BaseEntity
    {

        public int UserId { get; set; }
        public User User { get; set; }
        public string ConfirmationToken { get; set; }
        public int AccountStatus { get; set; }
    }
}