using JewelryShop.Domain.Entities;

namespace JewelryShop.Infrastructure.Data
{
    public static class DbInitializer
    {
        public static async Task SeedAsync(AppDbContext db)
        {
            if (!db.Categories.Any())
            {
                var cat = new Category { Id = Guid.NewGuid(), Name = "Rings", Description = "Ring category" };
                db.Categories.Add(cat);

                var p = new Product { Id = Guid.NewGuid(), Name = "Gold Ring", Description = "Beautiful gold ring", Price = 199.99m, CategoryId = cat.Id, Stock = 10 };
                p.ImageUrl = "/uploads/placeholder.svg";
                db.Products.Add(p);

                await db.SaveChangesAsync();
            }

            // ensure existing products have a placeholder image if missing
            var first = db.Products.FirstOrDefault();
            if (first != null && string.IsNullOrWhiteSpace(first.ImageUrl))
            {
                first.ImageUrl = "/uploads/placeholder.svg";
                await db.SaveChangesAsync();
            }
            

            // seed admin user
            if (!db.Users.Any())
            {
                var admin = new JewelryShop.Domain.Entities.User
                {
                    Id = Guid.NewGuid(),
                    Email = "admin@local",
                    FullName = "Administrator",
                    Role = "Admin"
                };
                var hasher = new Microsoft.AspNetCore.Identity.PasswordHasher<JewelryShop.Domain.Entities.User>();
                admin.PasswordHash = hasher.HashPassword(admin, "Admin123!");
                db.Users.Add(admin);
                await db.SaveChangesAsync();
            }
        }
    }
}
