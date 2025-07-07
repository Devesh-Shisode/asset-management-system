using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetAssignmentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AssetAssignmentsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AssetAssignment>>> GetAssignments()
        {
            return await _context.AssetAssignments
                .Include(a => a.Asset)
                .Include(a => a.Employee)
                .ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<AssetAssignment>> AssignAsset(AssetAssignment assignment)
        {
            assignment.AssignedDate = DateTime.Now;
            _context.AssetAssignments.Add(assignment);

            var asset = await _context.Assets.FindAsync(assignment.AssetId);
            if (asset != null)
            {
                asset.StatusId = 2; // Assigned
            }

            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAssignments), new { id = assignment.Id }, assignment);
        }

        [HttpPut("{id}/return")]
        public async Task<IActionResult> ReturnAsset(int id)
        {
            var assignment = await _context.AssetAssignments.FindAsync(id);
            if (assignment == null) return NotFound();

            assignment.ReturnDate = DateTime.Now;

            var asset = await _context.Assets.FindAsync(assignment.AssetId);
            if (asset != null)
            {
                asset.StatusId = 1; // Available
            }

            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
