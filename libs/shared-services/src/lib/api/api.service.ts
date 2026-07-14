import {
    HttpClient,
    HttpHeaders,
    HttpParams,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '../config/api-base-url.token';

@Injectable({
    providedIn: 'root',
})
export class ApiService {

    private readonly http = inject(HttpClient);

    private readonly baseUrl = inject(API_BASE_URL);

    /**
     * HTTP GET
     */
    get<T>(
        endpoint: string,
        params?: HttpParams,
        headers?: HttpHeaders
    ): Observable<T> {
        return this.http.get<T>(
            this.buildUrl(endpoint),
            {
                params,
                headers,
                withCredentials: true,
            }
        );
    }

    /**
     * HTTP POST
     */
    post<T>(
        endpoint: string,
        body: unknown,
        params?: HttpParams,
        headers?: HttpHeaders
    ): Observable<T> {
        return this.http.post<T>(
            this.buildUrl(endpoint),
            body,
            {
                params,
                headers,
                withCredentials: true,
            }
        );
    }

    /**
     * HTTP PUT
     */
    put<T>(
        endpoint: string,
        body: unknown,
        params?: HttpParams,
        headers?: HttpHeaders
    ): Observable<T> {
        return this.http.put<T>(
            this.buildUrl(endpoint),
            body,
            {
                params,
                headers,
                withCredentials: true,
            }
        );
    }

    /**
     * HTTP PATCH
     */
    patch<T>(
        endpoint: string,
        body: unknown,
        params?: HttpParams,
        headers?: HttpHeaders
    ): Observable<T> {
        return this.http.patch<T>(
            this.buildUrl(endpoint),
            body,
            {
                params,
                headers,
                withCredentials: true,
            }
        );
    }

    /**
     * HTTP DELETE
     */
    delete<T>(
        endpoint: string,
        params?: HttpParams,
        headers?: HttpHeaders
    ): Observable<T> {
        return this.http.delete<T>(
            this.buildUrl(endpoint),
            {
                params,
                headers,
                withCredentials: true,
            }
        );
    }

    /**
     * File Upload
     */
    upload<T>(
        endpoint: string,
        formData: FormData,
        headers?: HttpHeaders
    ): Observable<T> {
        return this.http.post<T>(
            this.buildUrl(endpoint),
            formData,
            {
                headers,
                withCredentials: true,
            }
        );
    }

    /**
     * File Download
     */
    download(
        endpoint: string,
        params?: HttpParams
    ): Observable<Blob> {
        return this.http.get(
            this.buildUrl(endpoint),
            {
                params,
                responseType: 'blob',
                withCredentials: true,
            }
        );
    }

    /**
     * Builds complete API URL.
     */
    private buildUrl(endpoint: string): string {
        return `${this.baseUrl}${endpoint}`;
    }
}