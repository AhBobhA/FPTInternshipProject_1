import { AuthFail, AuthSuccess } from "./authStore.actions";
import { createReducer, on } from '@ngrx/store';

export const loginStatus : boolean = false

export const authStoreReducer = createReducer(
    loginStatus,
    on (AuthSuccess, () => true),
    on (AuthFail, () => false)
)
