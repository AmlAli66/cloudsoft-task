export interface Qualification {
    DegreeOrCourse: string;
    CourseIssueDate: string;
    ExpiryDate: string;
    MajorOrSubject: string;
    University: string;
    Country: string;
    Type: number;
    SeaFarerId?:number;
  }
  
  export interface Certificate {
    Capacity: string;
    Regulation: string;
    IssueDate: string;
    ExpiryDate: string;
    IssuingAuthority: string;
    Limitations: string;
    Country: string;
    Type: number;
    SeaFarerId?:number;
  }
  
  export interface Language {
    Id?: number;
    SeaFarerId?: number;
    Language: string;
    Spoken: string;
    Written: string;
    Understood: string;
    MotherTongue: string;
    CreatedEmpId: number;
    CreatedDate: string;   
    UpdatedEmpId?: number | null;
    UpdatedDate?: string | null;
    DeletedEmpId?: number | null;
    DeletedDate?: string | null;
    IsDeleted: boolean;
  }
  
  export interface Reference {
    PersonName: string;
    CompanyName: string;
    Country: string;
    Fax: string;
    EmailId: string;
    SeaFarerId?:number;
  }
  
  export interface WorkExperience {
    VesselName: string;
    VesselType: string;
    Rank: string;
    From: string;
    To: string;
    GRT: string;
    BHP: string;
    CompanyName: string;
    SeaFarerId?:number;
  }
  
  export interface Seafarer {
    Id?: number;
    EmpId: number;
    VisaSponsorId: number;
    Name: string;
    PassportNumber?: string;
    PassPortIssueDate?: string;
    PassportExpireDate?: string;
    VisaUAEIdNO?: string;
    VisaIssueDate?: string;
    VisaExpiryDate?: string;
    Remarks?: string;
    NameOfSpouse?: string;
    NoOfChildren?: number;
    BodyWeight?: number;
    Height?: number;
    NearestAirport?: string;
    ResidenceNumber?: string;
    SkypeID?: string;
    Declaration?: string;
    Nationality?:string;
    InsuranceDate?:string;
    BirthDate?:string;
    Age?:number;
    BirthPlace?:string;
    MaritalStatus?:string;
    EmploymentDate?:string;
    Rank?: string;
    Religion?: string;
  
    
    PermanentAddressHomeCountry?: string;
    ContactNumberHomeCountry?: string;
    ContactNameAndNumberDuringEmergenciesUAE?: string;
    ContactNameAndNumberDuringEmergenciesHome?: string;
  
    SignedOffFromAShipDueToMedicalReason?: boolean;
    SignedOffFromAShipDueToMedicalReasonComment?: string;
    UndergoneAnyMedicalOperation?: boolean;
    UndergoneAnyMedicalOperationComment?: string;
    DoctorConsultation?: boolean;
    DoctorConsultationComment?: string;
    HealthOrDisabilityProblem?: boolean;
    HealthOrDisabilityProblemComment?: string;
    InquiryOrInvolvedMaritimeAccident?: boolean;
    InquiryOrInvolvedMaritimeAccidentComment?: string;
    LicenseSuspendedOrRevoked?: boolean;
    LicenseSuspendedOrRevokedComment?: string;
    Email?: string;
    SeamanBookNo?: string;
    SeamanIssueDate?: string;
    SeamanExpiryDate?: string;
    CicpaNo?: string;
    CicpaIssueDate?: string;
    CicpaExpiryDate?: string;
    Medicals?: MedicalData[]; 
    
    Qualifications?: Qualification[];
    Certificates?: Certificate[];
    Languages?: Language[];
    References?: Reference[];
    WorkExperiences?: WorkExperience[];
    Trainings?: Training[];
  }
  
//  export interface VendorApi {
//     Value: number;
//     Code: string;
//     Text: string;
//   }
//  export interface EmployeeApi {
//     Value: number;
//     Code: string;
//     Email: string;
//     Text: string;

//   }

  export interface DropdownOption {
    Value: number | string;
    Text: string;
    Code: string;
    Email: string;
  }
  export interface Training {
    Course: string;
    Institute: string;
    IssueDate: string;
    ExpiryDate: string;
    SeaFarerId?:number;
  }
  
  export interface MedicalData {
    MedicalVaccination: string;
    Date: string;
    ExpiryDate: string;
    Remarks: string;
    SeaFarerId?:number;
}


  