var rawData = [
    ["2004-01-02", 10452.74, 10409.85, 10367.41, 10554.96, 168890000],
    ["2005-05-20", 10492.75, 10471.91, 10400.6, 10535.24, 232250000],
    ["2005-05-23", 10472.8, 10523.56, 10438.36, 10589.92, 225290000],
    ["2005-05-24", 10522.68, 10503.68, 10433.78, 10550.24, 204650000],
    ["2005-05-25", 10503.17, 10457.8, 10396.46, 10516.17, 187990000],
    ["2005-05-26", 10458.68, 10537.6, 10450.55, 10581.87, 194620000],
    ["2005-05-27", 10537.08, 10542.55, 10489.35, 10579.94, 168060000],
    ["2005-05-31", 10541.89, 10467.48, 10437.77, 10574.92, 240780000],
    ["2005-06-01", 10462.86, 10549.87, 10433.48, 10616.15, 230170000],
    ["2005-06-02", 10548.83, 10553.49, 10478.26, 10590.07, 187680000],
    ["2005-06-03", 10552.82, 10460.97, 10427.35, 10572.18, 222230000],
    ["2005-06-06", 10461.64, 10467.03, 10410.28, 10519.79, 170200000],
    ["2005-06-07", 10466, 10483.07, 10454.18, 10603.15, 213990000],
    ["2005-06-08", 10484.84, 10476.86, 10439.77, 10575.81, 195810000],
    ["2005-06-09", 10477.75, 10503.02, 10410.8, 10556.9, 209810000],
    ["2005-06-10", 10503.02, 10512.63, 10410.5, 10581.13, 217100000],
    ["2005-06-13", 10503.57, 10522.56, 10437.32, 10611.1, 205630000],
    ["2005-06-14", 10521.95, 10547.57, 10473.92, 10617.01, 192030000],
    ["2005-06-15", 10548.65, 10566.37, 10471.69, 10628.67, 220840000],
    ["2005-06-16", 10566.76, 10578.65, 10501.92, 10632.2, 217730000],
    ["2005-06-17", 10580.41, 10623.07, 10561, 10710.38, 373400000],
    ["2005-06-20", 10621.54, 10609.1, 10539.21, 10656.66, 173110000],
    ["2005-06-21", 10608.88, 10599.67, 10545.89, 10670.56, 203440000],
    ["2005-06-22", 10599.36, 10587.93, 10543.28, 10676.24, 198810000],
    ["2005-06-23", 10587.09, 10421.44, 10401.49, 10617.39, 288030000],
    ["2005-06-24", 10422.28, 10297.83, 10266.3, 10452.82, 343150000],
    ["2005-06-27", 10298.07, 10290.78, 10229.4, 10377.55, 220510000],
    ["2005-06-28", 10291.01, 10405.63, 10285.86, 10434.18, 215350000],
    ["2005-06-29", 10405.94, 10374.48, 10332.52, 10472.46, 222550000],
    ["2014-07-01", 16828.53, 16956.07, 16828.53, 16998.7, 74050000],
    ["2014-07-02", 16949.71, 16976.24, 16949.71, 16986.63, 57840000],
    ["2014-07-03", 16979, 17068.26, 16979, 17074.65, 66800000],
    ["2014-07-07", 17063.83, 17024.21, 16992.45, 17063.83, 61480000],
    ["2014-07-08", 17022.09, 16906.62, 16874.79, 17022.09, 75250000],
    ["2014-07-09", 16916.83, 16985.61, 16913.81, 16998.95, 67120000]
].reverse();

function splitData(rawData) {
    var categoryData = [];
    var values = [];
    var volumns = [];
    for (var i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0]);
        values.push(rawData[i]);
        volumns.push(rawData[i][4]);
    }
    return {
        categoryData: categoryData,
        values: values,
        volumns: volumns,
        volumns2: volumns
    };
}

function calculateMA(dayCount, data) {
    var result = [];
    for (var i = 0, len = data.values.length; i < len; i++) {
        if (i < dayCount) {
            result.push('-');
            continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
            sum += data.values[i - j][1];
        }
        result.push(+(sum / dayCount).toFixed(3));
    }
    return result;
}

var data = splitData(rawData);
console.log(data);
var option = {
    backgroundColor: '#eee',
    animation: false,
    legend: {
        top: '2%',
        left: '10%',
        data: ['Dow-Jones index', 'MA5', 'MA10', 'MA20', 'MA30', 'Volumn', 'Volumn2']
    },
    toolbox: {
        feature: {
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true }
        },
        top: '1%',
        right: '4%'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        },
        backgroundColor: 'rgba(245, 245, 245, 0.8)',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        textStyle: {
            color: '#000'
        },
        triggerOn: 'none',
        extraCssText: 'width: 170px'
    },
    axisPointer: {
        link: { xAxisIndex: 'all' },
        label: {
            backgroundColor: '#777'
        }
    },
    grid: [{
            left: '10%',
            right: '8%',
            height: '25%'
        },
        {
            left: '10%',
            right: '8%',
            top: '37%',
            height: '25%'
        },
        {
            left: '10%',
            right: '8%',
            top: '67%',
            height: '25%'
        }
    ],
    xAxis: [{
            type: 'category',
            data: data.categoryData,
            scale: true,
            boundaryGap: false,
            axisLine: { onZero: false },
            splitLine: { show: false },
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax',
            axisPointer: {
                z: 100
            }
        },
        {
            type: 'category',
            gridIndex: 1,
            data: data.categoryData,
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
            data: data.categoryData,
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
            scale: true,
            // splitArea: { show: true }
        },
        {
            scale: true,
            gridIndex: 1,
            // splitNumber: 1,
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false }
        },
        {
            scale: true,
            gridIndex: 2,
            // splitNumber: 1,
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false }
        }
    ],
    dataZoom: [{
            type: 'inside',
            xAxisIndex: [0, 1, 2],
            start: 0,
            end: 100,
            zoomOnMouseWheel: false,
            show: true
        },
        {
            show: false,
            xAxisIndex: [0, 1],
            type: 'slider',
            top: '85%',
            start: 0,
            end: 100,
            zoomOnMouseWheel: false
        }
    ],
    series: [{
            name: 'Dow-Jones index',
            type: 'candlestick',
            data: data.values,
            itemStyle: {
                normal: {
                    color: '#06B800',
                    color0: '#FA0000',
                    borderColor: null,
                    borderColor0: null
                }
            },
            // tooltip: {
            //     formatter: function(param) {
            //         param = param[0];
            //         return [
            //             'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
            //             'Open: ' + param.data[0] + '<br/>',
            //             'Close: ' + param.data[1] + '<br/>',
            //             'Lowest: ' + param.data[2] + '<br/>',
            //             'Highest: ' + param.data[3] + '<br/>'
            //         ].join('');
            //     }
            // }
        },
        {
            name: 'MA5',
            type: 'line',
            data: calculateMA(5, data),
            smooth: true,
            lineStyle: {
                normal: { opacity: 0.5 }
            }
        },
        {
            name: 'MA10',
            type: 'line',
            data: calculateMA(10, data),
            smooth: true,
            lineStyle: {
                normal: { opacity: 0.5 }
            }
        },
        {
            name: 'MA20',
            type: 'line',
            data: calculateMA(20, data),
            smooth: true,
            lineStyle: {
                normal: { opacity: 0.5 }
            }
        },
        {
            name: 'MA30',
            type: 'line',
            data: calculateMA(30, data),
            smooth: true,
            lineStyle: {
                normal: { opacity: 0.5 }
            }
        },
        {
            name: 'Volumn',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: data.volumns
        },
        {
            name: 'Volumn2',
            type: 'line',
            xAxisIndex: 2,
            yAxisIndex: 2,
            data: data.volumns
        }
    ]
};

var myChart = echarts.init(document.getElementById('chartTabel'));
myChart.setOption(option);


// 鼠标双击-基于EchartsAPI
var _selDate;
var _dateIndex;
var _yIndex;
var _hasAxisPointer = false;
var _seriesName;

myChart.on('dblclick', function(params) {
    if (params.seriesName === "Volumn") {
        _yIndex = 1;
    } else if (params.seriesName === "Volumn2") {
        _yIndex = 2;
    } else {
        _yIndex = 0;
    }
    _dateIndex = data.categoryData.indexOf(params.name);
    if (!_hasAxisPointer) {
        var axisPointer = {
            z: 100,
            value: data.categoryData[_dateIndex],
            handle: {
                show: true,
                color: '#004E52'
            },
            show: true
        };
        var yxisPointer = {
            z: 100,
            value: params.value,
            handle: {
                show: true,
                color: '#004E52'
            },
            show: true
        };
        option.xAxis[0].axisPointer = axisPointer;
        option.xAxis[1].axisPointer = axisPointer;
        option.xAxis[2].axisPointer = axisPointer;
        option.yAxis[_yIndex].axisPointer = yxisPointer;
        option.dataZoom[0].end = _zomEnd;
        _hasAxisPointer = true;
        myChart.setOption(option);
        var dataPara = getPintData(_dateIndex);
        openBox(dataPara);
    } else {
        var axisPointer = {
            value: null,
            show: false
        };
        var yxisPointer = {
            z: 100,
            value: null,
            show: false
        };

        option.xAxis[0].axisPointer = axisPointer;
        option.xAxis[1].axisPointer = axisPointer;
        option.xAxis[2].axisPointer = axisPointer;
        option.yAxis[_yIndex].axisPointer = yxisPointer;
        option.dataZoom[0].end = _zomEnd;
        _hasAxisPointer = false;
        myChart.setOption(option);
        openBox('');
    }
    return false;
});

// 添加键盘监听事件
var _zomEnd = 100;
document.onkeydown = function(event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    var axisPointer;
    // 左 _selDate
    if (e && e.keyCode == 37) {
        if (_dateIndex > 0) {
            _dateIndex--;
            axisPointer = {
                z: 100,
                value: data.categoryData[_dateIndex],
                handle: {
                    show: true,
                    color: '#004E52'
                }
            };
            option.xAxis[0].axisPointer = axisPointer;
            option.xAxis[1].axisPointer = axisPointer;
            option.xAxis[2].axisPointer = axisPointer;
            myChart.setOption(option);
            var paramData = getPintData(_dateIndex);
            openBox(paramData);
        }
        return false;
    }
    // 右
    if (e && e.keyCode == 39) {
        if (_dateIndex < (data.categoryData.length - 1)) {
            _dateIndex++;
            axisPointer = {
                z: 100,
                value: data.categoryData[_dateIndex],
                handle: {
                    show: true,
                    color: '#004E52'
                }
            };
            option.xAxis[0].axisPointer = axisPointer;
            option.xAxis[1].axisPointer = axisPointer;
            option.xAxis[2].axisPointer = axisPointer;
            myChart.setOption(option);
            var paramData = getPintData(_dateIndex);
            openBox(paramData);
        }
        return false;
    }
    // 上
    if (e && e.keyCode == 38) {

        if (_zomEnd > 30) {
            _zomEnd -= 10;
            option.dataZoom[0].end = _zomEnd;
            option.dataZoom[1].end = _zomEnd;
            myChart.setOption(option);
        }
        return false;
    }
    // 下
    if (e && e.keyCode == 40) {
        if (_zomEnd <= 90) {
            _zomEnd += 10;
            option.dataZoom[0].end = _zomEnd;
            option.dataZoom[1].end = _zomEnd;
            myChart.setOption(option);
        }
        return false;
    }
}

// 弹框
var _domBox = document.getElementById('modelBox');
var _helfLen = Math.floor(data.categoryData.length / 2);

function openBox(params) {
    if (params && params.length) {
        _domBox.style.display = 'block';
        var tempHtml = '<ul>';
        params.map(function(item) {
            tempHtml += '<li>' + item.name + '-' + item.value + '</li>';
        })
        tempHtml += '</ul>';
        _domBox.innerHTML = tempHtml;
        _domBox.style.display = 'block';

        if (_dateIndex > _helfLen) {
            _domBox.style.right = 0;
            _domBox.style.left = '';
        } else {
            _domBox.style.left = 0;
            _domBox.style.right = '';
        }
    } else {
        _domBox.style.display = 'none';
    }
}
// 获取数据
function getPintData(_dateIndex) {
    var op = myChart.getOption();
    var paramArray = [];
    for (var i = 0; i < op.series.length; i++) {
        paramArray.push({
            'name': op.series[i].name,
            'value': op.series[i].data[_dateIndex]
        });
    }
    return paramArray;
}

// 跳出canvas
myChart.getZr().on('globalout', function() {
    _domBox.style.display = 'none';
});