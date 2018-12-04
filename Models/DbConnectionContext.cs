using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace webshop.Models
{

    public class DbConnectionContext : DbContext
    {
        public DbConnectionContext(DbContextOptions<DbConnectionContext> options) : base(options) { }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<UserAddress> UserAddresses { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<Discount> Discounts { get; set; }
        public DbSet<Price> Prices { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderProduct> OrderProducts { get; set; }
        public DbSet<ConfirmationMail> ConfirmationMails { get; set; }

        public DbSet<UserAuthentication> UserAuthentications { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            //ERD relations product and category
            modelBuilder.Entity<ProductCategory>()
            .HasKey(t => new { t.ProductId, t.CategoryId });
            modelBuilder.Entity<ProductCategory>()
            .HasOne(pc => pc.Product)
            .WithMany(p => p.Categories)
            .HasForeignKey(pc => pc.ProductId);
            modelBuilder.Entity<ProductCategory>()
            .HasOne(pc => pc.Category)
            .WithMany(c => c.Products)
            .HasForeignKey(pc => pc.CategoryId);

            //ERD Reltaions User and Adress
            modelBuilder.Entity<UserAddress>()
            .HasKey(t => new { t.UserId, t.AddressId });
            modelBuilder.Entity<UserAddress>()
            .HasOne(ua => ua.User)
            .WithMany(u => u.Addresses)
            .HasForeignKey(ua => ua.UserId);
            modelBuilder.Entity<UserAddress>()
            .HasOne(ua => ua.Address)
            .WithMany(a => a.Users)
            .HasForeignKey(ua => ua.AddressId);

            //ERD Relations user and Roles
            modelBuilder.Entity<UserRole>()
            .HasKey(t => new { t.UserId, t.RoleId });
            modelBuilder.Entity<UserRole>()
            .HasOne(ur => ur.User)
            .WithMany(u => u.Roles)
            .HasForeignKey(ua => ua.UserId);
            modelBuilder.Entity<UserRole>()
            .HasOne(ur => ur.Role)
            .WithMany(r => r.Users)
            .HasForeignKey(ur => ur.RoleId);

            //ERD Relations Order and Products
            modelBuilder.Entity<OrderProduct>()
            .HasKey(t => new { t.OrderId, t.ProductId });
            modelBuilder.Entity<OrderProduct>()
            .HasOne(op => op.Order)
            .WithMany(o => o.Products)
            .HasForeignKey(op => op.OrderId);
            modelBuilder.Entity<OrderProduct>()
            .HasOne(po => po.Product)
            .WithMany(p => p.Orders)
            .HasForeignKey(po => po.ProductId);

        }

    }
}