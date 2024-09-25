using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using OneFileAPI.Models;

namespace OneFileAPI
{
    public partial class OneFilePMSContext : DbContext
    {
        public OneFilePMSContext()
        {
        }

        public OneFilePMSContext(DbContextOptions<OneFilePMSContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Product> Products { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=OneFilePMS");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("PRODUCTS");

                entity.Property(e => e.Price).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.ProductName).HasMaxLength(100);

                
            });

            modelBuilder.Entity<Product>()
                .InsertUsingStoredProcedure("SP_ADD_PRODUCT",
                    spb => spb.HasParameter(propertyName => propertyName.ProductName, pb => pb.HasName("Product_Name"))
                               .HasParameter(propertyName => propertyName.Price)
                               .HasParameter(propertyName => propertyName.Quantity)
                               .HasResultColumn(propertyName => propertyName.ProductId, pb => pb.HasName("Product_id")))
                .UpdateUsingStoredProcedure("SP_UPDATE_PRODUCT",
                    spb => spb.HasOriginalValueParameter(propertyName => propertyName.ProductId, pb => pb.HasName("Product_Id"))
                            .HasParameter(propertyName => propertyName.ProductName, pb => pb.HasName("product_name"))
                            .HasParameter(propertyName => propertyName.Price)
                            .HasParameter(propertyName => propertyName.Quantity))
                .DeleteUsingStoredProcedure("SP_DELETE_PRODUCT",
                    spb => spb.HasOriginalValueParameter(propertyName => propertyName.ProductId, pb => pb.HasName("Product_ID")));
                

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
