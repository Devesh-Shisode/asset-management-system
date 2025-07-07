using System.Text.Json.Serialization;

namespace backend.Models
{
    public class Asset
    {
        public int AssetId { get; set; }
        public string Name { get; set; }
        public int CategoryId { get; set; }
        public string SerialNumber { get; set; }
        public DateTime PurchaseDate { get; set; }
        public int WarrantyMonths { get; set; }
        public int StatusId { get; set; }
        public string Description { get; set; }

        [JsonIgnore]
        public AssetCategory Category { get; set; }
    }
}
