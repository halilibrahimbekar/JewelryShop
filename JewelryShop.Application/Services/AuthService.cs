using JewelryShop.Application.DTOs;
using JewelryShop.Application.Interfaces;
using JewelryShop.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace JewelryShop.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IRepository<User> _users;
        private readonly IUnitOfWork _uow;
        private readonly IConfiguration _config;
        private readonly PasswordHasher<User> _hasher = new();

        public AuthService(IRepository<User> users, IUnitOfWork uow, IConfiguration config)
        {
            _users = users;
            _uow = uow;
            _config = config;
        }

        public async Task<AuthResultDto> RegisterAsync(RegisterDto dto)
        {
            // naive: check existing email
            var all = await _users.ListAsync();
            if (all.Any(u => (u as User)!.Email == dto.Email))
                throw new InvalidOperationException("Email already registered");

            var user = new User
            {
                Id = Guid.NewGuid(),
                Email = dto.Email,
                FullName = dto.FullName
            };

            user.PasswordHash = _hasher.HashPassword(user, dto.Password);
            await _users.AddAsync(user);
            await _uow.SaveChangesAsync();

            var token = GenerateToken(user);
            return new AuthResultDto { Token = token, ExpiresAt = DateTime.UtcNow.AddMinutes(60) };
        }

        public async Task<AuthResultDto> LoginAsync(LoginDto dto)
        {
            var all = await _users.ListAsync();
            var user = all.Select(u => u as User).FirstOrDefault(u => u!.Email == dto.Email);
            if (user == null) throw new UnauthorizedAccessException("Invalid credentials");

            var res = _hasher.VerifyHashedPassword(user, user.PasswordHash, dto.Password);
            if (res == PasswordVerificationResult.Failed) throw new UnauthorizedAccessException("Invalid credentials");

            var token = GenerateToken(user);
            return new AuthResultDto { Token = token, ExpiresAt = DateTime.UtcNow.AddMinutes(60) };
        }

        private string GenerateToken(User user)
        {
            var key = _config["Jwt:Key"] ?? "please-change-this-secret-key";
            var issuer = _config["Jwt:Issuer"] ?? "JewelryShop";
            var claims = new[] { new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()), new Claim(JwtRegisteredClaimNames.Email, user.Email) };
            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var creds = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(issuer: issuer, claims: claims, expires: DateTime.UtcNow.AddMinutes(60), signingCredentials: creds);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
