import {Injectable} from '@angular/core';

import * as HighCharts from 'highcharts';

@Injectable({
    providedIn: 'root'
})
export class GraphRenderService {

    constructor() {
    }

    pieChartBrowser(el, dataArr, chartTitle) {
        HighCharts.setOptions({
            colors: HighCharts.map(HighCharts.getOptions().colors, function (color) {
                return {
                    radialGradient: {
                        cx: 0.5,
                        cy: 0.3,
                        r: 0.7
                    },
                    stops: [
                        [0, color],
                        [1, HighCharts.color(color).brighten(-0.3).get('rgb')] // darken
                    ]
                };
            })
        });

        HighCharts.chart(el, {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: chartTitle
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',

                }
            },
            series: [{
                name: 'Total',
                colorByPoint: true,
                type: undefined,
                data: [...dataArr]
            }]
        });
    }

}


// {
//     name: 'Chrome',
//         y: 61.41,
//     sliced: true,
//     selected: true
// }, {
//     name: 'Internet Explorer',
//         y: 11.84
// }, {
//     name: 'Firefox',
//         y: 10.85
// }, {
//     name: 'Edge',
//         y: 4.67
// }, {
//     name: 'Safari',
//         y: 4.18
// }, {
//     name: 'Sogou Explorer',
//         y: 1.64
// }, {
//     name: 'Opera',
//         y: 1.6
// }, {
//     name: 'QQ',
//         y: 1.2
// }, {
//     name: 'Other',
//         y: 2.61
// }
