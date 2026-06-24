import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Utility {
  private baseUrl = '/api/utilities';

  constructor(private http: HttpClient) {}

  formFile(date: string, julianDay: string): Observable<string[]> {
    const params = new HttpParams()
      .set('date', date)
      .set('julianDay', julianDay);
    return this.http.get<string[]>(`${this.baseUrl}/form-file`, { params });
  }

  uploadBatch(batchName: string, date: string, julianDay: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/upload-batch`, {
      batchName,
      date,
      julianDay,
    });
  }

  extractRejectedItems(
  date: string,
  julianDay: string,
  seNumbers: string[],
  includeSocHeader: boolean
): Observable<void> {
  return this.http.post<void>(`${this.baseUrl}/extract-rejected-items`, {
    date,
    julianDay,
    seNumbers,
    includeSocHeader
  });
}
}