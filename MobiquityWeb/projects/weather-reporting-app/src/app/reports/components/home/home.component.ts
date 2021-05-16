import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs/internal/Subscription'
import { TileViewModel } from '../../../core/models/tile.view.model'
import { WeatherService } from '../../../core/services/weather.service'

@Component({
  selector: 'wr-app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  tilesViewModel: TileViewModel[] = []
  responsive = true
  cols = 1
  private subscription: Subscription;
  constructor(private weatherService: WeatherService) { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadWeatherData()
  }

  loadWeatherData() {
    this.subscription = this.weatherService
      .getWeatherReportForMultipleCities([
        'London,uk',
        'Paris,fr',
        'Brussels,be',
        'Amsterdam,nl',
        'Berlin, de',
      ])
      .subscribe((resposeData: any) => {
        if (resposeData && resposeData.length > 0) {
          resposeData.forEach((weatherData) => {
            const id = `${weatherData.name},${weatherData.sys.country}`
            const content = `<div><strong>Temperature :: </strong>${weatherData.main.temp}<div>
                <div><strong>Sunrise :: </strong>${weatherData.sys.sunrise}<div>
                <div><strong>Sunset :: </strong>${weatherData.sys.sunset}<div>`

            this.tilesViewModel.push(
              new TileViewModel(id, weatherData.name, content)
            )
          })
        }
      }, (error) => {
        console.log(error);
      })
  }
}
