export interface AssetAssignment {
  id: number;
  assetId: number;
  employeeId: number;
  assignedDate: string;     // ISO string
  returnDate?: string | null;
}
