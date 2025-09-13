using JewelryShop.Application.Interfaces;
using JewelryShop.Application.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace JewelryShop.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _service;
        private readonly JewelryShop.Application.Interfaces.IImageService _images;

        public ProductsController(IProductService service, JewelryShop.Application.Interfaces.IImageService images)
        {
            _service = service;
            _images = images ?? throw new ArgumentNullException(nameof(images));
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var items = await _service.GetAllAsync();
            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var item = await _service.GetByIdAsync(id);
            if (item == null) return NotFound();
            return Ok(item);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateProductDto dto)
        {
            var created = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, UpdateProductDto dto)
        {
            if (id != dto.Id) return BadRequest();
            var updated = await _service.UpdateAsync(dto);
            if (updated == null) return NotFound();
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var ok = await _service.DeleteAsync(id);
            if (!ok) return NotFound();
            return NoContent();
        }

        [HttpPost("{id}/image")]
        public async Task<IActionResult> UploadImage(Guid id, IFormFile file)
        {
            if (file == null || file.Length == 0) return BadRequest("No file");
            using var s = file.OpenReadStream();
            var url = await _images.SaveImageAsync(s, file.FileName);
            var dto = new UpdateProductDto { Id = id, Name = "", Description = "", Price = 0, CategoryId = Guid.Empty, Stock = 0 };
            // load existing and update image url via product service: quick path - get and patch
            var existing = await _service.GetByIdAsync(id);
            if (existing == null) return NotFound();
            existing.ImageUrl = url;
            var update = new UpdateProductDto { Id = existing.Id, Name = existing.Name, Description = existing.Description, Price = existing.Price, CategoryId = Guid.Empty, Stock = existing.Stock };
            var updated = await _service.UpdateAsync(update);
            return Ok(updated);
        }
    }
}
