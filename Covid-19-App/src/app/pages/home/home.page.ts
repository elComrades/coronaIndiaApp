import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() {
  }

  dashboardCards = [
    {
      count: 1213456,
      color: 'secondary',
      category: 'Total Cases',
      icon: 'totalcase.svg'
    },
    {
      count: 1213456,
      color: 'primary',
      category: 'Active Cases',
      icon: 'activecase.svg'
    },
    {
      count: 1213456,
      color: 'success',
      category: 'Last 7 days',
      icon: 'india.svg'
    },
    {
      count: 1213456,
      color: 'danger',
      category: 'Total deaths',
      icon: 'nuclear.svg'
    },
    {
      count: 1213456,
      color: 'warning',
      category: 'Fatality Rate',
      icon: 'globe.svg'
    },
    {
      count: 1213456,
      color: 'medium',
      category: 'Cured/Migrated',
      icon: 'cured.svg'
    }
  ];

  ngOnInit() {
  }

}
