let _option = {
    backgroundColor: '#eee',
    animation: false,
    tooltip: [{ 
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        },
        formatter: (params) => {
            var param = [];
            params.map((item, index) => {
                param.push({
                    'name': item.seriesName,
                    'value': item.value,
                    'xData': item.name
                });
            });
            that.openBox(param); // 弹框
        },
        show: false
    }],
    axisPointer: {
        link: { xAxisIndex: 'all' },
        label: {
            backgroundColor: '#777'
        }
    },
    grid: [{
            left: '5%',
            right: '5%',
            top: '5%',
            height: '25%'
        },
        {
            left: '5%',
            right: '5%',
            top: '35%',
            height: '25%'
        },
        {
            left: '5%',
            right: '5%',
            top: '65%',
            height: '25%'
        }
    ],
    xAxis: [{
            type: 'category',
            data: _data.categoryData,
            scale: true,
            boundaryGap: false,
            axisLine: { onZero: false },
            splitLine: { show: false },
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
        },
        {
            type: 'category',
            gridIndex: 1,
            data: _data.categoryData,
            scale: true,
            boundaryGap: false,
            axisLine: { onZero: false },
            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: { show: false },
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
        },
        {
            type: 'category',
            gridIndex: 2,
            data: _data.categoryData,
            scale: true,
            boundaryGap: false,
            axisLine: { onZero: false },
            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: { show: false },
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
        }
    ],
    yAxis: [{
            scale: true
        },
        {
            scale: true,
            gridIndex: 1,
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false }
        },
        {
            scale: true,
            gridIndex: 2,
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false }
        }
    ],
    dataZoom: [{ // 缩放
            type: 'inside',
            xAxisIndex: [0, 1, 2],
            start: _zomStart,
            end: 100,
            zoomOnMouseWheel: false,
            show: true
        },
        {
            show: false,
            xAxisIndex: [0, 1],
            type: 'slider',
            top: '85%',
            start: _zomStart,
            end: 100,
            zoomOnMouseWheel: false
        }
    ],
    series: [{
            name: 'Dow-Jones',
            type: 'candlestick',
            data: _data.values,
            itemStyle: {
                normal: {
                    color: '#06B800',
                    color0: '#FA0000',
                    borderColor: null,
                    borderColor0: null
                }
            },
            xAxisIndex: 0,
            yAxisIndex: 0
        },
        {
            name: 'MA5',
            type: 'line',
            data: calc.calculateMA(5, _data),
            smooth: true,
            lineStyle: {
                normal: { opacity: 0.5 }
            },
            xAxisIndex: 0,
            yAxisIndex: 0
        },
        {
            name: 'MA10',
            type: 'line',
            data: calc.calculateMA(10, _data),
            smooth: true,
            lineStyle: {
                normal: { opacity: 0.5 }
            },
            markLine: {
                symbol: ['none', 'none'],
                lineStyle: {
                    type: 'solid'
                },
                data: [
                    [{
                            itemStyle: {
                                normal: {
                                    show: true,
                                    color: '#4c5336'
                                }
                            },
                            coord: ['2005-06-24', 17000] // 初始值
                        },
                        {
                            coord: ['2014-07-01', 14000] // 结束值
                        }
                    ],
                ]
            },
            xAxisIndex: 0,
            yAxisIndex: 0
        },
        {
            name: 'MA20',
            type: 'line',
            data: that.calculateMA(20, _data),
            smooth: true,
            lineStyle: {
                normal: { opacity: 0.5 }
            },
            xAxisIndex: 0,
            yAxisIndex: 0
        },
        {
            name: 'MA30',
            type: 'line',
            data: that.calculateMA(30, _data),
            smooth: true,
            lineStyle: {
                normal: { opacity: 0.5 }
            },
            xAxisIndex: 0,
            yAxisIndex: 0
        },
        {
            name: 'Volumn',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: _data.volumns
        },
        {
            name: 'Volumn2',
            type: 'line',
            xAxisIndex: 2,
            yAxisIndex: 2,
            data: _data.volumns
        }
    ]
};