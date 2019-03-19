import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html'
})
export class GraficoDonaComponent implements OnInit {

  @Input() doughnutChartLabels: Label[] ;
  @Input() doughnutChartData: MultiDataSet;
  @Input() doughnutChartType: ChartType;



  constructor() { }

  ngOnInit() {
  }

}
