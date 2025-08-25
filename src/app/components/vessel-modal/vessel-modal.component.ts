import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { CustomDropdownComponent } from "../../shared/custom-dropdown/custom-dropdown.component";

@Component({
  selector: 'app-vessel-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, DialogModule, ButtonModule, ReactiveFormsModule, CustomDropdownComponent ,FileUploadModule],
  templateUrl: './vessel-modal.component.html',
  styleUrl: './vessel-modal.component.scss'
})
export class VesselModalComponent {
  @Input() visible = false;
  @Input() isEdit = false;
  @Input() vessel: any = {};
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onSave = new EventEmitter<any>();

  vesselForm!: FormGroup;

  vesselTypesOptions = [
    { Id: 1, Text: 'Cargo' },
    { Id: 2, Text: 'Tanker' }
  ];
  flagsOptions = [
    { Id: 1, Text: 'Panama' },
    { Id: 2, Text: 'Liberia' },
    { Id: 3, Text: 'Marshall Islands' },
    { Id: 4, Text: 'Russia' },
  ];
  ourFleetOptions=[
    { Id: 1, Text: 'Yes' },
    { Id: 2, Text: 'No' },
  ]
  
  gearedCranesOptions=[
    { Id: 1, Text: 'Yes' },
    { Id: 2, Text: 'No' },
  ]

  ecdisTypeOptions=[
    { Id: 1, Text: 'Type A' },
    { Id: 2, Text: 'Type B' },
  ]
  
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
   this.initForm(); 
  }

  initForm(){
    this.vesselForm = this.fb.group({
      name: [this.vessel.name || '', Validators.required],
      shipOwner: [this.vessel.shipOwner || '', Validators.required],
      mms: [this.vessel.mms || ''],
      ourFleet: [this.vessel.ourFleet || ''],
      shipManager: [this.vessel.shipManager || '', Validators.required],
      callSign: [this.vessel.callSign || ''],
      imo: [this.vessel.imo || ''],
      dwt: [this.vessel.dwt || ''],
      phone: [this.vessel.phone || ''],
      builtYear: [this.vessel.builtYear || ''],
      grt: [this.vessel.grt || ''],
      email: [this.vessel.email || '', [Validators.email]],
      vesselType: [this.vessel.vesselType || '', Validators.required],
      teu: [this.vessel.teu || ''],
      cargoPumpType: [this.vessel.cargoPumpType || ''],
      flag: [this.vessel.flag || '', Validators.required],
      cargoTanks: [this.vessel.cargoTanks || ''],
      engineModel: [this.vessel.engineModel || ''],
      gearedCranes: [this.vessel.gearedCranes || ''],
      cargoGear: [this.vessel.cargoGear || ''],
      engineType: [this.vessel.engineType || ''],
      dims: [this.vessel.dims || ''],
      speed: [this.vessel.speed || ''],
      enginePowerHp: [this.vessel.enginePowerHp || ''],
      ecdisType: [this.vessel.ecdisType || ''],
      enginePowerKw: [this.vessel.enginePowerKw || ''],
      comment: [this.vessel.comment || ''],
      attachments: [this.vessel.attachments || []]
    });
  }
  save() {
    if (this.vesselForm.valid) {
      this.onSave.emit(this.vesselForm.value);
      this.closeDialog();
    } else {
      this.vesselForm.markAllAsTouched();
    }
  }

  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }


  // *********************************file upload handler************************************


  files: File[] = [];

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const selectedFiles = Array.from(input.files) as File[];
      this.files.push(...selectedFiles);
    }
  }
  
onDragOver(event: DragEvent) {
  event.preventDefault();
}

onDrop(event: DragEvent) {
  event.preventDefault();
  if (event.dataTransfer?.files) {
    const droppedFiles = Array.from(event.dataTransfer.files);
    this.files.push(...droppedFiles);
  }
}

removeFile(index: number) {
  this.files.splice(index, 1);
}

clearFiles() {
  this.files = [];
}

uploadFiles() {
  console.log('Uploading files:', this.files);
  // API upload logic
}

  

  
}
