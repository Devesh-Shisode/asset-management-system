using backend.Data;
using backend.Models;
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

        // GET: api/AssetAssignments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AssetAssignment>>> GetAssignments()
        {
            return await _context.AssetAssignments
                .Include(a => a.Asset)
                .Include(a => a.Employee)
                .ToListAsync();
        }

        // POST: api/AssetAssignments
        [HttpPost]
        public async Task<ActionResult<AssetAssignment>> AssignAsset(AssetAssignmentDto dto)
        {
            var assignment = new AssetAssignment
            {
                AssetId = dto.AssetId,
                EmployeeId = dto.EmployeeId,
                AssignedDate = dto.AssignedDate,
                ReturnDate = dto.ReturnDate
            };

            _context.AssetAssignments.Add(assignment);

            var asset = await _context.Assets.FindAsync(dto.AssetId);
            if (asset != null)
            {
                asset.StatusId = 2; // "In Use"
            }

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAssignments), new { id = assignment.Id }, assignment);
        }

        // PUT: api/AssetAssignments/{id}/return
        [HttpPut("{id}/return")]
        public async Task<IActionResult> ReturnAsset(int id)
        {
            var assignment = await _context.AssetAssignments.FindAsync(id);
            if (assignment == null)
                return NotFound();

            assignment.ReturnDate = DateTime.Now;

            var asset = await _context.Assets.FindAsync(assignment.AssetId);
            if (asset != null)
            {
                asset.StatusId = 1; // "Available"
            }

            await _context.SaveChangesAsync();
            return NoContent();
        }
        // DELETE: api/AssetAssignments/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAssignment(int id)
        {
            var assignment = await _context.AssetAssignments.FindAsync(id);
            if (assignment == null)
            {
                return NotFound(); // 404 if not found
            }

            _context.AssetAssignments.Remove(assignment);
            await _context.SaveChangesAsync();

            return NoContent(); // 204 No Content on successful deletion
        }

    }


    // ✅ DTO Class
    public class AssetAssignmentDto
    {
        public int AssetId { get; set; }
        public int EmployeeId { get; set; }

        // Required: Must be sent from frontend
        public DateTime AssignedDate { get; set; }

        // Optional: Can be null during assignment
        public DateTime? ReturnDate { get; set; }
    }
}
