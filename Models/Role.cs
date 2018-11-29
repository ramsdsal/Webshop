using System.Collections.Generic;

namespace webshop.Models
{
    public class Role : BaseEntity
    {
        public string Name { get; set; }
        public List<UserRole> Users { get; set; }
    }
}