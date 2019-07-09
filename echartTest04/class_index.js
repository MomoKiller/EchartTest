var main = {
    _myChart: '', // ECHARTS 实例对象
    _data: [], // 数据对象
    _hasAxisPointer: false, // 点击是否给了坐标
    _option: {}, // ECHARTS option
    _helfLen: 0, // X轴半长
    _loopBox: '', // 模拟弹框
    _zomEnd: 50, // 缩放最大比例
    _xIndex: 0, // x轴索引
    _yData: 0, // y轴值
    _xDate: 0, // x轴值
    _domSelector: '', // 挂载点选择器
    /**
     * 初始化方法
     * domSelector: 加载Echarts的容器
     */
    init: (domSelector) => {
        var _this = main;
        _this._domSelector = domSelector; // 变量初始化
        _this._loopBox = document.querySelector('#modelBox');
        _this._myChart = echarts.init(document.querySelector(domSelector));
        if (_this._loopBox == null) { // 无 tooltip 弹框容器
            document.querySelector(domSelector).insertAdjacentHTML('afterend', '<div id="modelBox"></div>');
            _this._loopBox = document.querySelector('#modelBox');
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

        _this._data = _this.splitData(rawData); // 获得数据

        _this.formateEchart(); // 渲染Echarts

        // _this.addGraphic(); // graphic组件
        _this.formateLine(); // 线条

        _this.bindEvents(); // 事件绑定

        _this.switchEcharts(); // 切换图表
    },
    /**
     * 线条
     */
    formateLine: () => {
        var _this = main;
        var op = _this._myChart.getOption();

        console.log(op.series[2].markLine.data);
    },
    /**
     * 切换图表
     */
    switchEcharts: () => {
        var _this = main;
        var op = _this._myChart.getOption();
        var serices = op.series;
        console.log(serices);
        var domSwitch = document.querySelector('#switch');
        domSwitch.onclick = (e) => {
            var serIndex = e.target.getAttribute('data-index');
            if (serIndex != null) {
                // op.series[6] = {};
                // op.series[6].data = op.series[serIndex].data;
                // op.series[6].type = op.series[serIndex].type;
                // op.series[6].name = op.series[serIndex].name;
                // _this._myChart.setOption(op);
            }
        }
    },
    /**
     * graphic 组件渲染
     */
    addGraphic: () => {
        var _this = main;
        _this._myChart.setOption({
            graphic: echarts.util.map(_this._data, function(item, dataIndex) {
                return {
                    type: 'circle',
                    position: _this._myChart.convertToPixel('grid', item),
                    shape: {
                        r: 10
                    },
                    invisible: true,
                    draggable: true,
                    ondrag: echarts.util.curry(onPointDragging, dataIndex),
                    onmousemove: echarts.util.curry(showTooltip, dataIndex),
                    onmouseout: echarts.util.curry(hideTooltip, dataIndex),
                    z: 100
                };
            })
        });

        window.addEventListener('resize', function() {
            _this._myChart.setOption({
                graphic: echarts.util.map(_this._data, function(item, dataIndex) {
                    return {
                        position: _this._myChart.convertToPixel('grid', item)
                    };
                })
            });
        });

        function showTooltip(dataIndex) {
            _this._myChart.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: dataIndex
            });
        }

        function hideTooltip(dataIndex) {
            _this._myChart.dispatchAction({
                type: 'hideTip'
            });
        }

        function onPointDragging(dataIndex, dx, dy) {
            _this._data[dataIndex] = _this._myChart.convertFromPixel('grid', this.position);
            _this._myChart.setOption({
                series: [{
                    id: 'a',
                    data: _this._data
                }]
            });
        }
    },
    /**
     * 渲染Echarts
     */
    formateEchart: () => {
        var _this = main;
        _this._option = {
            backgroundColor: '#eee',
            animation: false,
            tooltip: { 
                trigger: 'axis',
                axisPointer: {
                    // type: 'cross',
                    snap: true,
                    show: false
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
                    _this.openBox(param); // 弹框
                },
                show: false
            },
            axisPointer: {
                snap: true,
                link: { xAxisIndex: 'all' },
                label: {
                    backgroundColor: '#777'
                },
                status: 'show',
                show: false,
                value: 'null'
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
                    data: _this._data.categoryData,
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
                    data: _this._data.categoryData,
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
                    data: _this._data.categoryData,
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
                    axisPointer: {
                        label: {
                            backgroundColor: '#777'
                        },
                        show: false,
                        value: null
                    },
                },
                {
                    scale: true,
                    gridIndex: 1,
                    axisLabel: { show: false },
                    axisLine: { show: false },
                    axisTick: { show: false },
                    splitLine: { show: false },
                    axisPointer: {
                        label: {
                            backgroundColor: '#777'
                        },
                        show: false,
                        value: null
                    }
                },
                {
                    scale: true,
                    gridIndex: 2,
                    axisLabel: { show: false },
                    axisLine: { show: false },
                    axisTick: { show: false },
                    axisPointer: {
                        label: {
                            backgroundColor: '#777'
                        },
                        show: false,
                        value: null,
                    }
                }
            ],
            dataZoom: [{ // 缩放
                    type: 'inside',
                    xAxisIndex: [0, 1, 2],
                    start: 0,
                    end: _this._zomEnd,
                    zoomOnMouseWheel: false,
                    show: true
                },
                {
                    show: false,
                    xAxisIndex: [0, 1],
                    type: 'slider',
                    top: '85%',
                    start: 0,
                    end: _this._zomEnd,
                    zoomOnMouseWheel: false
                }
            ],
            series: [{
                    name: 'Dow-Jones',
                    type: 'candlestick',
                    data: _this._data.values,
                    itemStyle: {
                        normal: {
                            color: '#06B800',
                            color0: '#FA0000',
                            borderColor: null,
                            borderColor0: null
                        }
                    }
                },
                {
                    name: 'MA5',
                    type: 'line',
                    data: _this.calculateMA(5, _this._data),
                    smooth: true,
                    lineStyle: {
                        normal: { opacity: 0.5 }
                    }
                },
                {
                    name: 'MA10',
                    type: 'line',
                    data: _this.calculateMA(10, _this._data),
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
                    }
                },
                {
                    name: 'MA20',
                    type: 'line',
                    data: _this.calculateMA(20, _this._data),
                    smooth: true,
                    lineStyle: {
                        normal: { opacity: 0.5 }
                    }
                },
                {
                    name: 'MA30',
                    type: 'line',
                    data: _this.calculateMA(30, _this._data),
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
                    data: _this._data.volumns
                },
                {
                    name: 'Volumn2',
                    type: 'line',
                    xAxisIndex: 2,
                    yAxisIndex: 2,
                    data: _this._data.volumns
                }
            ]
        };
        _this._myChart.setOption(_this._option);
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
        var _this = main;
        _this._helfLen = Math.floor(_this._data.categoryData.length * (_this._zomEnd / 100) / 2);
        if (params && params.length) {
            var _xIndex = _this._data.categoryData.indexOf(params[0].xData);
            var tempHtml = '<ul>';
            params.map((item) => {
                tempHtml += '<li>' + item.name + '-' + item.value + '</li>';
            })
            tempHtml += '</ul>';
            _this._loopBox.innerHTML = tempHtml;
            _this._loopBox.style.display = 'block';
            if (_xIndex < _this._helfLen) {
                _this._loopBox.style.right = 0;
                _this._loopBox.style.left = '';
            } else {
                _this._loopBox.style.left = 0;
                _this._loopBox.style.right = '';
            }
        } else {
            _this._loopBox.style.display = 'none';
        }
    },
    /**
     * 查找X坐标对应数据
     * index: X 轴坐标
     * 返回的数据类型: [{name: null, value: nnull},{}...{}]
     */
    getXYArr: (index) => {
        var _this = main;
        var op = _this._myChart.getOption();
        var xyArr = [];
        for (var i = 0; i < op.series.length; i++) {
            xyArr.push({
                'name': op.series[i].name,
                'value': op.series[i].data[index]
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
        var _this = main;
        var pointInPixel = [params.offsetX, params.offsetY];
        var op = _this._myChart.getOption();
        if (!_this._hasAxisPointer) {
            for (var i = 0; i < 3; i++) {
                if (_this._myChart.containPixel({ gridIndex: i }, pointInPixel)) {
                    var yData = _this._myChart.convertFromPixel({ gridIndex: i }, pointInPixel)[1]; // y轴值
                    _this._option.yAxis[i].axisPointer.value = yData;
                }
                _this._option.yAxis[i].axisPointer.show = true;
            }
            _this._xIndex = _this._myChart.convertFromPixel({ gridIndex: 0 }, pointInPixel)[0];
            var xData = op.xAxis[0].data[_this._xIndex]; // x轴值
            _this._option.axisPointer.show = true; // y轴线显示隐藏
            _this._option.axisPointer.value = xData;

            _this._option.tooltip.show = true; // x轴线显示隐藏
            _this._option.dataZoom[0].end = _this._zomEnd;
            _this._option.dataZoom[1].end = _this._zomEnd;
            var param = _this.getXYArr(_this._xIndex);

            _this.openBox(param);
            _this._hasAxisPointer = true;
        } else {

            _this._option.yAxis.map((ietm, index) => {
                _this._option.yAxis[index].axisPointer.show = false;
                _this._option.yAxis[index].axisPointer.value = null;
            })

            _this._option.axisPointer.show = false;
            _this._option.tooltip.show = false;
            _this.openBox();
            _this._hasAxisPointer = false;
        }
        _this._myChart.setOption(_this._option);
    },
    bindEvents: () => {
        var _this = main;
        /**
         * 双击事件
         * params: echarts 事件返回值
         */
        _this._myChart.getZr().on('dblclick', (params) => {
            _this.getPoint(params);
            return false;
        });
        /**
         * 鼠标滑出 canvas 关闭弹框
         */
        _this._myChart.getZr().on('globalout', () => {
            _this._loopBox.style.display = 'none';
        });
        /**
         *  键盘事件
         */
        document.onkeydown = (event) => {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            var dataLenth = _this._data.categoryData.length;
            var curentLen = _this._data.categoryData.length * (_this._zomEnd / 100);
            var op = _this._myChart.getOption();
            var xData = 0;
            if (e && e.keyCode == 37) { // 键盘-左
                if (_this._xIndex > 0) {
                    _this._xIndex--;
                    xData = op.xAxis[0].data[_this._xIndex];
                    _this._option.axisPointer.value = xData;
                    _this._myChart.clear();
                    _this._myChart.setOption(_this._option);
                    var paramData = _this.getXYArr(_this._xIndex);
                    _this.openBox(paramData);
                }
                return false; // 阻止键盘默认事件
            }
            if (e && e.keyCode == 39) { // 键盘-右
                if (_this._xIndex < (dataLenth - 1)) {
                    _this._xIndex++;
                    xData = op.xAxis[0].data[_this._xIndex];
                    if (_this._xIndex > curentLen) { // 索引大于grid表格x轴长度
                        _this._zomEnd += 10;
                        _this._option.dataZoom[0].end = _this._zomEnd;
                        _this._option.dataZoom[1].end = _this._zomEnd;
                    }
                    _this._option.axisPointer.value = xData;
                    _this._myChart.clear();
                    _this._myChart.setOption(_this._option);
                    var paramData = _this.getXYArr(_this._xIndex);
                    _this.openBox(paramData);
                }
                return false;
            }
            if (e && e.keyCode == 38) { // 键盘-上
                if (_this._zomEnd > 30) {
                    _this._zomEnd -= 10;
                    _this._option.dataZoom[0].end = _this._zomEnd;
                    _this._option.dataZoom[1].end = _this._zomEnd;
                    _this._myChart.setOption(_this._option, false, true);
                }
                return false;
            }
            if (e && e.keyCode == 40) { // 键盘-下
                if (_this._zomEnd <= 90) {
                    _this._zomEnd += 10;
                    _this._option.dataZoom[0].end = _this._zomEnd;
                    _this._option.dataZoom[1].end = _this._zomEnd;
                    _this._myChart.setOption(_this._option, false, true);
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
                if (_this._myChart != '' && _this._myChart != null && _this._myChart != undefined) {
                    _this._myChart.dispose(); // 销毁
                    main.init(_this._domSelector);
                }
                resizeTimer = null;
            }, 100);
        };
    }
};

main.init('#chartTabel');