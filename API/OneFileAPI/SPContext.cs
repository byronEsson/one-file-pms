namespace OneFileAPI
{
    public partial class SPContext : DbContext
    { 
        public virtual DbSet<Product> Product { get; set; }


    }
}