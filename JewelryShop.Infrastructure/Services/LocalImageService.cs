using JewelryShop.Application.Interfaces;
using Microsoft.Extensions.Configuration;

namespace JewelryShop.Infrastructure.Services
{
    public class LocalImageService : IImageService
    {
        private readonly string _basePath;

        public LocalImageService(IConfiguration config)
        {
            _basePath = config["Images:Path"] ?? Path.Combine(Directory.GetCurrentDirectory(), "uploads");
            if (!Directory.Exists(_basePath)) Directory.CreateDirectory(_basePath);
        }

        public async Task DeleteImageAsync(string url)
        {
            try
            {
                var file = Path.Combine(_basePath, Path.GetFileName(url));
                if (File.Exists(file)) File.Delete(file);
            }
            catch { }
            await Task.CompletedTask;
        }

        public async Task<string> SaveImageAsync(Stream stream, string fileName)
        {
            var safe = Path.GetFileName(fileName);
            var full = Path.Combine(_basePath, $"{Guid.NewGuid()}_{safe}");
            using var fs = File.Create(full);
            await stream.CopyToAsync(fs);
            return full;
        }
    }
}
