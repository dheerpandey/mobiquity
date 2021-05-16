import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { of } from 'rxjs'
import { delay } from 'rxjs/operators'
import { WeatherService } from '../../../core/services/weather.service'
import { SharedModule } from '../../../shared/shared.module'
import { ReportsRoutingModule } from '../../reports-routing.module'
import { WeatherForecastComponent } from '../weather-forecast/weather-forecast.component'
import { HomeComponent } from './home.component'
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let compiled;
  let weatherService: WeatherService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, WeatherForecastComponent],
      imports: [ReportsRoutingModule, SharedModule, RouterTestingModule, HttpClientTestingModule ],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    fixture.autoDetectChanges(true);
    compiled = fixture.debugElement.nativeElement;
    component = fixture.componentInstance;
    weatherService = fixture.debugElement.injector.get(WeatherService);
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it(`Title View Model Object Created as expected`, fakeAsync(() => {
   fixture.whenStable();
   spyOn(weatherService, "getWeatherReportForMultipleCities").and.callFake(
      () => {
        return of([{
          "main": {
            "temp": 286.97
          },
          "sys": {
            "country": "GB",
            "sunrise": 1621051712,
            "sunset": 1621107921
          },
          "name": "London"
        }]).pipe(delay(300));
      });

    component.loadWeatherData();
    expect(component.tilesViewModel.length).toEqual(0);
    tick(300);
    expect(component.tilesViewModel.length).toEqual(1);
    expect(component.tilesViewModel[0].title).toBe("London");
    expect(component.tilesViewModel[0].id).toBe("London,GB");
    expect(component.tilesViewModel[0].content).toContain("286.97");
    expect(component.tilesViewModel[0].content).toContain("1621051712");
    expect(component.tilesViewModel[0].content).toContain("1621107921");
  }));
})
