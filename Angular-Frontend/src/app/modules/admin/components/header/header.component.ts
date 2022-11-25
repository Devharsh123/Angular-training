import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import { LogOut } from 'src/app/store/actions/auth.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn!: boolean
  constructor(private authService: AuthService, private route: Router) { }
  // private store: Store<AppState>
  ngOnInit(): void {
    const auth = this.authService.loadUserToken()
    if (auth?.token && auth.user) {
      this.isUserLoggedIn = true
    } else {
      this.isUserLoggedIn = false
    }
  }
  onLogout() {
    // this.store.dispatch(new LogOut)
    this.authService.logout()
  }
}
