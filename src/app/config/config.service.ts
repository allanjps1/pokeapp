import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from '../shared/config/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  configUrl = 'assets/config.json';
  public configuration: Config | undefined;

  constructor(private http: HttpClient) {
  }

  getConfig() {
    return this.http.get<Config>(this.configUrl).toPromise().then(data => {
      this.configuration = data;
    });
  };
} 
