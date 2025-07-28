using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetCategoriesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AssetCategoriesController(AppDbContext context)
        {
            _context = context;
        }

        //GET : api/AssetCategories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AssetCategory>>> GetAssetCagegories()
        {
            return await _context.AssetCategories.ToListAsync();
        }

        //GET : api/AssetCategories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AssetCategory>> GetAssetCategory(int id)
        {
            var category = await _context.AssetCategories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            return category;
        }

        //POST : api/AssetCategories
        [HttpPost]
        public async Task<ActionResult<AssetCategory>> PostAssetCategory(AssetCategory category)
        {
            _context.AssetCategories.Add(category);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAssetCategory), new { id = category.CategoryId }, category);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAssetCategory(int id, AssetCategory category)
        {
            if (id != category.CategoryId)
            {
                return BadRequest(); // ✅ Correct check to ensure ID in URL and body match
            }

            _context.Entry(category).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.AssetCategories.Any(e => e.CategoryId == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAssetCategory(int id)
        {
            var category = await _context.AssetCategories.FindAsync(id);

            if (category == null)
            {
                return NotFound(); // ✅ Only return 404 if the category does NOT exist
            }

            _context.AssetCategories.Remove(category);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
