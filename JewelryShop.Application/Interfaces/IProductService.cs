using JewelryShop.Application.DTOs;

namespace JewelryShop.Application.Interfaces
{
    public interface IProductService
    {
        Task<IEnumerable<ProductDto>> GetAllAsync();
        Task<ProductDto?> GetByIdAsync(Guid id);
        Task<ProductDto> CreateAsync(CreateProductDto dto);
    Task<ProductDto?> UpdateAsync(UpdateProductDto dto);
    Task<bool> DeleteAsync(Guid id);
    }
}
