import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { WeatherService } from './services/weather.service'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
    declarations: [],
    imports: [CommonModule],
    exports: [HttpClientModule],
    providers: [WeatherService],
})
export class CoreModule {}
