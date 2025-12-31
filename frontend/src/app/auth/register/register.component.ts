import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyNameService } from 'src/app/core/services/compny-name.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
onSubmit() {
throw new Error('Method not implemented.');
}
    registrationForm!: FormGroup;

  constructor(private companyService : CompanyNameService , 
    private fb: FormBuilder,
  //private authService: AuthService,
private router: Router) {}

  ngOnInit(): void {
        this.registrationForm = this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', Validators.required],
          companyname : ['',Validators.required]
        });
  }
  onRegisterSuccess(){
    const companyName = this.registrationForm.value.companyname;
   
   // or wherever the name is fetched
  this.companyService.setCompanyName(companyName);
  }
}
