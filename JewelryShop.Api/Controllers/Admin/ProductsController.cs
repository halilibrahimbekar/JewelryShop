using JewelryShop.Application.DTOs;
using JewelryShop.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JewelryShop.Api.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/products")]
    [Authorize(Roles = "Admin")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _svc;
        public ProductsController(IProductService svc) => _svc = svc;

        [HttpPost]
        public async Task<IActionResult> Create(CreateProductDto dto)
        {
            var res = await _svc.CreateAsync(dto);
            return CreatedAtAction(null, res);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, UpdateProductDto dto)
        {
            if (id != dto.Id) return BadRequest();
            var res = await _svc.UpdateAsync(dto);
            return Ok(res);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _svc.DeleteAsync(id);
            return NoContent();
        }
    }
}
