import {Injectable} from '@angular/core';

import {LatestDashboardDataService} from './latest-dashboard-data.service';

import {forkJoin} from 'rxjs';
import {DashboardCardItem} from '../interfaces/dashboard-card-item';

@Injectable({
    providedIn: 'root'
})
export class ApiDataService {
    public dashboardCards: DashboardCardItem[];
    public apiResponse = {
        latest: null,
        historical: null
    };

    public basicData = {};

    // tslint:disable-next-line:variable-name
    constructor(private _latestDataService: LatestDashboardDataService) {
        forkJoin([this._latestDataService.getLatestData(), this._latestDataService.getHistoricalData()])
            .subscribe(([latestApiResponse, historicApiResponse]) => {

                this.apiResponse.latest = latestApiResponse;
                this.apiResponse.historical = historicApiResponse;

                const response = this.apiResponse;
                const latestSummary = response.latest.data.summary;
                const historicData = response.historical.data;
                const historicDataSize = historicData.length;

                this.basicData = {
                    TotalCases: latestSummary.total,
                    ActiveCases: parseInt(latestSummary.confirmedCasesIndian) + parseInt(latestSummary.confirmedCasesForeign) - parseInt(latestSummary.discharged) - parseInt(latestSummary.deaths),
                    TotalDeaths: latestSummary.deaths,
                    CuredCases: latestSummary.discharged,
                    FatalityRate: ((latestSummary.deaths / latestSummary.total) * 100).toFixed(2) + ' %',
                    LastOneWeekCases: historicData[historicDataSize - 1].summary.total - historicData[historicDataSize - 8].summary.total
                };
            });
    }

    async getApiResponse() {
        return this.apiResponse;
    }

    getBasicDashboardData() {
        return this.basicData;
    }

}
