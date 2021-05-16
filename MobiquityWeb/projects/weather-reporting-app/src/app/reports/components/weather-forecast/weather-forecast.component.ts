import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs/internal/Subscription'
import { TileViewModel } from '../../../core/models/tile.view.model'
import { WeatherService } from '../../../core/services/weather.service'

@Component({
  selector: 'wr-app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss'],
})
export class WeatherForecastComponent implements OnInit {
  tilesViewModel: TileViewModel[] = []
  responsive = true
  cols = 1
  private subscription: Subscription;
  TIME = '09:00:00'; // TODO: Should be ENUM.
  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute
  ) { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.loadWeatherForecastData()
  }

  loadWeatherForecastData() {
    this.route.params.subscribe((value) => {
      const forecastParam = value.id;
      this.subscription = this.weatherService
        .getWeatherForecast(forecastParam)
        .subscribe((resposeData: any) => {
          if (resposeData) {
            resposeData.list.forEach((forecastData) => {
              const time = forecastData.dt_txt.split(' ')

              if (time.length > 1 && time[1].trim() === this.TIME) {
                const title = time[0]
                const content = `<div><strong>Temperature :: </strong>${forecastData.main.temp}<div>
                        <div><strong>Sea Level :: </strong>${forecastData.main.sea_level}<div>`

                this.tilesViewModel.push(
                  new TileViewModel(forecastParam, title, content)
                );
              }
            });
          }
        });
    });
  }
}
