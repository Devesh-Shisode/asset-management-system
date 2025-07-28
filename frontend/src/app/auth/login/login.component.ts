import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyNameService } from 'src/app/core/services/compny-name.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
 


  constructor(private companyService : CompanyNameService , private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      companyname : ['',Validators.required]
    });
  }

  onLoginSuccess() {
  const companyName = this.loginForm.value.companyname;
   
   // or wherever the name is fetched
  this.companyService.setCompanyName(companyName); // 🔥 Push name to service
}



  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form Submitted', this.loginForm.value);
    }
  }
}
