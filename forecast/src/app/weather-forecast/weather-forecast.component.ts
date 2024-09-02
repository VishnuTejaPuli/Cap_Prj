import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent {
  @ViewChild('iframe', { static: true }) iframe!: ElementRef<HTMLIFrameElement>;
  @ViewChild('time', { static: true }) timeEl!: ElementRef<HTMLElement>;
  @ViewChild('date', { static: true }) dateEl!: ElementRef<HTMLElement>;
  @ViewChild('weatherImg', { static: true }) weatherImg!: ElementRef<HTMLImageElement>;
  @ViewChild('weatherTemp', { static: true }) weatherTemp!: ElementRef<HTMLElement>;
  @ViewChild('humidity', { static: true }) humidity!: ElementRef<HTMLElement>;
  @ViewChild('wind', { static: true }) wind!: ElementRef<HTMLElement>;
  @ViewChild('minTemp', { static: true }) minTemp!: ElementRef<HTMLElement>;
  @ViewChild('maxTemp', { static: true }) maxTemp!: ElementRef<HTMLElement>;
  @ViewChild('sunrise', { static: true }) sunrise!: ElementRef<HTMLElement>;
  @ViewChild('sunset', { static: true }) sunset!: ElementRef<HTMLElement>;
  @ViewChild('descr', { static: true }) descr!: ElementRef<HTMLElement>;
  
  private googleMapsApiKey = '0158A5-7030C7-591B9D';
  private weatherApiKey = 'b259c2309135af14a92d08fa1f215c9b';

  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  constructor(private renderer: Renderer2) {}

  showData(event: Event): void {
    event.preventDefault();
    const inp = (document.getElementById('myInput') as HTMLInputElement).value;
    let src = `https://www.google.com/maps/embed/v1/place?key=${this.googleMapsApiKey}&q=${inp}`;
    this.renderer.setAttribute(this.iframe.nativeElement, 'src', src);

    this.updateTimeAndDate();
    this.fetchWeatherData(inp);
  }

  private updateTimeAndDate(): void {
    setInterval(() => {
      const time = new Date();
      const month = time.getMonth();
      const date = time.getDate();
      const day = time.getDay();
      const hour = time.getHours();
      const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
      const minutes = time.getMinutes();
      const seconds = time.getSeconds();
      const ampm = hour >= 12 ? 'PM' : 'AM';

      this.timeEl.nativeElement.innerHTML = `${hoursIn12HrFormat < 10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds} <span id="am-pm" style="float:right; padding-right:30px;">${ampm}</span>`;
      this.dateEl.nativeElement.innerHTML = `${this.days[day]}, ${date} ${this.months[month]}`;
    }, 1000);
  }

  private async fetchWeatherData(location: string): Promise<void> {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${this.weatherApiKey}&units=imperial&cnt=7`;
    const response = await fetch(url);
    const data = await response.json();
    this.updateWeatherUI(data);
  }

  private updateWeatherUI(data: any): void {
    const icon = data.list[0].weather[0].icon;
    let imgSrc = `icons/${icon}.png`;
    if (icon === '10d' || icon === '09d') imgSrc = 'icons/10d_09d.png';
    else if (icon === '09n' || icon === '10n') imgSrc = 'icons/10n_09n.png';

    this.renderer.setAttribute(this.weatherImg.nativeElement, 'src', imgSrc);

    const temp = ((data.list[0].main.temp - 32) * (5 / 9)).toFixed(2);
    const minTemp = (((data.list[0].main.temp_min - 32) * (5 / 9)).toFixed(2));
    const maxTemp = (((data.list[0].main.temp_max - 32) * (5 / 9)).toFixed(2));

    this.weatherTemp.nativeElement.innerHTML = `${temp}<sup style='font-size:18px;'>°C</sup>`;
    this.humidity.nativeElement.textContent = `${data.list[0].main.humidity}%`;
    this.wind.nativeElement.textContent = data.list[0].wind.speed;
    this.minTemp.nativeElement.textContent = minTemp;
    this.maxTemp.nativeElement.textContent = maxTemp;

    const sunrise = new Date(data.city.sunrise * 1000);
    const sunset = new Date(data.city.sunset * 1000);

    this.sunrise.nativeElement.textContent = `${sunrise.getHours()}:${sunrise.getMinutes()}`;
    this.sunset.nativeElement.textContent = `${sunset.getHours()}:${sunset.getMinutes()}`;
    this.descr.nativeElement.textContent = data.list[0].weather[0].description;

    // Display containers
    this.renderer.setStyle(document.querySelector('.day-container'), 'display', 'block');
    this.renderer.setStyle(document.querySelector('.weather-container'), 'display', 'flex');
    this.renderer.setStyle(document.querySelector('.seven-days-container'), 'display', 'flex');
  }

  autocomplete(inputElement: HTMLInputElement, suggestions: string[]): void {
    let currentFocus = -1;

    inputElement.addEventListener('input', () => {
      this.closeAllLists();
      const val = inputElement.value;
      if (!val) return;

      const listContainer = this.renderer.createElement('div');
      this.renderer.setAttribute(listContainer, 'id', `${inputElement.id}-autocomplete-list`);
      this.renderer.setAttribute(listContainer, 'class', 'autocomplete-items');
      this.renderer.appendChild(inputElement.parentNode, listContainer);

      suggestions.forEach(suggestion => {
        if (suggestion.substr(0, val.length).toUpperCase() === val.toUpperCase()) {
          const item = this.renderer.createElement('div');
          item.innerHTML = `<strong>${suggestion.substr(0, val.length)}</strong>${suggestion.substr(val.length)}`;
          item.innerHTML += `<input type='hidden' value='${suggestion}'>`;
          item.addEventListener('click', () => {
            inputElement.value = (item.getElementsByTagName('input')[0] as HTMLInputElement).value;
            this.closeAllLists();
          });
          this.renderer.appendChild(listContainer, item);
        }
      });
    });

    inputElement.addEventListener('keydown', (e: KeyboardEvent) => {
      const x = document.getElementById(`${inputElement.id}-autocomplete-list`);
      if (x) {
        const items = x.getElementsByTagName('div');
        if (e.key === 'ArrowDown') {
          currentFocus++;
          this.addActive(items, currentFocus);
        } else if (e.key === 'ArrowUp') {
          currentFocus--;
          this.addActive(items, currentFocus);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (currentFocus > -1) {
            items[currentFocus]?.click();
          }
        }
      }
    });

    this.renderer.listen('document', 'click', (e: Event) => {
      this.closeAllLists(e.target as Node);
    });
  }

  private addActive(items: HTMLCollectionOf<Element>, index: number): void {
    this.removeActive(items);
    if (index >= items.length) index = 0;
    if (index < 0) index = items.length - 1;
    items[index].classList.add('autocomplete-active');
  }

  private removeActive(items: HTMLCollectionOf<Element>): void {
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove('autocomplete-active');
    }
  }

  private closeAllLists(elmnt?: Node): void {
    const items = document.getElementsByClassName('autocomplete-items');
    for (let i = 0; i < items.length; i++) {
      if (elmnt !== items[i] && elmnt !== document.getElementById('myInput')) {
        items[i].parentNode?.removeChild(items[i]);
      }
    }
  }
}
