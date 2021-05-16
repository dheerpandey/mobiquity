import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/internal/Observable'
import { zip } from 'rxjs/internal/observable/zip'
import { ApiException } from '../models/api-exception.model'
import { ApiResponse } from '../models/api-response.model'

@Injectable({
    providedIn: 'root',
})
export class WeatherService {
    weatherAPIBaseURL: string
    appId: string
    constructor(private http: HttpClient) {
        //TODO: Need to be loaded from backend service.
        this.weatherAPIBaseURL = 'http://api.openweathermap.org/data/2.5/'
        this.appId = '3d8b309701a13f65b660fa2c64cdc517'
    }

    getWeatherReportForMultipleCities(cities: string[]): Observable<any> {
        let observables = []
        cities.forEach((city) => {
            observables.push(this.getWeatherReportByCity(city))
        })

        return zip(...observables)
    }

    private getWeatherReportByCity(cityCountry: string): Observable<any> {
        // TODO::: Base URL and appId concatnation should be done from HTTPRequest Interceptor
        return this.http.get<any>(
            `${this.weatherAPIBaseURL}weather?q=${cityCountry}&appid=${this.appId}`
        )
    }

    public getWeatherForecast(cityCountry: string = 'London,GB'): Observable<any> {
        // TODO::: Base URL and appId concatnation should be done from HTTPRequest Interceptor
        return this.http.get<any>(
            `${this.weatherAPIBaseURL}forecast?q=${cityCountry}&appid=${this.appId}`
        )
    }
}
