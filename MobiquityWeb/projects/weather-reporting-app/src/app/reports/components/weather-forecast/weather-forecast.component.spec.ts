import { HttpClientTestingModule } from '@angular/common/http/testing'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing'
import { ActivatedRoute } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { of } from 'rxjs'
import { delay } from 'rxjs/operators'
import { WeatherService } from '../../../core/services/weather.service'
import { SharedModule } from '../../../shared/shared.module'
import { ReportsRoutingModule } from '../../reports-routing.module'
import { HomeComponent } from '../home/home.component'
import { WeatherForecastComponent } from './weather-forecast.component'

describe('WeatherForecastComponent', () => {
  let component: WeatherForecastComponent
  let fixture: ComponentFixture<WeatherForecastComponent>
  let compiled;
  let weatherService: WeatherService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, WeatherForecastComponent],
      imports: [ReportsRoutingModule, SharedModule, RouterTestingModule, HttpClientTestingModule],
      providers: [{
        provide: ActivatedRoute, useValue: {
          params: of({ id: 'London,GB' })
        }
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents()
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherForecastComponent)
    fixture.autoDetectChanges(true);
    compiled = fixture.debugElement.nativeElement;
    component = fixture.componentInstance;
    weatherService = fixture.debugElement.injector.get(WeatherService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it(`Title View Model Object Created as expected`, fakeAsync(() => {
    fixture.whenStable();
    spyOn(weatherService, "getWeatherForecast").and.callFake(
      () => {
        return of({
          "list": [
            {
              "main": {
                "temp": 286.29,
                "sea_level": 999
              },
              "dt_txt": "2021-05-15 09:00:00"
            },
            {
              "main": {
                "temp": 286.30,
                "sea_level": 888
              },
              "dt_txt": "2021-05-15 12:00:00"
            },
            {
              "main": {
                "temp": 386.30,
                "sea_level": 785
              },
              "dt_txt": "2021-05-16 09:00:00"
            },
            {
              "main": {
                "temp": 533.30,
                "sea_level": 1000
              },
              "dt_txt": "2021-05-17 09:00:00"
            },
            {
              "main": {
                "temp": 4351.30,
                "sea_level": 965
              },
              "dt_txt": "2021-05-18 09:00:00"
            },
            {
              "main": {
                "temp": 7888.30,
                "sea_level": 845
              },
              "dt_txt": "2021-05-19 09:00:00"
            }
          ]
        }).pipe(delay(300));
      });
    component.loadWeatherForecastData();
    expect(component.tilesViewModel.length).toEqual(0);
    tick(300);
    expect(component.TIME).toBe("09:00:00");
    expect(component.tilesViewModel.length).toEqual(5);
    expect(component.tilesViewModel[0].title).toBe("2021-05-15");
    expect(component.tilesViewModel[0].id).toBe("London,GB");
    expect(component.tilesViewModel[0].content).toContain("286.29");
    expect(component.tilesViewModel[0].content).toContain("999");
  }));
})
