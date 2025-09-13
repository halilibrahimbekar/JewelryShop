using JewelryShop.Application.DTOs;
using JewelryShop.Application.Interfaces;
using JewelryShop.Domain.Entities;

namespace JewelryShop.Application.Services
{
    public class ProductService : IProductService
    {
    private readonly IRepository<Product> _repo;
    private readonly IUnitOfWork? _uow;

        public ProductService(IRepository<Product> repo)
        {
            _repo = repo;
        }

        public async Task<ProductDto> CreateAsync(CreateProductDto dto)
        {
            var p = new Product
            {
                Id = Guid.NewGuid(),
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price,
                CategoryId = dto.CategoryId,
                Stock = dto.Stock
            };

            await _repo.AddAsync(p);
            if (_uow != null) await _uow.SaveChangesAsync();
            return new ProductDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Price = p.Price,
                Stock = p.Stock,
                ImageUrl = p.ImageUrl
            };
        }

        public ProductService(IRepository<Product> repo, IUnitOfWork uow)
        {
            _repo = repo;
            _uow = uow ?? throw new ArgumentNullException(nameof(uow));
        }

        public async Task<IEnumerable<ProductDto>> GetAllAsync()
        {
            var list = await _repo.ListAsync();
            return list.Select(p => new ProductDto
            {
                Id = (p as Product)!.Id,
                Name = (p as Product)!.Name,
                Description = (p as Product)!.Description,
                Price = (p as Product)!.Price,
                Stock = (p as Product)!.Stock,
                ImageUrl = (p as Product)!.ImageUrl
            });
        }

        public async Task<ProductDto?> GetByIdAsync(Guid id)
        {
            var p = await _repo.GetByIdAsync(id) as Product;
            if (p == null) return null;
            return new ProductDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Price = p.Price,
                Stock = p.Stock,
                ImageUrl = p.ImageUrl
            };
        }

        public async Task<ProductDto?> UpdateAsync(UpdateProductDto dto)
        {
            var p = await _repo.GetByIdAsync(dto.Id) as Product;
            if (p == null) return null;
            p.Name = dto.Name;
            p.Description = dto.Description;
            p.Price = dto.Price;
            p.CategoryId = dto.CategoryId;
            p.Stock = dto.Stock;
            _repo.Update(p);
            if (_uow != null) await _uow.SaveChangesAsync();
            return new ProductDto { Id = p.Id, Name = p.Name, Description = p.Description, Price = p.Price, Stock = p.Stock, ImageUrl = p.ImageUrl };
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var p = await _repo.GetByIdAsync(id) as Product;
            if (p == null) return false;
            _repo.Remove(p);
            if (_uow != null) await _uow.SaveChangesAsync();
            return true;
        }
    }
}
