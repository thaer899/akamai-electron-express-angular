import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { finalize } from 'rxjs/operators/finalize';

import { NgProgress } from 'ngx-progressbar';




@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
    constructor(public _ngProgress: NgProgress) { }
    private _inProgressCount = 0;

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      // Clone the request to add the new header.
      this._inProgressCount++;
    if (      this._inProgressCount === 1    ) {
      this._ngProgress.start();
    }
    return next.handle(req).pipe(finalize(() => {
      this._inProgressCount--;
      if (this._inProgressCount === 0) {
        this._ngProgress.done();
      }
    }));
}
}
