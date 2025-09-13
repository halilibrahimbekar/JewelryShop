namespace JewelryShop.Application.DTOs
{
    public class ProductDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public decimal Price { get; set; }
    public int Stock { get; set; }
    public string? ImageUrl { get; set; }
    }
}
