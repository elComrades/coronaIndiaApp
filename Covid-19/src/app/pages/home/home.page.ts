import {Component, OnInit} from '@angular/core';

import {DashboardCardItem} from '../../interfaces/dashboard-card-item';
import {AlertController, LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';

import {ApiDataService} from '../../providers/api-data.service';
import {GraphRenderService} from '../../providers/graph-render.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage {
    public dashboardCards: DashboardCardItem[];
    public basicData;
    public apiResponse = {};
    public isLoadingData = true;

    // tslint:disable-next-line:variable-name
    constructor(private _apiDataService: ApiDataService,
                private _graphRenderService: GraphRenderService,
                private loadingCtrl: LoadingController,
                private alertCtrl: AlertController,
                private router: Router) {
    }

    async presentLoading() {
        const loading = await this.loadingCtrl.create({
            message: 'Loading data...',
        });
        return loading.present();
    }

    async ionViewWillEnter() {
        await this.presentLoading();
        this.basicData = this._apiDataService.getBasicDashboardData();
        this.UpdateDashboardCards(this.basicData);
        this.isLoadingData = false;
        const el = document.getElementById('pieChart');
        const pieChartData = [
            {name: 'Total Active Cases', y: this.basicData.TotalCases, sliced: true, selected: true},
            {name: 'Total Cured', y: this.basicData.CuredCases},
            {name: 'Total Deaths', y: this.basicData.TotalDeaths},
        ];
        this._graphRenderService.pieChartBrowser(el, pieChartData, 'Cases 2019-nCoV');
        if (!this.isLoadingData) {
            await this.loadingCtrl.dismiss();
        }
    }


    UpdateDashboardCards(data) {
        this.dashboardCards = [
            {
                category: 'Total Cases',
                value: data.TotalCases,
                icon: 'totalcase.svg',
                color: 'secondary'
            },
            {
                category: 'Active Cases',
                value: data.ActiveCases,
                icon: 'activecase.svg',
                color: 'tertiary'
            },
            {
                category: 'Last 7 days',
                value: data.LastOneWeekCases,
                icon: 'india.svg',
                color: 'success'
            },
            {
                category: 'Total Deaths',
                value: data.TotalDeaths,
                icon: 'nuclear.svg',
                color: 'danger'
            },
            {
                category: 'Fatality Rate',
                value: data.FatalityRate,
                icon: 'globe.svg',
                color: 'warning'
            },
            {
                category: 'Cured/Migrated',
                value: data.CuredCases,
                icon: 'cured.svg',
                color: 'medium'
            },
        ];
    }
}

