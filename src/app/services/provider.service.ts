import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../models/Task.model';
import { Observable } from 'rxjs';

const url = 'http://localhost:3000/tasks';
const headers = new HttpHeaders({
  'Content-Type': 'Application/json'
});

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get(url, {headers});
  }

  getById(taskId: Number): Observable<any> {
    return this.http.get(url + '/' + taskId, {headers});
  }

  post(task: Task): Observable<any> {
    return this.http.post(url, task, {headers});
  }

  put(task: Task): Observable<any> {
    return this.http.put(url, task, {headers});
  }

  delete(taskId: Number): Observable<any> {
    return this.http.delete(url + '/' + taskId, {headers});
  }

}
