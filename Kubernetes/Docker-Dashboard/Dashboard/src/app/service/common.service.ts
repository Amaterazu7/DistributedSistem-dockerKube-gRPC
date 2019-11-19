import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Page } from '../model/page.model';

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    public readonly serviceNodeUrl: string;
    public readonly serviceFlaskUrl: string;

    constructor(public httpClient: HttpClient) {
        this.serviceNodeUrl = 'http://localhost:3000/';
        this.serviceFlaskUrl = 'http://localhost:8077/';
        // this.serviceNodeUrl = 'http://0.0.0.0:3000/';
    }

    public hasEntitlement(entitlement_id: number): boolean {
        return true;
    }

    public save(controller: string, entity: any): Observable<any> {
        const temporaryAccessSubject = new Subject();

        this.httpClient.post<any>(`${this.serviceNodeUrl}${controller}`, entity).subscribe(response => {
            temporaryAccessSubject.next(response);
        });
        return temporaryAccessSubject.asObservable();
    }

    public saveFlask(controller: string, entity: any): Observable<any> {
        const temporaryAccessSubject = new Subject();

        this.httpClient.post<any>(`${this.serviceFlaskUrl}${controller}`, entity).subscribe(response => {
            temporaryAccessSubject.next(response);
        });
        return temporaryAccessSubject.asObservable();
    }

    public update(controller: string, entity: any): Observable<any> {
        const temporaryAccessSubject = new Subject();

        this.httpClient.put<any>(`${this.serviceNodeUrl}${controller}`, entity).subscribe(response => {
            temporaryAccessSubject.next(response);
        });
        return temporaryAccessSubject.asObservable();
    }

    public updateFlask(controller: string, entity: any): Observable<any> {
        const temporaryAccessSubject = new Subject();

        this.httpClient.put<any>(`${this.serviceFlaskUrl}${controller}`, entity).subscribe(response => {
            temporaryAccessSubject.next(response);
        });
        return temporaryAccessSubject.asObservable();
    }

    public getById(controller: string, id: any): Observable<any> {
        const temporaryAccessSubjectPage = new Subject();

        this.httpClient.get<any>( `${this.serviceNodeUrl}${controller}/${id}`).subscribe(response => {
            temporaryAccessSubjectPage.next(response);
        });
        return temporaryAccessSubjectPage.asObservable();
    }

    public getAllPaginatedFiltered(controller: string, filter: any): Observable<Page> {
        const temporaryAccessSubjectPage = new Subject<Page>();
        this.httpClient.post<any>(`${this.serviceNodeUrl}${controller}`, filter).subscribe(response => {
            temporaryAccessSubjectPage.next(response);
        });
        return temporaryAccessSubjectPage.asObservable();
    }

    public getAll(controller: string): Observable<any[]> {
        const temporaryAccessSubjectArray = new Subject<Array<any>>();
        this.httpClient.get<any>(`${this.serviceNodeUrl}${controller}`).subscribe(response => {
            temporaryAccessSubjectArray.next(response);
        });
        return temporaryAccessSubjectArray.asObservable();
    }

    public getAllFlask(controller: string): Observable<any[]> {
        const temporaryAccessSubjectArray = new Subject<Array<any>>();
        this.httpClient.get<any>(`${this.serviceFlaskUrl}${controller}`).subscribe(response => {
            temporaryAccessSubjectArray.next(response);
        });
        return temporaryAccessSubjectArray.asObservable();
    }

    public setEndFlight(date: Date, time) {
        let endFlight = new Date(date);
        const minutes = Number(time.toString().substring(2, 4));
        endFlight = new Date(endFlight.setHours(endFlight.getHours() + time, endFlight.getMinutes() + minutes));
        return endFlight.toISOString();
    }

}
