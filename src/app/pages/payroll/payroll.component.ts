import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { Table, TableModule } from 'primeng/table';
import { CustomDropdownComponent } from "../../shared/custom-dropdown/custom-dropdown.component";

@Component({
  selector: 'app-payroll',
  standalone: true,
  imports: [CommonModule, TableModule, MultiSelectModule, FormsModule, CustomDropdownComponent],
  templateUrl: './payroll.component.html',
  styleUrl: './payroll.component.scss'
})
export class PayrollComponent {
  loading = true;
  payrolls: any[] = [];
  filteredPayrolls: any[] = [];

  selectedMonth: string | null = null;
  selectedVessel: string | null = null;

  monthOptions = [
    { label: 'All', value: null },
    { label: 'January', value: 'January' },
    { label: 'February', value: 'February' },
    { label: 'March', value: 'March' },
    { label: 'April', value: 'April' },
    { label: 'May', value: 'May' },
    { label: 'June', value: 'June' },
    { label: 'July', value: 'July' },
    { label: 'August', value: 'August' },
    { label: 'September', value: 'September' },
    { label: 'October', value: 'October' },
    { label: 'November', value: 'November' },
    { label: 'December', value: 'December' }
  ];

  vesselOptions: { label: string, value: string | null }[] = [];

  allColumns = [
    { field: 'name', header: 'Name' },
    { field: 'rank', header: 'Rank' },
    { field: 'vessel', header: 'Vessel' },
    { field: 'period', header: 'Period' },
    { field: 'salary', header: 'Salary' },
    { field: 'allowances', header: 'Allowances' },
    { field: 'deductions', header: 'Deductions' },
    { field: 'netPay', header: 'Net Pay' },
    { field: 'status', header: 'Status' },
    { field: 'actions', header: 'Actions' }
  ];

  @ViewChild('dt') dt!: Table;

  ngOnInit(): void {
    this.loadPayrolls();
  }

  loadPayrolls() {
    this.payrolls = [
      { name: 'John Doe', rank: 'Captain', vessel: 'MV Voyager', period: 'June 2025', salary: '$12,000', allowances: '$1,500', deductions: '$800', netPay: '$12,700', status: 'Paid' },
      { name: 'Alex Ray', rank: 'Chief Engineer', vessel: 'MT Neptune', period: 'June 2025', salary: '$9,500', allowances: '$1,000', deductions: '$650', netPay: '$9,850', status: 'Paid' },
      { name: 'Chris Smith', rank: 'First Mate', vessel: 'Bulk Master', period: 'May 2025', salary: '$7,000', allowances: '$800', deductions: '$500', netPay: '$7,300', status: 'Pending' },
      { name: 'Ben Carter', rank: 'Cook', vessel: 'MV Voyager', period: 'April 2025', salary: '$3,500', allowances: '$400', deductions: '$200', netPay: '$3,700', status: 'Pending' }
    ];

    // Generate vessel options dynamically
    const vessels = Array.from(new Set(this.payrolls.map(p => p.vessel)));
    this.vesselOptions = [{ label: 'All', value: null }, ...vessels.map(v => ({ label: v, value: v }))];

    this.filteredPayrolls = [...this.payrolls];
    this.loading = false;
  }

  applyFilters() {
    this.filteredPayrolls = this.payrolls.filter(p => {
      const monthMatch = this.selectedMonth
        ? p.period.toLowerCase().includes(this.selectedMonth.toLowerCase())
        : true;
      const vesselMatch = this.selectedVessel ? p.vessel === this.selectedVessel : true;
      return monthMatch && vesselMatch;
    });
  }

  exportPayroll() {
    console.log('Export payroll data');
  }

  viewPayroll(row: any) {
    console.log('View payroll:', row);
  }

  markAsPaid(row: any) {
    row.status = 'Paid';
  }

}
