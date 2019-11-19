import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { log } from 'util';
import { catchError } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
    providedIn: 'root'
})
export class DashboardService extends CommonService {
    public subjectAdjustErrorDummy = new Subject<any>();
    public readonly serviceNodeUrl: string;
    private readonly airportURL: string;

    constructor(private http: HttpClient) {
        super(http);
        this.airportURL = 'airport/';
    }

    public getByEntity(controller: string, entity: any): Observable<any> {
        const temporaryAccessSubject = new Subject();

        this.httpClient.post<any>(`${this.serviceFlaskUrl}${controller}`, entity).subscribe(response => {
            temporaryAccessSubject.next(response);
        });
        return temporaryAccessSubject.asObservable();
    }

    public getAirport(): Observable<any> {
        return this.http.get(`${this.serviceNodeUrl}${this.airportURL}`)
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
