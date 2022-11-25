import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserData } from 'src/app/services/auth.utils';
import { SignUp } from 'src/app/store/actions/auth.actions';
import { AppState, selectAuthState } from 'src/app/store/app.states';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!:FormGroup
  // getState$!: Observable<any>
  // errorMessage!: string | null;  

  constructor(
    private authApi: AuthService,
     private router:Router,
      private fb:FormBuilder,
      ) {
        this.createForm()
      }
      //  this.getState$ = this.store.select(selectAuthState);
      // private store: Store<AppState>

  ngOnInit(): void {
  }
  // this.getState$.subscribe((state) => {
  //   this.errorMessage = state.errorMessage;
  // });
  createForm(){
    this.registerForm=this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password:['',Validators.required],
      dob: ['',Validators.required],
      address: ['',Validators.required],
      phone: ['',Validators.required]
    })
  }

  onRegister(form: FormGroup) {

    const payload: UserData = {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
      dob: form.value.dob,
      address: form.value.address,
      phone: form.value.phone,
    }
    return this.authApi.registerUser(payload).subscribe((res:any)=>{
      if(res.user){
        console.log(res,'registration succesfull')
        this.router.navigate(['/login']);
      }
      if(res.error){
        console.log(res,'registration failed')
      }
    })

    // this.store.dispatch(new SignUp(payload))
  }
}
