// download.component.ts
import { Component, OnInit } from '@angular/core';
import { DownloadService } from 'src/app/core/services/download.service';
 import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
 
 

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css'],
})
export class DownloadComponent implements OnInit {
  dataTypes = ['Assets', 'Categories', 'Employees', 'AssetAssignments'];
  formats = ['PDF', 'Excel', 'CSV'];
  selectedType = '';
  selectedFormat = '';
  availableFields: any[] = [];
  filterValue = '';
  fullData: any[] = [];
  filteredData: any[] = [];

  constructor(private downloadService: DownloadService) {}

  ngOnInit(): void {}

  get selectedFields(): string[] {
  return this.availableFields.filter(f => f.selected).map(f => f.name);
}

get filteredPreviewData(): any[] {
  return this.fullData
    .filter(item =>
      Object.values(item).some(val =>
        typeof val === 'string' && val.toLowerCase().includes(this.filterValue.toLowerCase())

      )
    )
    .map(item => {
      const filtered: any = {};
      this.selectedFields.forEach(f => filtered[f] = item[f]);
      return filtered;
    });
}

canDownload(): boolean {
  return !!this.selectedType && !!this.selectedFormat && this.selectedFields.length > 0;
}


  onTypeChange() {
  switch (this.selectedType) {
    case 'Assets':
      this.downloadService.getAssets().subscribe(response => {
        const data = (response as any)?.$values || [];
        this.fullData = data;
        this.prepareFields(data);
      });
      break;

    case 'Categories':
      this.downloadService.getCategories().subscribe(response => {
        const data = (response as any)?.$values || [];
        this.fullData = data;
        this.prepareFields(data);
      });
      break;

    case 'Employees':
      this.downloadService.getEmployees().subscribe(response => {
        const data = (response as any)?.$values || [];
        this.fullData = data;
        this.prepareFields(data);
      });
      break;

    case 'AssetAssignments':
      this.downloadService.getAssetAssignments().subscribe(response => {
        const data = (response as any)?.$values || [];
        this.fullData = data;
        this.prepareFields(data);
      });
      break;
  }
}


  prepareFields(data: any[]) {
    if (!data.length) {
      this.availableFields = [];
      return;
    }

    const keys = Object.keys(data[0]);
    this.availableFields = keys.map(key => ({ name: key, selected: true }));
  }

download() {
  const selectedFields = this.availableFields
    .filter(f => f.selected)
    .map(f => f.name);

  const dataToExport = this.fullData
    .filter(item =>
      Object.values(item).some((val: any) =>
        val?.toString().toLowerCase().includes(this.filterValue.toLowerCase())
      )
    )
    .map(item => {
      const filteredItem: any = {};
      selectedFields.forEach(field => (filteredItem[field] = item[field]));
      return filteredItem;
    });

  switch (this.selectedFormat) {
    case 'CSV':
      this.downloadCSV(dataToExport, selectedFields);
      break;
    case 'Excel':
      this.downloadExcel(dataToExport);
      break;
    case 'PDF':
      this.downloadPDF(dataToExport, selectedFields);
      break;
    default:
      alert('Please select a valid format');
  }
}



convertToCSV(data: any[]): string {
  if (!data.length) return '';

  const headers = Object.keys(data[0]);
  const rows = data.map(row => {
    return headers.map(field => {
      let cell = row[field];
      if (typeof cell === 'string' && cell.includes(',')) {
        cell = `"${cell}"`; // Handle commas
      }
      return cell;
    }).join(',');
  });

  return [headers.join(','), ...rows].join('\r\n');
}

downloadCSV(data: any[], fields: string[]) {
  const csv = this.convertToCSV(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${this.selectedType}_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
}

downloadExcel(data: any[]) {
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
  const workbook: XLSX.WorkBook = {
    Sheets: { Sheet1: worksheet },
    SheetNames: ['Sheet1'],
  };
  XLSX.writeFile(workbook, `${this.selectedType}_${new Date().toISOString().split('T')[0]}.xlsx`);
}

downloadPDF(data: any[], fields: string[]) {
  const doc = new jsPDF();
  const rows = data.map(item => fields.map(field => item[field]));
  autoTable(doc, {
    head: [fields],
    body: rows,
  });
  doc.save(`${this.selectedType}_${new Date().toISOString().split('T')[0]}.pdf`);
}



}
