import { NgModule } from '@angular/core'
import { ReportsRoutingModule } from './reports-routing.module'
import { HomeComponent } from './components/home/home.component'
import { SharedModule } from '../shared/shared.module'
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component'

@NgModule({
    declarations: [HomeComponent, WeatherForecastComponent],
    imports: [ReportsRoutingModule, SharedModule],
})
export class ReportsModule {}
