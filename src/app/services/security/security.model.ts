/**
 * Copyright 2021 NHS Digital
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { HttpErrorResponse } from "@angular/common/http";
import { MdmResourcesError, MdmResourcesResponse } from "@mdm/services/mdm-resources/mdm-resources.model";

/**
 * Credentials to send to `mdm-resources` for the sign-in operation.
 */
export interface SignInCredentials {
  username: string;
  password: string;
}

/**
 * The result of a successful sign-in operation.
 */
export interface SignInResult {
  id: string;
  token?: string;
  emailAddress: string;
  firstName: string;
  lastName: string;
  pending: boolean;
  disabled: boolean;
  createdBy: string;
  userRole?: string;
  needsToResetPassword?: boolean;
}

export enum SignInErrorType {
  UnknownError,
  InvalidCredentials,
  AlreadySignedIn  
}

/**
 * Represents an error that occurred during sign-in.
 */
export class SignInError extends MdmResourcesError {

  /**
   * The type of sign-in error that occurered, represented by the `SignInErrorType` enum constants.
   */
  type: SignInErrorType;

  constructor(response: HttpErrorResponse) {
    super(response);
    switch (response.status) {
      case 401: 
        this.type = SignInErrorType.InvalidCredentials; 
        break;
      case 409:
        this.type = SignInErrorType.AlreadySignedIn;
        break;
      default:
        this.type = SignInErrorType.UnknownError;
        break;
    }
  }
}

/**
 * Represents an error that occurred during a check for an authenticated session.
 */
export class AuthenticatedSessionError extends MdmResourcesError {

  readonly invalidated: boolean;

  constructor(response: HttpErrorResponse) {
    super(response);

    this.invalidated = response.status === 500 && response.message === 'Session has been invalidated';
  }
}

export interface AuthenticatedSessionResult {
  authenticatedSession: boolean
}

export interface AdministrationSessionResult {
  applicationAdministrationSession: boolean;
}

export type SignInResponse = MdmResourcesResponse<SignInResult>;
export type AdministrationSessionResponse = MdmResourcesResponse<AdministrationSessionResult>;
export type AuthenticatedSessionResponse = MdmResourcesResponse<AuthenticatedSessionResult>

/**
 * Represents the common details of a signed in user.
 */
export interface UserDetails {
  id: string;
  token?: string;
  firstName: string;
  lastName: string;
  userName: string;
  role?: string;
  isAdmin?: boolean;
  needsToResetPassword?: boolean
}