using JewelryShop.Domain.Entities;

namespace JewelryShop.Infrastructure.Data
{
    public static class DbInitializer
    {
        public static async Task SeedAsync(AppDbContext db)
        {
            if (db.Categories.Any()) return;

            var cat = new Category { Id = Guid.NewGuid(), Name = "Rings", Description = "Ring category" };
            db.Categories.Add(cat);

            var p = new Product { Id = Guid.NewGuid(), Name = "Gold Ring", Description = "Beautiful gold ring", Price = 199.99m, CategoryId = cat.Id, Stock = 10 };
            db.Products.Add(p);

            await db.SaveChangesAsync();
        }
    }
}
