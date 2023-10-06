import { Component, OnInit } from '@angular/core';
import { WeatherService } from './service/weather.service';
import { Forecastday, WeatherData } from './model/weather';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'WeatherApp';

  data?: WeatherData;
  date: string | null = '';
  forecastDays!: any;
  forecastDaysData!: WeatherData['forecast']['forecastday'];
  city: string='';
  imageUrl: string='';
  selectedUnit: string = 'metric';

  constructor(private weatherService: WeatherService, private datePipe: DatePipe){}

  ngOnInit(): void {
    
  }

  private getWeatherData(city:string){
    this.weatherService.getWeatherData(city)
                      .subscribe({
                        next: (response: WeatherData) => {
                          this.data = response;
                          this.date = this.datePipe.transform(new Date(response.location.localtime), 'EEEE, MMMM d hh:mm a');
                          this.imageUrl = response.forecast.forecastday[0].hour[new Date(response.location.localtime).getHours()].condition.icon;                          
                          this.forecastDays = this.getForecastDays(response);
                          this.forecastDaysData = this.getForecastDaysData(response);
                        },
                        error: (error) => {
                          alert(error.message);
                          this.data = undefined;
                        }
                      });
  }

  onSearch(){
    this.getWeatherData(this.city);
    
  }

  changeUnit(unit: string){
    this.selectedUnit = unit;
  }

  getForecastDays(response: WeatherData): string[]{
    const result:any = response.forecast.forecastday.map((day) =>
    {
      const parts = day.date.split('-');
      const year = parseInt(parts[0]);
      const month = parseInt(parts[1]) - 1;
      const date = parseInt(parts[2]);
      const dateObject = new Date(year, month, date);
      return this.datePipe.transform(dateObject, 'EEEE');
      
    }
    );
    result.shift();
    return result;
  }

  getForecastDaysData(response: WeatherData): any{
    const result: any = response.forecast.forecastday;
    result.shift();
    return result;
  }
}