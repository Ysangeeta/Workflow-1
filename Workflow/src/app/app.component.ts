import { analyzeAndValidateNgModules, LocalizedString } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import infoData from '../assets/info.json';
import { INFO } from './info.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'workflow';
  workinfo: INFO[] = [];
  usersInfo: INFO[] = [];
  userName: string[] = [];
  commits: number | undefined;
  pass: number | undefined;
  fail: number | undefined;
  rate: number | undefined;
  avg: number | undefined;
  retrievedata: string[] = [];
  j: any;
  datearr: number[] = [];

  ngOnInit(): void {
    this.workinfo = infoData;
    this.workinfo.map(item => {
      if (!this.userName.includes(item.user))
        this.userName.push(item.user);
    })
  }
  showData(e: any, j: any) {
    const userName = e.target.value;
    this.usersInfo = this.workinfo.filter(item => item.user === userName);
    let totalCommits: number = this.usersInfo.length;
    this.commits = totalCommits;
    let totalPass: number = this.usersInfo.filter(item => item.status === 'success')?.length;
    this.pass = totalPass;
    let totalFail: number = this.usersInfo.filter(item => item.status === 'failed')?.length;
    this.fail = totalFail;
    let passRate: number = (totalPass * 100) / totalCommits;
    this.rate = passRate;

    if (this.usersInfo) {
      this.usersInfo.forEach(item => {
        let startTime = new Date(item.start).getTime();
        let endTime = new Date(item.end).getTime();
        let avgTime = (startTime + endTime) / 2;
        this.datearr.push(avgTime);

      })
    }
    const sum = this.datearr.reduce((a: any, b: any) => a + b, 0);
    const avgT = (sum / this.datearr.length) || 0;
    const str_a = avgT.toString();
    const avg = Number(str_a.slice(0, 2));
    this.avg = avg;
    console.log("Final avg", avg);
  }
}


