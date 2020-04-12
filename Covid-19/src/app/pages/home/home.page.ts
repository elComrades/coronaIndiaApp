import {Component, OnInit} from '@angular/core';
import {DashboardCardItem} from '../../interfaces/dashboard-card-item';
import {LatestDashboardDataService} from '../../providers/latest-dashboard-data.service';
import {AlertController, LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';

import {forkJoin} from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage {
    public dashboardCards: DashboardCardItem[];
    public extractedData;
    public apiResponse = {
        latest: null,
        historical: null
    };
    public isLoadingData = true;

    // tslint:disable-next-line:variable-name
    constructor(private _latestDataService: LatestDashboardDataService,
                private loadingCtrl: LoadingController,
                private alertCtrl: AlertController,
                private router: Router) {
    }

    ionViewWillEnter() {

        this.loadingCtrl.create({
            message: 'Loading data...'
        }).then(loadEl => loadEl.present());

        forkJoin([this._latestDataService.getLatestData(), this._latestDataService.getHistoricalData()])
            .subscribe(([latestApiResponse, historicApiResponse]) => {

                this.apiResponse.latest = latestApiResponse;
                this.apiResponse.historical = historicApiResponse;

                this.SetDashboardData();
                this.UpdateDashboardCards();
                this.isLoadingData = false;
                if (!this.isLoadingData) {
                    this.loadingCtrl.dismiss();
                }
            });
    }

    SetDashboardData() {
        const response = this.apiResponse;
        const latestSummary = response.latest.data.summary;
        const historicData = response.historical.data;
        const historicDataSize = historicData.length;

        // tslint:disable-next-line:max-line-length

        // @ts-ignore
        this.extractedData = {
            TotalCases: latestSummary.total,
            ActiveCases: parseInt(latestSummary.confirmedCasesIndian) + parseInt(latestSummary.confirmedCasesForeign) - parseInt(latestSummary.discharged) - parseInt(latestSummary.deaths),
            TotalDeaths: latestSummary.deaths,
            CuredCases: latestSummary.discharged,
            FatalityRate: ((latestSummary.deaths / latestSummary.total) * 100).toFixed(2) +' %',
            LastOneWeekCases: historicData[historicDataSize - 1].summary.total - historicData[historicDataSize - 8].summary.total
        };
    }

    UpdateDashboardCards() {
        this.dashboardCards = [
            {
                category: 'Total Cases',
                value: this.extractedData.TotalCases,
                icon: 'totalcase.svg',
                color: 'secondary'
            },
            {
                category: 'Active Cases',
                value: this.extractedData.ActiveCases,
                icon: 'activecase.svg',
                color: 'tertiary'
            },
            {
                category: 'Last 7 days',
                value: this.extractedData.LastOneWeekCases,
                icon: 'india.svg',
                color: 'success'
            },
            {
                category: 'Total Deaths',
                value: this.extractedData.TotalDeaths,
                icon: 'nuclear.svg',
                color: 'danger'
            },
            {
                category: 'Fatality Rate',
                value: this.extractedData.FatalityRate,
                icon: 'globe.svg',
                color: 'warning'
            },
            {
                category: 'Cured/Migrated',
                value: this.extractedData.CuredCases,
                icon: 'cured.svg',
                color: 'medium'
            },
        ];
    }
}

