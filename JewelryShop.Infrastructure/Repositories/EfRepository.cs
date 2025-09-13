using JewelryShop.Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using JewelryShop.Infrastructure.Data;

namespace JewelryShop.Infrastructure.Repositories
{
    public class EfRepository<T> : IRepository<T> where T : class
    {
        private readonly AppDbContext _db;
        private readonly DbSet<T> _set;

        public EfRepository(AppDbContext db)
        {
            _db = db;
            _set = db.Set<T>();
        }

        public async Task AddAsync(T entity) => await _set.AddAsync(entity).AsTask();

        public async Task<T?> GetByIdAsync(Guid id) => await _set.FindAsync(id);

        public async Task<IEnumerable<T>> ListAsync() => await _set.ToListAsync();

        public void Remove(T entity) => _set.Remove(entity);

        public void Update(T entity) => _set.Update(entity);
    }
}
