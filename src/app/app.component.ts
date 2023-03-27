import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Chart ,ChartOptions,registerables} from 'chart.js';



Chart.register(...registerables);

import { ChartConfiguration, LineController, LineElement, PointElement, LinearScale, Title} from 'chart.js' 

Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
import zoomPlugin from 'chartjs-plugin-zoom';
import { BaseChartDirective } from 'ng2-charts';
Chart.register(zoomPlugin);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('chart1') chart1!: BaseChartDirective;
  @ViewChild('chart2') chart2!: BaseChartDirective;
  title = 'chartjs-V3';
  public rangeDragZoom = { min: 0, max: 0 }
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Series A',
        fill: true,
        tension: 0.5,
        borderColor: '#3399CC',
        backgroundColor: '#3399CC',
        pointBackgroundColor:"#3399CC"
      },
    ],
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
    scales: {
      y: {
        /* min: 20,
        max: 80, */
      },
    },
    plugins: {
      zoom: {
        limits: {
          // axis limits
          y: {min: 40, max: 55},
        },
        zoom: {
          drag: {
            enabled: false,
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


  public lineChartData2: ChartConfiguration<'line'>['data'] = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Series A',
        fill: false,
        tension: 0.5,
        borderColor: '#3399CC',
        backgroundColor: '#3399CC',
        pointBackgroundColor:"#3399CC"
      },
    ],
  };
  public lineChartOptions2: ChartOptions<'line'> = {
    responsive: false,
    scales: {
      y: {
        /* min: 20,
        max: 80, */
      },
    },
    plugins: {
      zoom: {
        limits: {
          // axis limits
          y: {min: 40, max: 55},
        },
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
          mode: 'x',
          /* onZoom: function({ chart }) {
            this.chart1!.chart!.options.scales.xAxes[0].ticks.min = chart.scales['x-axis-0'].min;
            chart1.options.scales.xAxes[0].ticks.max = chart.scales['x-axis-0'].max;
            chart1.options.scales.xAxes[0].options.animation = false;
            chart1.update();
        },
        onZoomComplete: function({ chart }) {
            chart1.options.scales.xAxes[0].ticks.min = chart.scales['x-axis-0'].min;
            chart1.options.scales.xAxes[0].ticks.max = chart.scales['x-axis-0'].max;
            chart1.options.scales.xAxes[0].options.animation = true;
            chart1.update();
        } */
        },
      },
    },
  };
  


  ngAfterViewInit(): void {
    this.chart2!.chart!.canvas.addEventListener('pointerdown', event => {


      let x_index = this.chart2!.chart!.scales['x'].getValueForPixel(event.offsetX);
      console.log("x down", x_index)

      this.rangeDragZoom.min = x_index || 0;



    });

    this.chart2!.chart!.canvas.addEventListener('pointerup', event => {
      const x_index = this.chart2!.chart!.scales['x'].getValueForPixel(event.offsetX);
      console.log("x up", x_index)

      this.rangeDragZoom.max = x_index || 0;

      if (this.rangeDragZoom.max - this.rangeDragZoom.min < 0) {
        let interm = this.rangeDragZoom.max
        this.rangeDragZoom.max = this.rangeDragZoom.min
        this.rangeDragZoom.min = interm
      }

      if (this.rangeDragZoom.max - this.rangeDragZoom.min > 1)

      this.chart1!.chart!.zoomScale("x", this.rangeDragZoom);
       /*  for (const k of Object.keys(Chart.instances)) {
          const c = Chart.instances[k];
          if (c.id !== this.chart2!.chart!.id)
            c.zoomScale("x", this.rangeDragZoom);
        } */
      else if (this.rangeDragZoom.max - this.rangeDragZoom.min == 0)

      this.chart1!.chart!.zoomScale("x", this.rangeDragZoom);



    });
    this.chart2!.chart!.canvas.addEventListener('dblclick', event => {

      for (const k of Object.keys(Chart.instances)) {
        const c = Chart.instances[k];
        c.resetZoom();
      }

    });
  }
}
