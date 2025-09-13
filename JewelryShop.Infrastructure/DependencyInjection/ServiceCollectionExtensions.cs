using System;
using JewelryShop.Application.Interfaces;
using JewelryShop.Infrastructure.Data;
using JewelryShop.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace JewelryShop.Infrastructure.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<AppDbContext>(opt =>
            {
                opt.UseNpgsql(connectionString);
            });

            services.AddScoped(typeof(IRepository<>), typeof(EfRepository<>));
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddSingleton<JewelryShop.Application.Interfaces.IImageService, JewelryShop.Infrastructure.Services.LocalImageService>();

            return services;
        }
    }
}
