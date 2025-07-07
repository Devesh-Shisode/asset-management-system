export interface Asset {
  assetId?: number;               // ✅ match C#
  name: string;
  categoryId: number;
  serialNumber: string;           // ✅ match C# property name
  purchaseDate: string;           // ✅ should be ISO string (YYYY-MM-DD)
  warrantyMonths: number;         // ✅ match C# casing
  statusId: number;
  description: string;
}
