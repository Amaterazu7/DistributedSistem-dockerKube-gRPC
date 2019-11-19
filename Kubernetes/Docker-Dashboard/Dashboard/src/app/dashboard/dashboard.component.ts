import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../service/dashboard.service';
import { Subscription } from 'rxjs';
import { Airport } from '../model/airport.model';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { Report } from '../model/report.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
    private subscription: Subscription = new Subscription();
    public dialogRef: MatDialogRef<SpinnerComponent>;
    airportFrom: Airport = new Airport();
    airportTo: Airport = new Airport();
    picker1: string;
    picker2: string;
    dateFrom: Date;
    dateTo: Date;
    price: number;
    miles: number;
    airportList: Array<Airport>;
    newAirport: Airport = new Airport();
    displayedColumns: Array<string>;
    reportList: Array<Report>;
    displayedReportColumns: Array<string>;
    formGroup: FormGroup;
    formGroupMiles: FormGroup;

    constructor(public dashboardService: DashboardService, private dialog: MatDialog, private _formBuilder: FormBuilder) {  }

    startAnimationForLineChart(chart) {
        let seq: any, delays: any, durations: any;
        seq = 0;
        delays = 80;
        durations = 500;
        chart.on('draw', function(data) {
        if (data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if (data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
        });
        seq = 0;
    };
    startAnimationForBarChart(chart) {
        let seq2: any, delays2: any, durations2: any;
        seq2 = 0;
        delays2 = 80;
        durations2 = 500;
        chart.on('draw', function(data) {
        if (data.type === 'bar') {
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
        });
        seq2 = 0;
      };

    ngOnInit(): void {
        this.subscription.add( this.dashboardService.getAllFlask('users').subscribe( message => console.log(message) ) );
        this.formGroup = this._formBuilder.group({
            code: ['', Validators.required],
            state: ['', Validators.required],
            state_code: ['', Validators.required],
            address: ['', Validators.required],
            desc: ['', Validators.required]
        });
        this.formGroupMiles = this._formBuilder.group({
            miles: ['', Validators.required],
            price: ['', Validators.required],
        });
        this.createTable();
        this.callAirports();

        /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
        const dataDailySalesChart: any = {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
              [12, 17, 7, 17, 23, 18, 38]
          ]
      };
        const optionsDailySalesChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 50,
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
      };
        const dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);
        this.startAnimationForLineChart(dailySalesChart);

        /* ----------==========     Completed Tasks Chart initialization    ==========---------- */
        const dataCompletedTasksChart: any = {
          labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
          series: [
              [230, 750, 450, 300, 280, 240, 200, 190]
          ]
      };
        const optionsCompletedTasksChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 1000,
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
      };
        const completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);
        // start animation for the Completed Tasks Chart - Line Chart
        this.startAnimationForLineChart(completedTasksChart);

        /* ----------==========     Emails Subscription Chart initialization    ==========---------- */
        const datawebsiteViewsChart = {
        labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
        series: [
          [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

        ]
      };
        const optionswebsiteViewsChart = {
          axisX: {
              showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
      };
        const responsiveOptions: any[] = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
        const websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart,
            responsiveOptions);
        // start animation for the Emails Subscription Chart
        this.startAnimationForBarChart(websiteViewsChart);
    }

    modifyMiles() {
        this.showSpinner();
        this.subscription.add( this.dashboardService.updateFlask(
            'modificarMillas', {miles: this.miles, price: this.price}).subscribe(message => {
                console.log(message);
                this.hideSpinner();
            }) );
    }

    createTable() {
        this.displayedColumns = new Array<string>('id', 'code', 'description', 'state', 'show_airport');
        this.displayedReportColumns = new Array<string>('origin', 'destination', 'cancelled', 'refund');
    }

    callAirports() {
        this.subscription.add(this.dashboardService.getAll('filter/allAirport').subscribe(
            // @ts-ignore
            value => this.createAirport(value.data))
        );
    }

    createAirport(value) {
        this.showSpinner();
        this.airportList = new Array<Airport>();
        value.airportList.forEach(item => {
            this.airportList.push(
                new Airport(item.id, item.code, item.description, item.state, item.state_code, item.address, item.show_airport)
            );
        });
        localStorage.setItem('_airports', JSON.stringify(this.airportList));
        this.hideSpinner();
    }

    createNewAirport() {
        this.showSpinner();
        const entity = {
            code: this.newAirport.code,
            desc: this.newAirport.description,
            state: this.newAirport.state,
            state_code: this.newAirport.state_code,
            address: this.newAirport.address
        };
        this.subscription.add( this.dashboardService.saveFlask( 'altaCiudad', entity).subscribe(
            message => {
                console.log(message);
                this.hideSpinner();
            }) );
    }

    createReportTable(data) {
        let totalValue = 0;
        this.reportList = new Array<Report>();
        for (let i = 0; i < data.length; i++) {
            this.reportList.push(new Report(data[i][0], data[i][1], data[i][2], data[i][3]));
            totalValue += data[i][3];
        }
        this.reportList.push(new Report(null, null, 'TOTAL', Number(totalValue)));
    }

    searchReport() {
        this.showSpinner();
        const reportEntity = {
            inicio: (this.dateFrom) ? this.dateFrom.toISOString().substr(0, 10) : '2019-06-01',
            fin: (this.dateTo) ? this.dateTo.toISOString().substr(0, 10) : '2020-01-01',
            origen: (this.airportFrom) ? this.airportFrom.code : null,
            destino: (this.airportTo) ? this.airportTo.code : null
        };
        console.log(' ::: >> ', reportEntity);
        this.subscription.add( this.dashboardService.getByEntity( 'emitirReporte', reportEntity).subscribe(
            report => {
                console.log(report.result[0]);
                this.createReportTable(report.result[0]);
                this.hideSpinner();
            }) );
    }

    activateAirport(code) {
        this.showSpinner();
        this.subscription.add( this.dashboardService.updateFlask( 'bajaCiudad', {code: code}).subscribe(
            message => {
                console.log(message);
                this.callAirports();
                this.hideSpinner();
            }) );
    }

    showSpinner() {
        this.dialogRef = this.dialog.open(SpinnerComponent, {
            panelClass: 'dialog-transparent',
            disableClose: true
        });
    }

    hideSpinner() {
        this.dialogRef.close();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
