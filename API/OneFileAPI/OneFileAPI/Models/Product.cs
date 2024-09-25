using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace OneFileAPI.Models
{
    public partial class Product
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; } = null!;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}
