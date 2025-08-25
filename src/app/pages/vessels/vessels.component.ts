import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { Table, TableModule } from 'primeng/table';
import { SeafarerService } from '../../core/services/seafarer.service';
import { VesselModalComponent } from "../../components/vessel-modal/vessel-modal.component";

@Component({
  selector: 'app-vessels',
  standalone: true,
  imports: [CommonModule, TableModule, MultiSelectModule, FormsModule, VesselModalComponent],
  templateUrl: './vessels.component.html',
  styleUrl: './vessels.component.scss'
})
export class VesselsComponent {
  loading = true;
  vessels: any[] = [];
  vesselDialog = false;
  isEdit = false;
  selectedVessel: any = {};


//  // all columns
//  allColumns = [
//   { field: 'EmpId', header: 'NO.' },
//   { field: 'EmployeeName', header: 'Name' },
//   { field: 'Nationality', header: 'Nationality' },
//   { field: 'BirthDate', header: 'Date Of Birth' },
//   { field: 'Rank', header: 'Rank' },
//   { field: 'Phone', header: 'Phone Number' },
//   { field: 'Mobile', header: 'Mobile Number' },
//   { field: 'Email', header: 'Email' },
//   { field: 'BirthPlace', header: 'Place of Birth' },
//   { field: 'Age', header: 'Age' },
//   { field: 'Religion', header: 'Religion' },
//   { field: 'MaritalStatus', header: 'Marital Status' },
//   { field: 'EmploymentDate', header: 'Date of Hire' },
//   { field: 'PassportNumber', header: 'Passport Number' },
//   { field: 'PassPortIssueDate', header: 'Passport Issue Date' },
//   { field: 'PassportExpireDate', header: 'Passport Expiry Date' },
//   { field: 'VisaUAEIdNO', header: 'VISA / UAE ID NO' },
//   { field: 'VisaIssueDate', header: 'VISA / UAE ID ISSUE DATE' },
//   { field: 'VisaExpiryDate', header: 'VISA / UAE ID EXPIRY DATE' },
//   { field: 'SponsorName', header: 'VISA SPONSOR' },
//   { field: 'Remarks', header: 'Remarks' },
//   { field: 'NameOfSpouse', header: 'Name Of Spouse' },
//   { field: 'NoOfChildren', header: 'No Of Children' },
//   { field: 'BodyWeight', header: 'Body Weight (Kg)' },
//   { field: 'Height', header: 'Height (in cm)' },
//   { field: 'NearestAirport', header: 'Nearest Airport' },
//   { field: 'ResidenceNumber', header: 'Residence Number' },
//   { field: 'InsuranceDate', header: 'Health Insurance Expiry Date' },
//   { field: 'actions', header: 'Actions' }
// ];


// // default displayed columns
// selectedColumns = [
//   { field: 'EmpId', header: 'EMP ID' },
//   { field: 'EmployeeName', header: 'Name' },
//   { field: 'Nationality', header: 'Nationality' },
//   { field: 'BirthDate', header: 'Date Of Birth' },
//   { field: 'Rank', header: 'Rank' },
//   { field: 'Mobile', header: 'Mobile Number' },
//   { field: 'Email', header: 'Email' },
//   { field: 'Age', header: 'Age' },
//   { field: 'PassportNumber', header: 'Passport Number' },
//   { field: 'PassportExpireDate', header: 'Passport Expiry Date' },
//   { field: 'actions', header: 'Actions' }
// ];

// all columns
allColumns = [
  { field: 'no', header: 'No.' },
  { field: 'name', header: 'Name' },
  { field: 'imo', header: 'IMO' },
  { field: 'year', header: 'Year' },
  { field: 'type', header: 'Type' },
  { field: 'flag', header: 'Flag' },
  { field: 'crew', header: 'Crew' },
  { field: 'engineType', header: 'Engine Type' },
  { field: 'engineModel', header: 'Engine Model' },
  { field: 'owner', header: 'Owner' },
  { field: 'dwt', header: 'DWT' },
  { field: 'teu', header: 'TEU' },
  { field: 'phone', header: 'Phone' },
  { field: 'email', header: 'E-mail' },
  { field: 'actions', header: 'Actions' }
];

// default displayed columns
selectedColumns = [
  { field: 'no', header: 'No.' },
  { field: 'name', header: 'Name' },
  { field: 'imo', header: 'IMO' },
  { field: 'year', header: 'Year' },
  { field: 'type', header: 'Type' },
  { field: 'flag', header: 'Flag' },
  { field: 'crew', header: 'Crew' },
  { field: 'owner', header: 'Owner' },
  { field: 'email', header: 'E-mail' },
  { field: 'actions', header: 'Actions' }
];


@ViewChild('dt') dt!: Table;

constructor(private seafarerService: SeafarerService,){}

ngOnInit(): void {
  this.loadSeafarers();
}


// *********************Table Functionality**************************
  //to keep the selected columns order in the UI
  get orderedSelectedColumns() {
    const cols = this.allColumns.filter(col =>
      this.selectedColumns.some(sel => sel.field === col.field)
    );
    // Add actions column at the end always
  const actionsCol = this.allColumns.find(c => c.field === 'actions');
  if (actionsCol && !cols.includes(actionsCol)) {
    cols.push(actionsCol);
  }
  return cols;
  }

  get allColumnsWithoutActions() {
    return this.allColumns.filter(c => c.field !== 'actions');
  }
  


// custom sorting function for the 'actions' column by active/inactive status
customSort(event: any) {
  if (event.field === 'actions') {
    // Sorting   Active/Inactive
    event.data.sort((a: any, b: any) => {
      const statusA = a.Status === 1 ? 0 : 1; // Active first
      const statusB = b.Status === 1 ? 0 : 1;
      return (statusA - statusB) * (event.order ?? 1);
    });
  } else {
    // Sorting other columns by their values
    
    event.data.sort((a: any, b: any) => {
      const valueA = a[event.field] ?? '';
      const valueB = b[event.field] ?? '';

      // compare numbers 
      if (!isNaN(valueA) && !isNaN(valueB)) {
        return (Number(valueA) - Number(valueB)) * (event.order ?? 1);
      }

      // compare strings 
      return valueA.toString().localeCompare(valueB.toString()) * (event.order ?? 1);
    });
  }
}


openVesselModal() {
  this.isEdit = false;
  this.selectedVessel = {}; // بيانات جديدة
  this.vesselDialog = true;
}

//====================Edit vessel====================

onEditVessel(vessel: any) {
  this.isEdit = true;
  this.selectedVessel = { ...vessel }; // نسخة من البيانات
  this.vesselDialog = true;
}

handleSave(vessel: any) {
  if (this.isEdit) {
    const index = this.vessels.findIndex(v => v.no === vessel.no);
    if (index > -1) this.vessels[index] = vessel;
  } else {
    this.vessels.push(vessel);
  }
}
  loadSeafarers() {
    this.seafarerService.getAllSeafarers().subscribe({
      next: (res: any) => {
        
        this.vessels = res.Data;
        this.loading = false;

      },
      error: (err) => { console.error(err); this.loading = false; }
    });
  }

}
