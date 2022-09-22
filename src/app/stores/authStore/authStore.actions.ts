import { Action } from "@ngrx/store";

export enum ActionTypes {
    AuthenticateS = '[authStore Component] AuthenticateS',
    AuthenticateF = '[authStore Component] AuthenticateF',
}

export class AuthenticateS implements Action {
    readonly type = ActionTypes.AuthenticateS
}

export class AuthenticateF implements Action {
    readonly type = ActionTypes.AuthenticateF
}

import { createAction } from '@ngrx/store';

export const AuthSuccess = createAction('[authStore Component] AuthSuccess')

export const AuthFail = createAction('[authStore Component] AuthFail')

