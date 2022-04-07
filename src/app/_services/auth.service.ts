import { Injectable, ɵisListLikeIterable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NewProduct, Product, ProductAttributes } from '../_models';
import { environment } from '../../environments/environment';
import { CombineLatestOperator } from 'rxjs/internal/observable/combineLatest';
import { visitAll } from '@angular/compiler';
const host: string = environment.host;

interface Session {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    provider: string,
    confirmed: boolean,
    blocked: boolean,
    createdAt: string,
    updatedAt: string,
  };
}
 

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<Session>;
  public currentUser: Observable<Session>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Session>(
      JSON.parse(localStorage.getItem('session')),
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Session {
    return this.currentUserSubject.value;
  }

  public login(identifier: string, password: string): Observable<any> {
    return this.http
    .post<Session>(`${host}/auth/local`, {
      identifier,
      password
    })
    .pipe(
      map((response: Session) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('session', JSON.stringify(response));
        this.currentUserSubject.next(response);
        return response;
      }),
    );


  }
  public logout(): void {
    // remove user from local storage and set current user to null
    localStorage.removeItem('session');
    this.currentUserSubject.next(null);
  }

}



