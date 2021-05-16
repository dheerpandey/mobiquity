import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
    MatCardModule,
    MatGridListModule,
    MatIconModule,
} from '@angular/material'
import { MatGridListResponsive } from './directives/mat-grid-list-responsive.directive'
import { WeatherService } from '../core/services/weather.service'
import { HttpClient } from '@angular/common/http'

@NgModule({
    declarations: [MatGridListResponsive],
    imports: [CommonModule],
    exports: [
        CommonModule,
        MatGridListModule,
        MatGridListResponsive,
        MatIconModule,
        MatCardModule,
    ],
})
export class SharedModule {}
