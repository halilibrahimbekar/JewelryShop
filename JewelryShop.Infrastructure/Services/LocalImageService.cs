using JewelryShop.Application.Interfaces;
using Microsoft.Extensions.Configuration;

namespace JewelryShop.Infrastructure.Services
{
    public class LocalImageService : IImageService
    {
        private readonly string _basePath;

        public LocalImageService(IConfiguration config)
        {
            var configured = config["Images:Path"];
            var uploadsFolder = string.IsNullOrWhiteSpace(configured) ? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads") : configured;
            _basePath = uploadsFolder;
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
            var fileNameOnDisk = $"{Guid.NewGuid()}_{safe}";
            var full = Path.Combine(_basePath, fileNameOnDisk);
            using var fs = File.Create(full);
            await stream.CopyToAsync(fs);
            // return a URL path relative to the web root so clients can fetch it
            return $"/uploads/{fileNameOnDisk}";
        }
    }
}
