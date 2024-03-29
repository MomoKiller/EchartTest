var main = {
    _myChart: '', // ECHARTS 实例对象
    _data: [], // 数据对象
    _hasAxisPointer: false, // 点击是否给了坐标
    _loopBox: '', // 模拟弹框
    _zomStart: 50,
    _xIndex: 0, // x轴索引
    _domSelector: '', // 挂载点选择器
    _isDrawAllow: false, // 是否让画点
    /**
     * 初始化方法
     * domSelector: 加载Echarts的容器
     */
    init: (domSelector) => {
        var that = main;
        that._domSelector = domSelector; // 变量初始化
        that._loopBox = document.querySelector('#modelBox');
        that._myChart = echarts.init(document.querySelector(domSelector));
        if (that._loopBox == null) { // 无 tooltip 弹框容器
            document.querySelector(domSelector).insertAdjacentHTML('afterend', '<div id="modelBox"></div>');
            that._loopBox = document.querySelector('#modelBox');
        }
        var rawData = [ // 虚拟数据
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

        that._data = that.splitData(rawData); // 获得数据

        that.formateEchart(); // 渲染Echarts

        that.addGraphic(); // graphic组件

        that.bindEvents(); // 事件绑定

        that.switchEcharts(); // 切换图表
    },
    /**
     * 切换图表
     */
    switchEcharts: () => {
        var that = main;
        var op = that._myChart.getOption();
        var domSwitch = document.querySelector('#switch ul');
        var mapDtata = op.series;
        domSwitch.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-index') != null) {
                var domAll = document.querySelectorAll('#switch ul li p');
                for (var i = 0; i < domAll.length; i++) {
                    domAll[i].style.color = '#333333';
                }
                e.target.style.color = '#ee0000';
                var serIndex = e.target.getAttribute('data-index');
                var paramIndex = parseInt(e.target.parentNode.parentNode.getAttribute('data-li'));
                op.series = op.series.filter((item, index) => { // 筛选
                    return op.series[index].xAxisIndex != paramIndex;
                });
                op.series.push(JSON.parse(JSON.stringify(mapDtata[serIndex])));
                op.series[op.series.length - 1].xAxisIndex = paramIndex;
                op.series[op.series.length - 1].yAxisIndex = paramIndex;

                that._myChart.clear();
                that._myChart.setOption(op);
            }
        });
    },
    /**
     * graphic 组件渲染
     */
    addGraphic: () => {
        var that = main;
        var op = that._myChart.getOption();
        var data = [];
        // var allData = [];
        var isFirstDraw = true; // 是否第一次画点
        var tempGrid = { gridIndex: 0 }; // 第一象限
        var domDrawBtn = document.querySelector('#drawLine');
        var domClearBtn = document.querySelector('#delLine');
        var domRedrawBtn = document.querySelector('#reDraw');
        var onPointDragging = (dataIndex, dx, dy) => {
            var that = main;
            op.series[op.series.length - 1].data[dataIndex] = that._myChart.convertFromPixel(tempGrid, [dx.offsetX, dx.offsetY]);
            that._myChart.setOption(op); // 数据变更
        };
        // 添加坐标点
        that._myChart.getZr().on('click', (params) => {
            if (that._isDrawAllow) { // 是否能画点
                var pointInPixel = [params.offsetX, params.offsetY];
                var xData = that._myChart.convertFromPixel(tempGrid, pointInPixel)[0]; // x轴值
                var yData = that._myChart.convertFromPixel(tempGrid, pointInPixel)[1]; // y轴值
                data = []; // 重置
                data.push([xData, yData]); // graphic遍历的点坐标
                if (isFirstDraw) { // 添加新data对象
                    op.series.push({
                        data: data,
                        type: 'line',
                        smooth: true,
                        symbolSize: 20,
                        name: 'theLine' // 用name属性区分是否画线
                    })
                } else { // 给series 添加新的点
                    op.series[op.series.length - 1].data.push([xData, yData]);
                }
                // allData.push([xData, yData]);
                that._myChart.setOption({
                    series: op.series,
                    graphic: echarts.util.map(data, function(item, dataIndex) {
                        return {
                            type: 'circle',
                            position: that._myChart.convertToPixel('grid', item),
                            shape: {
                                r: 10
                            },
                            invisible: true,
                            draggable: true,
                            ondrag: echarts.util.curry(onPointDragging, dataIndex),
                            z: 100
                        };
                    })
                });

                isFirstDraw = false;
            }
        });
        // 控制是否可画线
        domDrawBtn.onclick = () => {
            that._isDrawAllow = !that._isDrawAllow; // 是否让画线
            if (that._isDrawAllow) {
                domDrawBtn.style.color = '#ee0000';
                isFirstDraw = true;
            } else {
                domDrawBtn.style.color = '#333333';
            }
        };
        // 重新画线
        domRedrawBtn.onclick = () => {
            isFirstDraw = true;
            that._isDrawAllow = true;
            domDrawBtn.style.color = '#333333';
        };
        // 清除线条
        domClearBtn.onclick = () => {
            that._isDrawAllow = false;
            domDrawBtn.style.color = '#333333';
            op.series = op.series.filter((item, index) => {
                return op.series[index].name != 'theLine';
            })
            that._myChart.clear();
            that._myChart.setOption(op);
        };
    },
    /**
     * 渲染Echarts
     */
    formateEchart: () => {
        var that = main;
        option = {
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
                    })
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
                    data: that._data.categoryData,
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
                    data: that._data.categoryData,
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
                    data: that._data.categoryData,
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
                    start: that._zomStart,
                    end: 100,
                    zoomOnMouseWheel: false,
                    show: true
                },
                {
                    show: false,
                    xAxisIndex: [0, 1],
                    type: 'slider',
                    top: '85%',
                    start: that._zomStart,
                    end: 100,
                    zoomOnMouseWheel: false
                }
            ],
            series: [{
                    name: 'Dow-Jones',
                    type: 'candlestick',
                    data: that._data.values,
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
                    data: that.calculateMA(5, that._data),
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
                    data: that.calculateMA(10, that._data),
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
                    data: that.calculateMA(20, that._data),
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
                    data: that.calculateMA(30, that._data),
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
                    data: that._data.volumns
                },
                {
                    name: 'Volumn2',
                    type: 'line',
                    xAxisIndex: 2,
                    yAxisIndex: 2,
                    data: that._data.volumns
                }
            ]
        };
        that._myChart.setOption(option);
    },
    /**
     * 数据拆分
     */
    splitData: (arr) => {
        var categoryData = [];
        var values = [];
        var volumns = [];
        for (var i = 0; i < arr.length; i++) {
            categoryData.push(arr[i].splice(0, 1)[0]);
            values.push(arr[i]);
            volumns.push(arr[i][4]);
        }
        return {
            categoryData: categoryData,
            values: values,
            volumns: volumns,
            volumns2: volumns
        };
    },
    // 计算数据
    calculateMA: (dayCount, data) => {
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
    },
    /**
     * 打开模拟的tooltip弹框
     * params: x轴对应的所有y轴数据
     */
    openBox: (params) => {
        var that = main;
        var xLength = that._data.categoryData.length;
        var helfLen = Math.floor(xLength * (1 + that._zomStart / 100) / 2);
        if (params && params.length) {
            var xIndex = that._data.categoryData.indexOf(params[0].xData);
            that._xIndex = xIndex; //
            var tempHtml = '<ul>';
            params.map((item) => {
                tempHtml += '<li>' + item.name + '-' + item.value + '</li>';
            })
            tempHtml += '</ul>';
            that._loopBox.innerHTML = tempHtml;
            that._loopBox.style.display = 'block';
            if (xIndex < helfLen) {
                that._loopBox.style.right = 0;
                that._loopBox.style.left = '';
            } else {
                that._loopBox.style.left = 0;
                that._loopBox.style.right = '';
            }
        } else {
            that._loopBox.style.display = 'none';
        }
    },
    /**
     * 查找X坐标对应数据
     * index: X 轴坐标
     * 返回的数据类型: [{name: null, value: nnull},{}...{}]
     */
    getXYArr: (index) => {
        var that = main;
        var op = that._myChart.getOption();
        var xyArr = [];
        for (var i = 0; i < op.series.length; i++) {
            xyArr.push({
                'name': op.series[i].name,
                'value': op.series[i].data[index],
                'xData': op.xAxis[0].data[index]
            });
        }
        return xyArr;
    },
    /**
     * socket 链接
     */
    connect: () => {
        var serverUrl = "ws://" + window.location.hostname + ":6502";
        var connection = new WebSocket(serverUrl);
        connection.onopen = (evt) => {};
        connection.onmessage = (evt) => {
            // 从服务端接受到的消息
            var msg = JSON.parse(evt.data);

        }
    },
    /**
     * 获取axiPoint坐标
     */
    getPoint: (params) => {
        var that = main;
        var pointInPixel = [params.offsetX, params.offsetY];
        var op = that._myChart.getOption();
        if (!that._hasAxisPointer) {
            for (var i = 0; i < 3; i++) {
                if (that._myChart.containPixel({ gridIndex: i }, pointInPixel)) {
                    var yData = that._myChart.convertFromPixel({ gridIndex: i }, pointInPixel)[1]; // y轴值
                    op.yAxis[i].axisPointer.value = yData;
                    op.yAxis[i].axisPointer.status = 'show';
                }
                op.yAxis[i].axisPointer.show = true;
            }
            that._xIndex = that._myChart.convertFromPixel({ gridIndex: 0 }, pointInPixel)[0];
            var xData = op.xAxis[0].data[that._xIndex]; // x轴值
            op.xAxis.map((item, index) => {
                op.xAxis[index].axisPointer.show = true;
                op.xAxis[index].axisPointer.value = xData;
                op.xAxis[index].axisPointer.status = 'show';
            });
            op.tooltip[0].show = true; // x轴线显示隐藏
            op.dataZoom[0].start = that._zomStart;
            op.dataZoom[1].start = that._zomStart;
            var param = that.getXYArr(that._xIndex);
            that.openBox(param);
            that._hasAxisPointer = true;
        } else {
            op.yAxis.map((ietm, index) => {
                delete(op.yAxis[index].axisPointer);
            });
            op.xAxis.map((item, index) => {
                delete(op.xAxis[index].axisPointer);
            });
            that._xIndex = 0;
            op.tooltip[0].show = false; // x轴线显示隐藏
            that._hasAxisPointer = false;
            that.openBox(param);
        }
        that._myChart.clear();
        that._myChart.setOption(op);
    },
    bindEvents: () => {
        var that = main;
        var op = that._myChart.getOption();
        /**
         * 双击事件
         * params: echarts 事件返回值
         */
        that._myChart.getZr().on('dblclick', (params) => {
            that.getPoint(params);
            return false;
        });
        /**
         * 鼠标滑出 canvas 关闭弹框
         */
        that._myChart.getZr().on('globalout', () => {
            that._loopBox.style.display = 'none';
        });
        /**
         *  键盘事件
         */
        document.onkeydown = (event) => {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            var dataLenth = that._data.categoryData.length;
            var minLenth = Math.floor(dataLenth * (that._zomStart / 100));
            var op = that._myChart.getOption();
            var xData = 0;
            if (e && e.keyCode == 37) { // 键盘-左
                if (that._xIndex > 0) {
                    that._xIndex--;
                    xData = op.xAxis[0].data[that._xIndex];
                    op.xAxis.map((item, index) => {
                        op.xAxis[index].axisPointer.value = xData;
                    });
                    if (that._xIndex < minLenth) { //&& that._zomStart > 10
                        that._zomStart -= 10;
                        op.dataZoom[0].start = that._zomStart;
                        op.dataZoom[1].start = that._zomStart;
                    }
                    that._myChart.clear();
                    that._myChart.setOption(op);

                    var paramData = that.getXYArr(that._xIndex);
                    that.openBox(paramData);
                }
                return false; // 阻止键盘默认事件
            }
            if (e && e.keyCode == 39) { // 键盘-右
                if (that._xIndex < (dataLenth - 1)) {
                    that._xIndex++;
                    xData = op.xAxis[0].data[that._xIndex];
                    op.xAxis.map((item, index) => {
                        op.xAxis[index].axisPointer.value = xData;
                    });
                    that._myChart.clear();
                    that._myChart.setOption(op);
                    var paramData = that.getXYArr(that._xIndex);
                    that.openBox(paramData);
                }

                return false;
            }
            if (e && e.keyCode == 38) { // 键盘-上
                if (that._zomStart < 100 && that._xIndex != 0) {
                    that._zomStart += 10;
                    op.dataZoom[0].start = that._zomStart;
                    op.dataZoom[1].start = that._zomStart;
                    that._myChart.setOption(op, false, true);
                }

                return false;
            }
            if (e && e.keyCode == 40) { // 键盘-下
                if (that._zomStart > 10 && that._xIndex != 0) {
                    that._zomStart -= 10;
                    op.dataZoom[0].start = that._zomStart;
                    op.dataZoom[1].start = that._zomStart;
                    that._myChart.setOption(op, false, true);
                }
                return false;
            }
        };
        /**
         * 窗口大小改变，重绘Echarts
         * resizeTimer: 重绘timeout
         */
        var resizeTimer = null;
        window.onresize = () => {
            if (resizeTimer) {
                clearTimeout(resizeTimer);
            }
            resizeTimer = setTimeout(() => {
                if (that._myChart != '' && that._myChart != null && that._myChart != undefined) {
                    // var op = that._myChart.getOption();
                    // that._myChart.dispose(); // 销毁
                    // that._myChart = echarts.init(document.querySelector(that._domSelector));
                    // that._myChart.setOption(op);
                    that._myChart.resize();
                }
                resizeTimer = null;
            }, 100);
        };
    }
};

main.init('#chartTabel');