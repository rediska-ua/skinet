import {HttpHandler, HttpInterceptor, HttpRequest, HttpEvent} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {NavigationExtras, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class ErrorInterseptor implements HttpInterceptor {

  constructor(private router: Router, private toaster: ToastrService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(err => {
        if (err) {
          if (err.status === 400) {
            if (err.error.errors) {
              throw err.error;
            } else {
              this.toaster.error(err.error.message, err.error.statusCode);
            }
          }
          if (err.status === 401) {
            this.toaster.error(err.error.message, err.error.statusCode);
          }
          if (err.status === 404) {
            this.router.navigateByUrl('/not-found');
          }
          if (err.status === 500) {
            const navigationExtras: NavigationExtras = {state: {err: err.error}};
            this.router.navigateByUrl('/server-error', navigationExtras);
          }
        }
        return throwError(err);
      })
    );
  }

}
