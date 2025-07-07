using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AssetsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Assets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Asset>>> GetAssets()
        {
            return await _context.Assets.Include(a => a.Category).ToListAsync();
        }

        // GET: api/Assets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Asset>> GetAsset(int id)
        {
            var asset = await _context.Assets.Include(a => a.Category).FirstOrDefaultAsync(a => a.AssetId == id);

            if (asset == null)
            {
                return NotFound();
            }

            return asset;
        }

        // POST: api/Assets
        [HttpPost]
        public async Task<ActionResult<Asset>> PostAsset(AssetDto assetDto)
        {
            var asset = new Asset
            {
                Name = assetDto.Name,
                CategoryId = assetDto.CategoryId,
                SerialNumber = assetDto.SerialNumber,
                PurchaseDate = assetDto.PurchaseDate,
                WarrantyMonths = assetDto.WarrantyMonths,
                StatusId = assetDto.StatusId,
                Description = assetDto.Description
            };

            _context.Assets.Add(asset);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAsset), new { id = asset.AssetId }, asset);
        }

        // PUT: api/Assets/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsset(int id, AssetDto assetDto)
        {
            var asset = await _context.Assets.FindAsync(id);

            if (asset == null)
            {
                return NotFound();
            }

            asset.Name = assetDto.Name;
            asset.CategoryId = assetDto.CategoryId;
            asset.SerialNumber = assetDto.SerialNumber;
            asset.PurchaseDate = assetDto.PurchaseDate;
            asset.WarrantyMonths = assetDto.WarrantyMonths;
            asset.StatusId = assetDto.StatusId;
            asset.Description = assetDto.Description;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Assets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsset(int id)
        {
            var asset = await _context.Assets.FindAsync(id);
            if (asset == null)
            {
                return NotFound();
            }

            _context.Assets.Remove(asset);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

    // DTO class defined inside controller (you can move it to separate file if you want)
    public class AssetDto
    {
        public string Name { get; set; }
        public int CategoryId { get; set; }
        public string SerialNumber { get; set; }
        public DateTime PurchaseDate { get; set; }
        public int WarrantyMonths { get; set; }
        public int StatusId { get; set; }
        public string Description { get; set; }
    }
}
