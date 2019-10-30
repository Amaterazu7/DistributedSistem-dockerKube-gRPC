import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { log } from 'util';
import { catchError } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { Login } from '../model/login.model';
import { CommonService } from './common.service';

@Injectable({
    providedIn: 'root'
})
export class FilterService extends CommonService {
    public subjectAdjustErrorDummy = new Subject<any>();
    public readonly serviceBasicUrl: string;
    private readonly airportURL: string;

    constructor(private http: HttpClient) {
        super(http);
        this.airportURL = 'airport/';
    }

    public getAirport(): Observable<any> {
        return this.http.get(`${this.serviceBasicUrl}${this.airportURL}`)
            .pipe(
                catchError((err: HttpErrorResponse) => {
                    this.handlerError(err);
                    return this.subjectAdjustErrorDummy.asObservable();
                }));
    }

    private handlerError(err) {
        log('ERROR ::: === >>>');
        // this.hideSpinner();
        // this.showErrorSnackBar('error message');
        console.table(`An error occurred: "${err.error}"`);
        console.table(`Backend returned code [${err.status}], body was ==>`, err);
    }
}
