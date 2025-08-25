import {  Component, OnInit, ViewChild } from '@angular/core';
import { SeafarerService } from '../../core/services/seafarer.service';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule,Validators, FormArray } from '@angular/forms';
import { Certificate, DropdownOption, Language, MedicalData, Qualification, Reference, Seafarer, Training, WorkExperience } from '../../core/interfaces/SeafarerDetails';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { EmployeeFilterPipe } from '../../core/pipes/employee-filter.pipe';
@Component({
  selector: 'app-seafarers',
  standalone: true,
  imports: [TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    TagModule,
    CommonModule,
    FormsModule,
    MultiSelectModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    CheckboxModule, ReactiveFormsModule,
    EmployeeFilterPipe],
  templateUrl: './seafarers.component.html',
  styleUrl: './seafarers.component.scss',
})

export class SeafarersComponent implements OnInit {

  seafarers: any[] = [];
  loading = true;
  showFilters = false;
  filterNameRank = '';
  filterNationality = '';
  seafarerEntity: Seafarer = {} as Seafarer;

  seafarerDialog = false;
  isEdit = false;
  
  employees: DropdownOption[] = [];
  vendors: DropdownOption[] = [];
  Medicals: MedicalData[] = [];

  activeTab: string = 'personal';
  trackByIndex(index: number) { return index; };

  Qualifications: Qualification[] = [];
  Certificates: Certificate[] = [];
  Languages: Language[] = [];
  References: Reference[] = [];
  WorkExperiences: WorkExperience[] = [];
  Trainings: Training[] = [];

  
  // all columns
  allColumns = [
    { field: 'EmpId', header: 'EMP ID' },
    { field: 'EmployeeName', header: 'Name' },
    { field: 'Nationality', header: 'Nationality' },
    { field: 'BirthDate', header: 'Date Of Birth' },
    { field: 'Rank', header: 'Rank' },
    { field: 'Phone', header: 'Phone Number' },
    { field: 'Mobile', header: 'Mobile Number' },
    { field: 'Email', header: 'Email' },
    { field: 'BirthPlace', header: 'Place of Birth' },
    { field: 'Age', header: 'Age' },
    { field: 'Religion', header: 'Religion' },
    { field: 'MaritalStatus', header: 'Marital Status' },
    { field: 'EmploymentDate', header: 'Date of Hire' },
    { field: 'PassportNumber', header: 'Passport Number' },
    { field: 'PassPortIssueDate', header: 'Passport Issue Date' },
    { field: 'PassportExpireDate', header: 'Passport Expiry Date' },
    { field: 'VisaUAEIdNO', header: 'VISA / UAE ID NO' },
    { field: 'VisaIssueDate', header: 'VISA / UAE ID ISSUE DATE' },
    { field: 'VisaExpiryDate', header: 'VISA / UAE ID EXPIRY DATE' },
    { field: 'SponsorName', header: 'VISA SPONSOR' },
    { field: 'Remarks', header: 'Remarks' },
    { field: 'NameOfSpouse', header: 'Name Of Spouse' },
    { field: 'NoOfChildren', header: 'No Of Children' },
    { field: 'BodyWeight', header: 'Body Weight (Kg)' },
    { field: 'Height', header: 'Height (in cm)' },
    { field: 'NearestAirport', header: 'Nearest Airport' },
    { field: 'ResidenceNumber', header: 'Residence Number' },
    { field: 'InsuranceDate', header: 'Health Insurance Expiry Date' },
    { field: 'actions', header: 'Actions' }
  ];

  // default displayed columns
  selectedColumns = [
    { field: 'EmpId', header: 'EMP ID' },
    { field: 'EmployeeName', header: 'Name' },
    { field: 'Nationality', header: 'Nationality' },
    { field: 'BirthDate', header: 'Date Of Birth' },
    { field: 'Rank', header: 'Rank' },
    { field: 'Mobile', header: 'Mobile Number' },
    { field: 'Email', header: 'Email' },
    { field: 'Age', header: 'Age' },
    { field: 'PassportNumber', header: 'Passport Number' },
    { field: 'PassportExpireDate', header: 'Passport Expiry Date' },
    { field: 'actions', header: 'Actions' }
  ];

  seafarerForm!: FormGroup;

  @ViewChild('dt') dt!: Table;

  constructor(
    private seafarerService: SeafarerService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadSeafarers();
    this.loadDropdowns();
    this.initForm();
  }
  
    //Page
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


  onGlobalFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dt.filterGlobal(value, 'contains');
  }
  // // *******************Filter***********************

toggleFilters() {
  this.showFilters = !this.showFilters;
}
applyFilters() {

  //if there are no filters, show all data
  if (!this.filterNameRank && !this.filterNationality) {
    this.dt.value = this.seafarers; // show all data 
    return;
  }

  //start with the original data
  let filtered = [...this.seafarers];

  // filter by Employee Name or Rank (OR logic)
  if (this.filterNameRank) {
    const value = this.filterNameRank.toLowerCase();
    filtered = filtered.filter(item =>
      (item.EmployeeName && item.EmployeeName.toLowerCase().includes(value)) ||
      (item.Rank && item.Rank.toLowerCase().includes(value))
    );
  }

  // filter by Nationality
  if (this.filterNationality) {
    const value = this.filterNationality.toLowerCase();
    filtered = filtered.filter(item =>
      item.Nationality && item.Nationality.toLowerCase().includes(value)
    );
  }

  // update the table data with the filtered data
  this.dt.value = filtered;
}


  // ----------- FORM INIT ------------
  initForm() {
    this.seafarerForm = this.fb.group({
      Id: [0],
      EmpId: [null, Validators.required],
      Nationality: [''],
      BirthDate: [null],
      Age: [{ value: null, disabled: true }],
      BirthPlace: [''],
      Religion: [''],
      MaritalStatus: [''],
      NameOfSpouse: [''],
      NoOfChildren: [null],
      BodyWeight: [null],
      Height: [null],
      NearestAirport: [''],
      Remarks: [''],
      EmploymentDate: [null],
      PassportNumber: [''],
      PassPortIssueDate: [null],
      PassportExpireDate: [null],
      Rank: [''],
      VisaSponsorId: [null, Validators.required],
      VisaUAEIdNO: [''],
      VisaIssueDate: [null],
      VisaExpiryDate: [null],
      ResidenceNumber: [''],
      InsuranceDate: [null],
      Email: ['', [Validators.email]],
      PermanentAddressHomeCountry: [''],
      ContactNumberHomeCountry: [''],
      ContactNameAndNumberDuringEmergenciesUAE: [''],
      ContactNameAndNumberDuringEmergenciesHome: [''],
      SeamanBookNo: [''],
      SeamanIssueDate: [''],
      SeamanExpiryDate: [''],
      CicpaNo: [''],
      CicpaIssueDate: [''],
      CicpaExpiryDate: [''],
      Declaration: [''], 
      SignedOffFromAShipDueToMedicalReason: [null], 
      SignedOffFromAShipDueToMedicalReasonComment: [''], 
      InquiryOrInvolvedMaritimeAccident: [null],
      InquiryOrInvolvedMaritimeAccidentComment: [''], 
      LicenseSuspendedOrRevoked: [null], 
      LicenseSuspendedOrRevokedComment: [''], 
      Qualifications: this.fb.array([]),
      Certificates: this.fb.array([]),
      Trainings: this.fb.array([]), // not in the response  ,only in UI 
      Languages: this.fb.array([]),
      References: this.fb.array([]),
      WorkExperiences: this.fb.array([]),
      Medicals: this.fb.array([]) //  not in the response  ,only in UI 
    });
  }


  // ----------- FORM GETTERS ----------
  get f() { return this.seafarerForm.controls; }
  get qualifications(): FormArray { return this.seafarerForm.get('Qualifications') as FormArray; }
  get certificates(): FormArray { return this.seafarerForm.get('Certificates') as FormArray; }
  get trainings(): FormArray { return this.seafarerForm.get('Trainings') as FormArray; }
  get languages(): FormArray { return this.seafarerForm.get('Languages') as FormArray; }
  get references(): FormArray { return this.seafarerForm.get('References') as FormArray; }
  get medicals(): FormArray { return this.seafarerForm.get('Medicals') as FormArray; }
  get workExperiences(): FormArray { return this.seafarerForm.get('WorkExperiences') as FormArray; }

  // ----------- FORM ARRAY HELPERS ----------
  qualificationForm = this.fb.group({
    DegreeOrCourse: [''],
    MajorOrSubject: [''],
    CourseIssueDate: [''],
    University: [''],
    Country: ['']
  });

  addQualification() {
    this.qualifications.push(this.fb.group(this.qualificationForm.value));
    this.qualificationForm.reset();
  }

  removeQualification(i: number) {
    this.qualifications.removeAt(i);
  }


  certificateForm = this.fb.group({
    Capacity: [''],
    Regulation: [''],
    IssueDate: [''],
    ExpiryDate: [''],
    IssuingAuthority: [''],
    Limitations: [''],
    Country: ['']
  });

  addCertificate() {
    this.certificates.push(this.fb.group(this.certificateForm.value));
    this.certificateForm.reset();
  }

  removeCertificate(i: number) {
    this.certificates.removeAt(i);
  }


  addTraining() {
    this.trainings.push(this.fb.group({
      Course: [''],
      Institute: [''],
      IssueDate: [''],
      ExpiryDate: ['']
    }));
  }
  removeTraining(i: number) { this.trainings.removeAt(i); }

  addLanguage() {
    this.languages.push(this.fb.group({
      Language: [''],
      Spoken: [''],
      Written: [''],
      Understood: [''],
      MotherTongue: ['']
    }));
  }
  removeLanguage(i: number) { this.languages.removeAt(i); }

  addReference() {
    this.references.push(this.fb.group({
      PersonName: [''],
      CompanyName: [''],
      Country: [''],
      Fax: [''],
      EmailId: ['']
    }));
  }
  removeReference(i: number) { this.references.removeAt(i); }

  addMedical() {
    this.medicals.push(this.fb.group({
      MedicalVaccination: [''],
      Date: [''],
      ExpiryDate: [''],
      Remarks: ['']
    }));
  }
  removeMedical(i: number) { this.medicals.removeAt(i); }


  addWorkExperience() {
    this.workExperiences.push(this.fb.group({
      VesselName: [''],
      Flag: [''],
      Owner: [''],
      Rank: [''],
      VesselType: [''],
      Dwt: [''],
      EngineType: [''],
      EnginePower: [''],
      SignOnDate: [''],
      SignOffDate: [''],
      Reason: [''],
      Remarks: ['']
    }));
  }
  removeWorkExperience(i: number) { this.workExperiences.removeAt(i); }

  // ----------- LOAD & SAVE -----------

  openSeafarerModal(seafarer?: any) {
    this.seafarerDialog = true;
    this.initForm(); // initialize the form

    if (seafarer && seafarer.entity) {
      this.isEdit = true;
      //patched the form with seafarer entity
      this.seafarerForm.patchValue(seafarer.entity);

      const empId = seafarer.entity.EmpId;
      const visaSponsorId = seafarer.entity.VisaSponsorId;

      if (empId!=0) {
        this.selectedValues['EmpId'] = this.employees.find(e => e.Value === empId) || null;
      }
      if (visaSponsorId) {
        this.selectedValues['VisaSponsorId'] = this.vendors.find(v => v.Value === visaSponsorId) || null;
      }

      (seafarer.Qualifications || []).forEach((q: any) => this.qualifications.push(this.fb.group(q)));
      (seafarer.Certificates || []).forEach((c: any) => this.certificates.push(this.fb.group(c)));
      (seafarer.Languages || []).forEach((l: any) => this.languages.push(this.fb.group(l)));
      (seafarer.References || []).forEach((r: any) => this.references.push(this.fb.group(r)));
      // (seafarer.WorkExperiences || []).forEach((w: any) => this.workExperiences.push(this.fb.group(w)));
      (seafarer.Medicals || []).forEach((m: any) => this.medicals.push(this.fb.group(m)));
      (seafarer.Trainings || []).forEach((t: any) => this.trainings.push(this.fb.group(t)));

    } else {
      this.isEdit = false;
      this.seafarerForm.patchValue({ Id: 0 }); // 0 for new seafarer
    }
    // console.log('🧭 isEdit =', this.isEdit, ' | Form Id =', this.seafarerForm.value);
  }

  closeSeafarerModal() { this.seafarerDialog = false; }


  saveSeafarer() {
    if (this.seafarerForm.invalid) {
      this.seafarerForm.markAllAsTouched();
      return;
    }

    const body = this.seafarerForm.getRawValue();

    if (this.isEdit && (!body.Id || body.Id === 0)) {
      console.error('❌ id is required in edit mode');
      // استخدم PrimeNG Message بدلاً من alert()
      return;
    }

    //correct payload structure
    const payload = {
      entity: body,
      Qualifications: body.Qualifications,
      Certificates: body.Certificates,
      Languages: body.Languages,
      References: body.References,
      WorkExperiences: body.WorkExperiences,
      Trainings: body.Trainings, 
      Medicals: body.Medicals 
    };

    console.log('Payload:', payload);
    const req$ = this.seafarerService.saveSeafarer(payload);

    req$.subscribe({
      next: (res: any) => {
        console.log('API Response:', res);
        if (res?.Result) {
          this.closeSeafarerModal();
          this.loadSeafarers();
        } else {
          console.error('⚠️ Error from API:', res?.ErrorMessage);
          // استخدم PrimeNG Message بدلاً من alert()
        }
      },
      error: (err) => {
        console.error('❌ API Error:', err);
        // استخدم PrimeNG Message بدلاً من alert()
      }
    });
  }


  loadSeafarers() {
    this.seafarerService.getAllSeafarers().subscribe({
      next: (res: any) => {
        
        this.seafarers = res.Data;
        this.loading = false;

        this.Qualifications = res.QualificationDetails;
        this.Certificates = res.Certificates;
        this.Languages = res.Languages;
        this.References = res.References;
        this.WorkExperiences = res.WorkExperiences;
      },
      error: (err) => { console.error(err); this.loading = false; }
    });
  }


dropdownOpen: { [key: string]: boolean } = {};
selectedValues: { [key: string]: DropdownOption|null } = {};
searchTerms: { [key: string]: string } = {};
empAndVendorLoading: { [key: string]: boolean } = {};

// employees: DropdownOption[] = [];
// vendors: DropdownOption[] = [];

toggleDropdown(controlName: string) {
  this.dropdownOpen[controlName] = !this.dropdownOpen[controlName];
  this.searchTerms[controlName] = ''; // reset search on open
}

selectItem(controlName: string, item: any) {
  this.selectedValues[controlName] = item;
  this.seafarerForm.get(controlName)?.setValue(item.Value);
  this.dropdownOpen[controlName] = false;
}

loadDropdowns() {
  this.empAndVendorLoading['EmpId'] = true;
  this.empAndVendorLoading['VisaSponsorId'] = true;

  this.seafarerService.getEmployees().subscribe({
    next: (res: DropdownOption[]) => {
      this.employees = res;
      this.empAndVendorLoading['EmpId'] = false;
      
      // set selected value if empId already exists
      const empId = this.seafarerForm.get('EmpId')?.value;
      if (empId) {
        this.selectedValues['EmpId'] = this.employees.find(
          e => e.Value.toString() === empId.toString()
        ) || null;
      }
    },
    error: (err) => {
      console.error(err);
      this.empAndVendorLoading['EmpId'] = false;
    }
  });

  this.seafarerService.getVendors().subscribe({
    next: (res: DropdownOption[]) => {
      this.vendors = res;
      this.empAndVendorLoading['VisaSponsorId'] = false;
      
      // set selected value if empId already exists
      const sponsorId = this.seafarerForm.get('VisaSponsorId')?.value;
      if (sponsorId) {
        this.selectedValues['VisaSponsorId'] = this.vendors.find(
          v => v.Value.toString() === sponsorId.toString()
        ) || null;
      }
    },
    error: (err) => {
      console.error(err);
      this.empAndVendorLoading['VisaSponsorId'] = false;
    }
  });
}


  // -----------Edit with Mapping ------------
  onEditSeafarer(seafarer: any) {
    if (seafarer && seafarer.Id) {
      this.isEdit = true;
      this.seafarerDialog = true;
      
      //collect all data from the API and pass it to the modal
      const seafarerDetails = {
        entity: seafarer,
        Qualifications: this.Qualifications.filter(q => q.SeaFarerId === seafarer.Id),
        Certificates: this.Certificates.filter(c => c.SeaFarerId === seafarer.Id),
        Languages: this.Languages.filter(l => l.SeaFarerId === seafarer.Id),
        References: this.References.filter(r => r.SeaFarerId === seafarer.Id),
        // WorkExperiences: this.WorkExperiences.filter(w => w.SeaFarerId === seafarer.Id),
      };
      
      //pass the data to the modal
      this.openSeafarerModal(seafarerDetails);
    }
  }

  // -----------calculate Age-------------
    calculateAge(event: Event) {
    const input = event.target as HTMLInputElement;
    const date = input.value;
    if (!date) return;
  
    const birthDate = new Date(date);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    const ageCtrl = this.seafarerForm.get('Age');
    if (ageCtrl) ageCtrl.setValue(age);
  }
  

  // -----------Active&Inactive-------------
  
  toggleSeafarerStatus(seafarer: any): void {
    const newStatus = seafarer.Status === 1 ? 2 : 1; 
    this.loading = true;
  
    this.seafarerService
      .activateOrDeactivateSeafarer(seafarer.Id, seafarer.EmpId, newStatus)
      .subscribe({
        next: (res) => {
          // Update the status in the form data if it's different from the current status
          seafarer.Status = newStatus;
          // console.log(res);
          
          this.loading = false;
        },
        error: (err) => {
          console.error('Error updating status', err);
          this.loading = false;
        },
      });
  }
  
  

}
