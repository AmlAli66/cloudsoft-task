import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeafarerService {

  private readonly baseUrl = environment.apiUrl;
  // private baseUrl = 'https://test.erppluscloud.com:4338/api';

  constructor(private http: HttpClient) {}

  getAllSeafarers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/MarineServices/GetAllSeafarers?Direction=Itr&inCT`);
  }

  getEmployees(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/POS/FillEmployee?Id=0&text=&Direction=ltr&InCT`);
  }

  getVisaSponsors(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/LegalAffairs/FillVendor?Id=0&text=&Direction=ltr&InCT`);
  }

  saveSeafarer(body: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/MarineServices/SaveSeafarer?InCT`, body);
  }

  getVendors(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/LegalAffairs/FillVendor?Id=0&text=&Direction=ltr&InCT`);
  }
  

  activateOrDeactivateSeafarer(id: number, empId: number, status: number): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/MarineServices/ActivateAndInActivateSeafarer?Id=${id}&InCT&Status=${status}&EmpId=${empId}`,
      {}
    );
  }

  // updateSeafarer(id: number, data: any) {
  //   return this.http.put(`${this.baseUrl}/EditSeafarer/${id}`, data);
  // }
  
  
}
