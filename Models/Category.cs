using System.Collections.Generic;

namespace webshop.Models
{
    public class Category : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public List<ProductCategory> Products { get; set; }
    }
}