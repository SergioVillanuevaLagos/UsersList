import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

export interface Beneficiary {
  id?: number;
  nombres: string;
  apellidos: string;
  email: string;
  telefono: string;
  comuna: string;
  rut: string;
  direccion?: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {
  private apiUrl = `${environment.apiUrl}/beneficiarios`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ...this.authService.getAuthHeaders()
    });
    return headers;
  }

  getAllBeneficiaries(): Observable<Beneficiary[]> {
    return this.http.get<Beneficiary[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getBeneficiaryById(id: number): Observable<Beneficiary> {
    return this.http.get<Beneficiary>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createBeneficiary(beneficiary: Beneficiary): Observable<Beneficiary> {
    return this.http.post<Beneficiary>(this.apiUrl, beneficiary, { headers: this.getHeaders() });
  }

  updateBeneficiary(id: number, beneficiary: Beneficiary): Observable<Beneficiary> {
    return this.http.put<Beneficiary>(`${this.apiUrl}/${id}`, beneficiary, { headers: this.getHeaders() });
  }

  deleteBeneficiary(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}


