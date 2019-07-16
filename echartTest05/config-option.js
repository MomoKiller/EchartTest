/**
 * Echarts option
 */
let option = {
    backgroundColor: '#eee',
    animation: false,
    tooltip: [{ 
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        },
        formatter: (params) => that.moveCallback(params),
        show: false
    }],
    axisPointer: {
        link: { xAxisIndex: 'all' },
        label: { backgroundColor: '#777' },
        show: false
    },
    grid: [{
        left: '90',
        right: '70',
        top: '2%',
        height: '43%'
    }, {
        left: '90',
        right: '70',
        top: '50%',
        height: '20%'
    }, {
        left: '90',
        right: '70',
        top: '75%',
        height: '20%'
    }, {
        left: '90',
        right: '70',
        top: '100%',
        height: '0%'
    }],
    xAxis: [{
        type: 'category',
        splitLine: { show: true },
        gridIndex: 0,
        data: _data.categoryData
    }, {
        type: 'category',
        splitLine: { show: true },
        gridIndex: 1,
        data: _data.categoryData
    }, {
        type: 'category',
        gridIndex: 2,
        data: _data.categoryData,
        splitLine: { show: true }
    }],
    yAxis: [{
        scale: true,
        gridIndex: 0
    }, {
        scale: true,
        gridIndex: 1
    }, {
        scale: true,
        gridIndex: 2
    }],
    dataZoom: [{
        type: 'inside',
        xAxisIndex: [0, 1, 2],
        start: _zomStart,
        end: 100,
        zoomOnMouseWheel: false,
        show: true
    }, {
        show: false,
        xAxisIndex: [0, 1, 2],
        type: 'slider',
        top: '85%',
        start: _zomStart,
        end: 100,
        zoomOnMouseWheel: false
    }],
    series: [{
        name: 'Dow-Jones',
        type: 'candlestick',
        itemStyle: {
            normal: { // k线图样式
                color: '#06B800',
                color0: '#FA0000',
                borderColor: null,
                borderColor0: null
            }
        },
        markLine: {
            symbol: ['none', 'none'],
            data: [{
                    name: 'min line on close',
                    type: 'min',
                    valueDim: 'close'
                },
                {
                    name: 'max line on close',
                    type: 'max',
                    valueDim: 'close'
                }
            ]
        },
        xAxisIndex: 0,
        yAxisIndex: 0,
        data: _data.values
    }, {
        name: 'MA5',
        type: 'line',
        smooth: true,
        lineStyle: {
            normal: { opacity: 0.5 }
        },
        xAxisIndex: 0,
        yAxisIndex: 0,
        data: calc.calculateMA(5, _data)
    }, {
        name: 'MA10',
        type: 'line',
        smooth: true,
        lineStyle: {
            normal: { opacity: 0.5 }
        },
        xAxisIndex: 0,
        yAxisIndex: 0,
        data: calc.calculateMA(10, _data)
    }, {
        name: 'MA20',
        type: 'line',
        smooth: true,
        lineStyle: {
            normal: { opacity: 0.5 }
        },
        xAxisIndex: 0,
        yAxisIndex: 0,
        data: calc.calculateMA(20, _data)
    }, {
        name: 'MA30',
        type: 'line',
        smooth: true,
        lineStyle: {
            normal: { opacity: 0.5 }
        },
        xAxisIndex: 0,
        yAxisIndex: 0,
        data: calc.calculateMA(30, _data)
    }, {
        name: 'Volumn',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: _data.volumns
    }, {
        name: 'Volumn2',
        type: 'line',
        xAxisIndex: 2,
        yAxisIndex: 2,
        data: _data.volumns
    }]
};