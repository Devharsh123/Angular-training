import { User } from "src/app/utils/user"
import { All, AuthActionTypes } from "../actions/auth.actions"

export interface State{
isAuthenticated: boolean
user: User | null
errorMessage: string | null
}

export const initalState: State = {
    isAuthenticated:false,
    user: null,
    errorMessage: null
}


export const reducer=(state = initalState, action: All):State=>{
switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS:{
        return{
            ...state,
            isAuthenticated: true,
            user:{
                token: action.payload.token,
                email: action.payload.email
            },
            errorMessage: null
        }
    }
    case AuthActionTypes.LOGIN_FAILURE:{
        return { 
            ...state,
            user: null,
        isAuthenticated: false,
            errorMessage: ' Incorrect email or password'
        }
    }

    case AuthActionTypes.SIGNUP_SUCCESS: {
        return {
          ...state,
          isAuthenticated: false,
          user: action.payload,
          errorMessage: null
        };
      }

      case AuthActionTypes.SIGNUP_FAILURE: {
        return {
          ...state,
          errorMessage: 'That email is already in use.'
        };
      }

      case AuthActionTypes.LOGOUT: {
        return initalState;
      }

    default:
     return {...state};
}
}
