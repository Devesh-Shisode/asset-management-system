import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, fields: any[]): any[] {
    if (!items || !searchText) return items;

    const lowered = searchText.toLowerCase();
    const selectedFields = fields.filter(f => f.selected).map(f => f.name);

    return items.filter(item =>
      selectedFields.some(key =>
        item[key]?.toString().toLowerCase().includes(lowered)
      )
    );
  }
}
