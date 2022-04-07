import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
// import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(
    // private toastrService: ToastrService
    ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>): any => {
        const { method } = request;
        if (event instanceof HttpResponse) {
          if (event.body && event.body.message) {
            const { message } = event.body;
            // this.toastrService.success(message);
            console.log('test');
          }
        }
      }),
      retry(1),
      catchError((error: HttpErrorResponse) => {
        const { statusCode } = error.error;
        const message = error.error.message || error.message;
        console.log('test error', message);
        // this.toastrService.success(message)


        return throwError('Error');
        // if (statusCode === 400 || statusCode === 422) {
        //   this.toastrService.warning(message, 'Solicitud incorrecta');
        //   // console.log(error.error.validationErrors);
        // }
        // if (statusCode === 404) {
        //   this.toastrService.warning(message, 'No encontrado');
        // }
        // if (statusCode === 409) {
        //   this.toastrService.warning(message, 'Problema');
        // }
        // if (statusCode === 403) {
        //   this.toastrService.warning(message, 'Prohibido');
        // }
        // if (statusCode === 401) {
        //   this.toastrService.warning(message, 'Sin autorización');
        // }
        // if (statusCode === 410) {
        //   this.toastrService.warning(message, 'Registro eliminado');
        // }

        // if (statusCode >= 500) {
        //   this.toastrService.error(message, 'Error');
        // }
        // return throwError(message);
      }),
    );
  }
}
