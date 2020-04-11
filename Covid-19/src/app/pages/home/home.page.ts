import {Component, OnInit} from '@angular/core';
import {DashboardCardItem} from '../../interfaces/dashboard-card-item';
import {LatestDashboardDataService} from "../../providers/latest-dashboard-data.service";
import {LoadingController} from "@ionic/angular";

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    public dashboardCards: DashboardCardItem[];
    public latestData;
    public isLoadingData = true;

    // tslint:disable-next-line:variable-name
    constructor(private _latestDataService: LatestDashboardDataService,
                private loadingCtrl: LoadingController) {
    }

    ngOnInit() {

    }

    ionViewWillEnter() {
        this.loadingCtrl.create({
            message: 'Loading data...'
        }).then(loadEl => loadEl.present())
        this._latestDataService.getLatestData().subscribe(
            data => {
                this.latestData = data;
                console.log(this.latestData);
                this.isLoadingData = false;
                if (!this.isLoadingData) {
                    this.loadingCtrl.dismiss();
                }
            },
            error => {
                console.log(error);
            });

    }

}
