import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType,Effect } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthActionTypes, Login, LogInSuccess, LogInFailure, SignUp, SignUpSuccess, SignUpFailure } from './actions/auth.actions';


@Injectable()
export class AuthEffects {

  // Login$ = createEffect((): any => {
  //   this.actions$.pipe(
  //     ofType(AuthActionTypes.LOGIN),
  //     map((action: Login) => action.payload),
  //     switchMap((action:any) => {
  //       return this.authService.loginUser(action.payload).pipe(
  //         map((auth: any) => {
  //           console.log(auth)
  //           return new LogInSuccess({ token: auth.token, email: auth.user })
  //         })
  //         ,
  //         catchError((error: any) => {
  //           console.log(error)
  //           return of(new LogInFailure({ error: error }))
  //         })
  //       )
  //     })
  //   )
  // })

  // LogInSuccess$ = createEffect((): any => {

  //   this.actions$.pipe(
  //     ofType(AuthActionTypes.LOGIN_SUCCESS),
  //     tap((user: any) => {
  //       localStorage.setItem('token', user.payload.token)
  //       this.router.navigate(['/admin/home'])
  //     })
  //   ),
  //     { dispatch: false }
  // })

  // LogInFailure$ = createEffect((): any => {

  //   this.actions$.pipe(
  //     ofType(AuthActionTypes.LOGIN_FAILURE)
  //   ),
  //     { dispatch: false }
  // });

  // SignUp$ = createEffect((): any => {
  //   this.actions$.pipe(
  //     ofType(AuthActionTypes.SIGNUP),
  //     map((action: SignUp) => action.payload),
  //     switchMap(payload => {
  //       return this.authService.registerUser(payload).pipe(
  //         map((user) => {
  //           console.log(user)
  //           return new SignUpSuccess({ user })
  //         }),
  //         catchError((error: any) => {
  //           console.log(error)
  //           return of(new SignUpFailure({ error: error }))
  //         })
  //       )
  //     })
  //   )
  // })

  // SignUpSuccess$ = createEffect(():any=>{
  //   this.actions$.pipe(
  //     ofType(AuthActionTypes.SIGNUP_SUCCESS),
  //     tap((user)=>{
  //       this.router.navigate(['/admin/home'])
  //     })
  //   )
  // })

  // SignUpFailure$ = createEffect(():any=>{
  //   this.actions$.pipe(
  //     ofType(AuthActionTypes.SIGNUP_FAILURE)
  //   )
  // })

  // LogOut$ = createEffect(():any=>{
  //   this.actions$.pipe(
  //     ofType(AuthActionTypes.LOGOUT),
  //     tap((user) => {
  //       localStorage.removeItem('token');
  //     })
  //   )
  // })

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) { }


  // effects go here

}