namespace JewelryShop.Application.Interfaces
{
    public interface IImageService
    {
        Task<string> SaveImageAsync(Stream stream, string fileName);
        Task DeleteImageAsync(string url);
    }
}
