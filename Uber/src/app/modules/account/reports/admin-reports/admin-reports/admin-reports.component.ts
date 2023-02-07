import { Component, Input, OnInit } from '@angular/core';
import { AllReports, Report } from 'src/app/domains';
import { ReportService } from '../../../service/report.service';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.css']
})
export class AdminReportsComponent implements OnInit{
  @Input()report1: Report[] = [];
    @Input()report2: Report[] = [];
    @Input()report3: Report[] = [];
    @Input()report4: Report[] = [];

    constructor(private reportService: ReportService) { }

    ngOnInit(): void {
        this.reportService.getCrossedKmsReportDrivers().subscribe((res: AllReports) => {
            this.report1 = res.results;
        })
  
        this.reportService.getCrossedKmsReportPassengers().subscribe((res: AllReports) => {
          this.report2 = res.results;
        })
  
        this.reportService.getSumOfMoneyReportPassengers().subscribe((res: AllReports) => {
          this.report3 = res.results;
        })
        this.reportService.getSumOfMoneyReportDrivers().subscribe((res: AllReports) => {
          this.report4 = res.results;
        })
      }
  }
