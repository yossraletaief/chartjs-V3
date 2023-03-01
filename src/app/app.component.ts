import { AfterViewInit, Component } from '@angular/core';
import { Chart ,ChartOptions,registerables} from 'chart.js';



Chart.register(...registerables);

import { ChartConfiguration, LineController, LineElement, PointElement, LinearScale, Title} from 'chart.js' 

Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
import zoomPlugin from 'chartjs-plugin-zoom';
Chart.register(zoomPlugin);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'chartjs-V3';
  myChart: any;
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Series A',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)',
      },
    ],
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
    plugins: {
      zoom: {
        zoom: {
          drag: {
            enabled: true,
            backgroundColor: '#3399CC8C',
          },
          wheel: {
            enabled: false,
          },
          pinch: {
            enabled: true,
          },
          mode: 'xy',
        },
      },
    },
  };
  public lineChartLegend = true;

  
  resetZoom() {
    console.log('resetting zoom');
    this.myChart.resetZoom();
  }

  ngAfterViewInit(): void {
    // line Chart
    this.myChart = new Chart('mapId', {
      type: 'line',
      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
        ],
        datasets: [
          {
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40],

            borderColor: 'rgb(75, 192, 192)',

            backgroundColor: 'orange',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          zoom: {
            zoom: {
              drag: {
                enabled: true,
                backgroundColor: '#3399CC8C',
              },
              wheel: {
                enabled: false,
              },
              pinch: {
                enabled: true,
              },
              mode: 'xy',
            },
          },
        },
      },
    });
    this.myChart.render();
  }
}
