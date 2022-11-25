import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoginData } from 'src/app/services/auth.utils';
import { Login } from 'src/app/store/actions/auth.actions';
import { AppState, selectAuthState  } from 'src/app/store/app.states';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  faLock = faLock
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
  error!: any
  // getState$!: Observable<any>
  // errorMessage!: string | null;

  constructor(
    private authApi: AuthService,
    private router: Router,
    ) {
    }
    // private store: Store<AppState>
    // this.getState$ = this.store.select(selectAuthState)

  ngOnInit(): void {
    // this.getState$.subscribe((state) => {
    //   this.errorMessage = state.errorMessage;
    // })
  }
  onLogin(form: FormGroup) {
    const payload: LoginData = {
      email: form.value.email,
      password: form.value.password
    }
    this.authApi.loginUser(payload).subscribe((res: any) => {
      console.log(res)
      if (res.token && res.user) {
        this.authApi.storeUserData(res.token, res.user._id)
        this.router.navigate(['/admin/home'])
      } else {
        this.error = res.error
      }
    })
    // this.store.dispatch(new Login(payload))
  }
}
