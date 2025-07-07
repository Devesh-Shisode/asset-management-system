using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }

        [Required]
        public string Name { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        public string Department { get; set; }

        public ICollection<AssetAssignment> AssetAssignments { get; set; } = new List<AssetAssignment>();

    }
}
