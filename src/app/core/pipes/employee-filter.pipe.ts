import { Pipe, PipeTransform } from '@angular/core';
import { DropdownOption } from '../interfaces/SeafarerDetails';

@Pipe({
  name: 'employeeFilter',
  standalone: true
})
export class EmployeeFilterPipe implements PipeTransform {

  transform(employees: DropdownOption[], search: string): any[] {
    if (!employees) return [];
    if (!search) return employees;
    search = search.toLowerCase();
    return employees.filter(e => e.Text.toLowerCase().includes(search));
  }

}
