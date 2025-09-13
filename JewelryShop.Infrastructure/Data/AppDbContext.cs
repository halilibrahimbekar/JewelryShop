using JewelryShop.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace JewelryShop.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Product> Products => Set<Product>();
        public DbSet<Category> Categories => Set<Category>();
        public DbSet<User> Users => Set<User>();
        public DbSet<Order> Orders => Set<Order>();
        public DbSet<OrderItem> OrderItems => Set<OrderItem>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>(eb =>
            {
                eb.HasKey(p => p.Id);
                eb.Property(p => p.Name).IsRequired().HasMaxLength(200);
            });

            modelBuilder.Entity<Category>(eb =>
            {
                eb.HasKey(c => c.Id);
                eb.Property(c => c.Name).IsRequired().HasMaxLength(100);
            });

            modelBuilder.Entity<User>(eb =>
            {
                eb.HasKey(u => u.Id);
                eb.Property(u => u.Email).IsRequired().HasMaxLength(200);
                eb.Property(u => u.PasswordHash).IsRequired();
            });

            modelBuilder.Entity<Order>(eb =>
            {
                eb.HasKey(o => o.Id);
                eb.HasMany(o => o.Items).WithOne(i => i.Order).HasForeignKey(i => i.OrderId);
            });

            modelBuilder.Entity<OrderItem>(eb =>
            {
                eb.HasKey(i => i.Id);
                eb.Property(i => i.Quantity).IsRequired();
            });
        }
    }
}
