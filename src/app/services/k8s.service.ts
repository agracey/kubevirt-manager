import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl ='/k8s/api/v1'

@Injectable({
  providedIn: 'root'
})
export class K8sService {

  constructor(private http: HttpClient) { }

  getNodes(): Observable<any> {
    return this.http.get(`${baseUrl}/nodes`);
  }

  getNamespaces(): Observable<any> {
    return this.http.get(`${baseUrl}/namespaces`);
  }

  getNodeInfo(nodeName: string): Observable<any> {
    return this.http.get(`${baseUrl}/nodes/${nodeName}`);
  }
}
