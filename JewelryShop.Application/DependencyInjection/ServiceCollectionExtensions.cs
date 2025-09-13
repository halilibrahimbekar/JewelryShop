using JewelryShop.Application.Interfaces;
using JewelryShop.Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace JewelryShop.Application.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<IAuthService, AuthService>();
            return services;
        }
    }
}
