import { Pipe, PipeTransform } from '@angular/core';
import { DropdownOption } from '../interfaces/SeafarerDetails';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  // transform(employees: DropdownOption[], search: string): any[] {
  //   if (!employees) return [];
  //   if (!search) return employees;
  //   search = search.toLowerCase();
  //   return employees.filter(e => e.Text.toLowerCase().includes(search));
  // }

  transform(items: any[], searchTerm: string, bindLabel: string): any[] {
    if (!items) return [];
    if (!searchTerm) return items;
    return items.filter(item =>
      item[bindLabel].toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

}
