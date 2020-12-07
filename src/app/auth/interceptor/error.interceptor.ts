import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from 'src/app/_alert';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor( private auth: AuthService,
                 private alert: AlertService ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {

            if(err.status === 409 ){
                this.alert.warn(err.error.content);
            }
            if(err.status === 405 ){
                this.alert.warn("Método no permitido");
            }
            if(err.status === 400 ){
                this.alert.warn("Error 400");
            }
            if(err.status === 500 ){
                this.alert.warn("Error 500 " + err.error.message);
            }
            if(err.status === 401 ){
                if(err.error.message === "JWT signature does not match locally computed signature. JWT validity cannot be asserted and should not be trusted.")
                    err.error.message = "El token es inválido"; 
                this.alert.error(err.error.message);
            }
            return throwError(err.error);
        }))
    }
}