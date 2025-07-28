using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class AssetCategory
    {
        [Key]
        public int CategoryId { get; set; }
        public string Name { get; set; }
    }
}
