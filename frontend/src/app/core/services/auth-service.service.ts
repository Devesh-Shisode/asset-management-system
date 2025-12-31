import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
 
  private apiUrl='http://localhost:5000/api/auth/';
  constructor( private http: HttpClient) { }
}
