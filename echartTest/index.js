// 公用一个option;
var _optionData = {
    date: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    legendData: ['意向', '预购', '成交'],
    seriesData: [
        [10, 12, 21, 54, 260, 830, 710],
        [30, 182, 434, 791, 390, 30, 10],
        [1320, 1132, 601, 234, 120, 90, 20]
    ],
    kSeriesData: [
        [
            [2416.62, 2432.4, 2414.4, 2443.03],
            [2441.91, 2421.56, 2415.43, 2444.8],
            [2420.26, 2382.91, 2373.53, 2427.07],
            [2383.49, 2397.18, 2370.61, 2397.94],
            [2378.82, 2325.95, 2309.17, 2378.82],
            [2322.94, 2314.16, 2308.76, 2330.88],
            [2320.62, 2325.82, 2315.01, 2338.78]
        ],
        [
            [2441.91, 2421.56, 2415.43, 2444.8],
            [2416.62, 2432.4, 2414.4, 2443.03],
            [2378.82, 2325.95, 2309.17, 2378.82],
            [2383.49, 2397.18, 2370.61, 2397.94],
            [2420.26, 2382.91, 2373.53, 2427.07],
            [2322.94, 2314.16, 2308.76, 2330.88],
            [2320.62, 2325.82, 2315.01, 2338.78]
        ],
        [
            [2416.62, 2432.4, 2414.4, 2443.03],
            [2420.26, 2382.91, 2373.53, 2427.07],
            [2441.91, 2421.56, 2415.43, 2444.8],
            [2378.82, 2325.95, 2309.17, 2378.82],
            [2383.49, 2397.18, 2370.61, 2397.94],
            [2320.62, 2325.82, 2315.01, 2338.78],
            [2322.94, 2314.16, 2308.76, 2330.88]
        ]
    ]
}
var _series = [];

var main = {
    init: function() {

        main.formEchart();
    },
    _option: {
        title: {
            text: '某楼盘销售情况',
            subtext: '纯属虚构'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            x: 'right',
            data: _optionData.legendData
        },
        toolbox: {
            show: false,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        calculable: true,
        grid: {
            x: 50
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: _optionData.date
        }],
        yAxis: [{
            type: 'value',
            scale: true
        }],
        series: _series
    },
    formEchartTop: function(domChartTop) {
        // var domChartTop = echarts.init(document.getElementById('top-tabel'));
        _series = [];
        for (var i = 0; i < _optionData.legendData.length; i++) {
            _series.push({
                name: _optionData.legendData[i],
                type: 'line',
                smooth: true,
                itemStyle: { normal: { areaStyle: { type: 'default' } } },
                data: _optionData.seriesData[i]
            });
        }
        main._option.series = _series;
        domChartTop.setOption(main._option);
    },
    formEchartLeft: function(domChartLeft) {
        // var domChartLeft = echarts.init(document.getElementById('left-tabel'));
        _series = [];
        for (var i = 0; i < _optionData.legendData.length; i++) {
            _series.push({
                name: _optionData.legendData[i],
                type: 'bar',
                smooth: true,
                itemStyle: { normal: { areaStyle: { type: 'default' } } },
                data: _optionData.seriesData[i]
            });
        }
        main._option.series = _series;
        domChartLeft.setOption(main._option);
    },
    formEchartRight: function(domChartRight) {
        // var domChartRight = echarts.init(document.getElementById('right-tabel'));
        _series = [];
        for (var i = 0; i < _optionData.legendData.length; i++) {
            _series.push({
                name: _optionData.legendData[i],
                type: 'k',
                smooth: true,
                itemStyle: { normal: { areaStyle: { type: 'default' } } },
                data: _optionData.kSeriesData[i]
            });
        }
        main._option.series = _series;
        main._option.tooltip.formatter = function(params) {
            var res = params[0].name;
            res += '<br/>  意向 : ' + params[0].value[0] + '  预购 : ' + params[0].value[1];
            res += '<br/>  成交 : ' + params[0].value[2]
            return res;
        };
        domChartRight.setOption(main._option);
    },
    formEchart: function() {
        var domChartTop = echarts.init(document.getElementById('top-tabel'));
        var domChartLeft = echarts.init(document.getElementById('left-tabel'));
        var domChartRight = echarts.init(document.getElementById('right-tabel'));
        main.formEchartTop(domChartTop);
        main.formEchartLeft(domChartLeft);
        main.formEchartRight(domChartRight);
        setTimeout(function() {
            echarts.connect([domChartTop, domChartLeft, domChartRight]);
        }, 0)

    }
};

main.init();