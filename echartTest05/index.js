/**
 * 加载表格
 */
let _myChart = ''; // ECHARTS 实例对象
let _data = []; // 数据对象
let _hasAxisPointer = false; // 点击是否给了坐标
let _loopBox = ''; // 模拟弹框
let _zomStart = 50;
let _xIndex = 0; // x轴索引
let _domSelector = ''; // 挂载点选择器
let _isDrawAllow = false; // 是否让画点
let _attachedNum = 3; // 附图数量
let _httpPath = 'http://47.110.91.198:33707/trade/'; // 路径
let chartT = {
    api: {
        login: _httpPath + 'login',
        socket: _httpPath + 'socket.io/get/tonken',
        time: _httpPath + 'trade/price/time/chart/qry',
        candle: _httpPath + 'trade/price/candle/chart/qry'
    },
    init: (domSelector) => {
        let that = chartT;
        _domSelector = document.querySelector(domSelector);
        _myChart = echarts.init(_domSelector);
        that.initLoopBox(); // 初始化弹框

        that.getEchartsData(); // 初始化表格

    },
    /**
     * 获取数据
     */
    getEchartsData: () => {
        let that = chartT;
        // let params = {
        //     j_orgcode: 'lyjr',
        //     j_username: 'test9999',
        //     j_password: 'test1234',
        //     j_cip: '47.75.131.161'
        // };
        // com.postJSON(that.api.login, params, (result) => {
        //     if (result && result.code == '000000') {
        //         that.getTimeData();
        //         that.getCandleData();
        //     }
        // });

        let temp = {
            type: 'GET',
            httpUrl: './data.json',
            data: {}
        }
        com.httpRequest(temp, (result) => {
            that.formateEcharts(JSON.parse(result).reverse());
        }, (error) => {
            console.log(error);
        })
    },
    getTimeData: () => {
        let params = {
            "symbol": "68e2c174-6d95-40f0-86e1-e0f906687b1a",
            "unit": 1,
            "startStamp": 0,
            "endStamp": 0
        };
        com.postJSON(chartT.api.time, params, (result) => {
            if (result && result.code == '000000') {
                console.log(JSON.parse(result.list[0]));
            }
        })
    },
    getCandleData: () => {
        let params = {
            "symbol": "68e2c174-6d95-40f0-86e1-e0f906687b1a",
            "unit": 1,
            "count": 500,
            "endStamp": 0
        };
        com.postJSON(chartT.api.candle, params, (result) => {
            if (result && result.code == '000000') {
                console.log(JSON.parse(result.list[0]));
            }
        })
    },
    /**
     * 初始化弹框
     */
    initLoopBox: () => {
        let that = chartT;
        _loopBox = document.querySelector('#modelBox');
        if (_loopBox == null) { // 无 tooltip 弹框容器
            _domSelector.insertAdjacentHTML('afterend', '<div id="modelBox"></div>');
            _loopBox = document.querySelector('#modelBox');
        }
    },
    /**
     * 模拟弹框
     */
    openBox: (params) => {
        let that = chartT;
        let xLength = _data.categoryData.length;
        let helfLen = Math.floor(xLength * (1 + _zomStart / 100) / 2);
        if (params && params.length) {
            let xIndex = _data.categoryData.indexOf(params[0].xData);
            _xIndex = xIndex; //
            let tempHtml = '<ul>';
            params.map((item) => {
                tempHtml += '<li>' + item.name + '-' + item.value + '</li>';
            })
            tempHtml += '</ul>';
            _loopBox.innerHTML = tempHtml;
            _loopBox.style.display = 'block';
            if (xIndex < helfLen) {
                _loopBox.style.right = 0;
                _loopBox.style.left = '';
            } else {
                _loopBox.style.left = 0;
                _loopBox.style.right = '';
            }
        } else {
            _loopBox.style.display = 'none';
        }
    },
    /**
     * 数据拆分
     */
    splitData: (arr) => {
        let categoryData = [];
        let values = [];
        let volumns = [];
        for (let i = 0; i < arr.length; i++) {
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
    /**
     * 鼠标移动回调
     */
    moveCallback: (params) => {
        let that = chartT;
        let tempArr = [];
        params.map((item, index) => {
            tempArr.push({
                'name': item.seriesName,
                'value': item.value,
                'xData': item.name
            });
        });
        that.openBox(tempArr); // 弹框
    },
    /**
     * 加载Echarts
     */
    formateEcharts: (result) => {
        let that = chartT;
        if (result && result.length) {
            _data = that.splitData(result);
            let domH = _domSelector.clientHeight || _domSelector.offsetHeight;
            let option = {
                backgroundColor: '#eee',
                animation: false,
                tooltip: [{ 
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            type: 'solid'
                        }
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
                    left: 90,
                    right: 70,
                    top: 25,
                    // height: '43%'
                    height: domH * 0.5 - 50
                }, {
                    left: 90,
                    right: 70,
                    // top: '50%',
                    // height: '20%'
                    top: domH * 0.5 + 25,
                    height: domH * 0.25 - 50
                }, {
                    left: 90,
                    right: 70,
                    // top: '75%',
                    // height: '20%'
                    top: domH * 0.75 + 25,
                    height: domH * 0.25 - 50
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
                                valueDim: 'close',
                                lineStyle: {
                                    color: '#ee0000'
                                }
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
                    showSymbol: false,
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
                    showSymbol: false,
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
                    showSymbol: false,
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
                    showSymbol: false,
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
                    showSymbol: false,
                    data: _data.volumns
                }]
            };
            _myChart.setOption(option);

            that.initGraphic(); // graphic组件

            that.initSwitch(); // 切换图表

            that.bindEvents(); // 事件绑定

            that.addDelGraphic(); // 增删附图
        }
    },
    /**
     * graphic组件-画线
     */
    initGraphic: () => {
        let that = chartT;
        let isFirstDraw = true; // 是否第一次画点
        let data = [];
        let tempGrid = { gridIndex: 0 }; // 第一象限
        let domDrawBtn = document.querySelector('#drawLine');
        let domClearBtn = document.querySelector('#delLine');
        let domRedrawBtn = document.querySelector('#reDraw');
        let onPointDragging = (dataIndex, dx, dy) => {
            let op = _myChart.getOption();
            op.series[op.series.length - 1].data[dataIndex] = _myChart.convertFromPixel(tempGrid, [dx.offsetX, dx.offsetY]);
            _myChart.setOption(op); // 数据变更
        };
        // 添加坐标点
        _myChart.getZr().on('click', (params) => {
            let op = _myChart.getOption();
            if (_isDrawAllow) { // 是否能画点
                let pointInPixel = [params.offsetX, params.offsetY];
                let xData = _myChart.convertFromPixel(tempGrid, pointInPixel)[0]; // x轴值
                let yData = _myChart.convertFromPixel(tempGrid, pointInPixel)[1]; // y轴值
                if (isFirstDraw) { // 添加新data对象
                    data = []; // 重置
                    data.push([xData, yData]); // graphic遍历的点坐标
                    op.series.push({
                        data: data,
                        type: 'line',
                        smooth: true,
                        symbolSize: 20,
                        // roam: true,
                        name: 'theLine' // 用name属性区分是否画线
                    })
                } else { // 给series 添加新的点
                    op.series[op.series.length - 1].data.push([xData, yData]);
                }
                _myChart.setOption({
                    series: op.series,
                    graphic: echarts.util.map(data, function(item, dataIndex) {
                        return {
                            type: 'circle',
                            position: _myChart.convertToPixel('grid', item),
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
            if (!_hasAxisPointer) {
                _isDrawAllow = !_isDrawAllow; // 是否让画线
                if (_isDrawAllow) {
                    domDrawBtn.style.color = '#ee0000';
                    isFirstDraw = true;
                } else {
                    domDrawBtn.style.color = '#333333';
                }
            }
        };
        // 重新画线
        domRedrawBtn.onclick = () => {
            if (!_hasAxisPointer) {
                isFirstDraw = true;
                _isDrawAllow = true;
                domDrawBtn.style.color = '#333333';
            }
        };
        // 清除线条
        domClearBtn.onclick = () => {
            if (!_hasAxisPointer) {
                op = _myChart.getOption();
                _isDrawAllow = false;
                domDrawBtn.style.color = '#333333';
                op.series = op.series.filter((item, index) => {
                    return op.series[index].name != 'theLine';
                })
                _myChart.clear();
                _myChart.setOption(op);
            }
        };
    },
    /**
     * 增删主附图
     */
    getGrid: (num) => {
        num = parseInt(num);
        let tempJson = [];
        let domH = _domSelector.clientHeight || _domSelector.offsetHeight;
        tempJson.push({ 'gridH': (0.8 - 0.1 * num) * domH - 50, 'gridT': 25 });
        for (let i = 0; i < (num - 1); i++) {
            tempJson.push({
                'gridH': (0.2 + 0.1 * num) * domH / (num - 1) - 50,
                'gridT': domH * (0.8 - 0.1 * num + i * (0.2 + 0.1 * num) / (num - 1)) + 25
            });
        }
        return tempJson;
    },
    addDelGraphic: () => {
        let that = chartT;
        let domAdd = document.querySelector('#addGraph');
        let domDel = document.querySelector('#delGraph');
        let op = _myChart.getOption();
        let gridParams = [];
        // 添加附图
        domAdd.addEventListener('click', (e) => {
            if (_attachedNum < 6)
                _attachedNum++;
            else
                return;
            op = _myChart.getOption();
            gridParams = that.getGrid(_attachedNum);
            let tempGrid = [];
            for (var i = 0; i < _attachedNum; i++) {
                tempGrid.push({
                    left: '90',
                    right: '70',
                    top: gridParams[i].gridT,
                    height: gridParams[i].gridH
                });
            }
            op.grid = tempGrid;
            op.xAxis.push({
                type: 'category',
                gridIndex: _attachedNum - 1,
                data: _data.categoryData,
                splitLine: { show: true }
            });
            op.yAxis.push({
                scale: true,
                gridIndex: _attachedNum - 1
            });
            op.series.push({
                name: 'Volumn' + _attachedNum,
                type: 'line',
                xAxisIndex: _attachedNum - 1,
                yAxisIndex: _attachedNum - 1,
                data: _data.volumns
            });
            op.dataZoom[0].xAxisIndex.push(_attachedNum - 1);
            op.dataZoom[1].xAxisIndex.push(_attachedNum - 1);
            _myChart.clear();
            _myChart.setOption(op, true, true);
        });
        // 删除附图
        domDel.addEventListener('click', (e) => {
            if (_attachedNum > 2)
                _attachedNum--;
            else
                return;
            op = _myChart.getOption();
            gridParams = that.getGrid(_attachedNum);
            let tempGrid = [];
            for (var i = 0; i < _attachedNum; i++) {
                tempGrid.push({
                    left: '90',
                    right: '2%',
                    top: gridParams[i].gridT,
                    height: gridParams[i].gridH
                });
            }

            op.grid = tempGrid;
            op.xAxis = op.xAxis.filter((item, index) => {
                return op.xAxis[index].gridIndex != _attachedNum;
            });
            op.yAxis = op.yAxis.filter((item, index) => {
                return op.yAxis[index].gridIndex != _attachedNum;
            });
            op.series = op.series.filter((item, index) => {
                return op.series[index].xAxisIndex != _attachedNum;
            });
            op.dataZoom[0].xAxisIndex.pop();
            op.dataZoom[1].xAxisIndex.pop();
            let tempOp = com.deepClone(op);
            _myChart.clear();
            _myChart.dispose();
            _myChart = echarts.init(_domSelector);
            _myChart.setOption(tempOp, true, true);

            that.initGraphic(); // graphic组件
            that.bindEvents(); // 事件绑定

        });
    },
    /**
     * 切换图表 
     */
    initSwitch: () => {
        let domSwitch = document.querySelector('#switch ul');
        domSwitch.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-index') != null) {
                op = _myChart.getOption();
                let mapDtata = op.series;
                let domAll = document.querySelectorAll('#switch ul li p');
                for (let i = 0; i < domAll.length; i++) {
                    domAll[i].style.color = '#333333';
                }
                e.target.style.color = '#ee0000';
                let serIndex = e.target.getAttribute('data-index');
                let paramIndex = parseInt(e.target.parentNode.parentNode.getAttribute('data-li'));
                op.series = op.series.filter((item, index) => { // 筛选
                    return op.series[index].xAxisIndex != paramIndex;
                });
                op.series.push(com.deepClone(mapDtata[serIndex]));
                op.series[op.series.length - 1].xAxisIndex = paramIndex;
                op.series[op.series.length - 1].yAxisIndex = paramIndex;

                _myChart.clear();
                _myChart.setOption(op);
            }
        });
    },
    /**
     * 获取axiPoint坐标
     */
    getPoint: (params) => {
        let that = chartT;
        let pointInPixel = [params.offsetX, params.offsetY];
        let op = _myChart.getOption();
        if (!_hasAxisPointer) {
            for (let i = 0; i < _attachedNum; i++) {
                if (_myChart.containPixel({ gridIndex: i }, pointInPixel)) {
                    let yData = _myChart.convertFromPixel({ gridIndex: i }, pointInPixel)[1]; // y轴值
                    op.yAxis[i].axisPointer.value = yData;
                    op.yAxis[i].axisPointer.status = 'show';
                }
                op.yAxis[i].axisPointer.show = true;
            }
            _xIndex = _myChart.convertFromPixel({ gridIndex: 0 }, pointInPixel)[0];
            let xData = op.xAxis[0].data[_xIndex]; // x轴值
            op.xAxis.map((item, index) => {
                op.xAxis[index].axisPointer.show = true;
                op.xAxis[index].axisPointer.value = xData;
                op.xAxis[index].axisPointer.status = 'show';
            });
            op.tooltip[0].show = true; // x轴线显示隐藏
            op.dataZoom[0].start = _zomStart;
            op.dataZoom[1].start = _zomStart;
            let param = that.getXYArr(_xIndex);
            that.openBox(param);
            _hasAxisPointer = true;
        } else {
            op.yAxis.map((ietm, index) => {
                delete(op.yAxis[index].axisPointer);
                // op.yAxis[index].axisPointer.show = false;
            });
            op.xAxis.map((item, index) => {
                delete(op.xAxis[index].axisPointer);
                // op.xAxis[index].axisPointer.show = false;
            });
            _xIndex = 0;
            op.tooltip[0].show = false; // x轴线显示隐藏
            _hasAxisPointer = false;
            that.openBox();
        }
        _myChart.clear();
        _myChart.setOption(op);
    },
    /**
     * 查找X坐标对应数据
     * index: X 轴坐标
     * 返回的数据类型: [{name: null, value: nnull},{}...{}]
     */
    getXYArr: (index) => {
        let that = chartT;
        let op = _myChart.getOption();
        let xyArr = [];
        for (let i = 0; i < op.series.length; i++) {
            xyArr.push({
                'name': op.series[i].name,
                'value': op.series[i].data[index],
                'xData': op.xAxis[0].data[index]
            });
        }
        return xyArr;
    },
    /**
     * 事件绑定
     */
    bindEvents: () => {
        let that = chartT;
        let op = _myChart.getOption();
        let resizeTimer = null;
        /**
         * 双击事件
         * params: echarts 事件返回值
         */
        _myChart.getZr().on('dblclick', (params) => {
            if (!_isDrawAllow) {
                that.getPoint(params);
            }
            return false;
        });
        /**
         * 鼠标滑出 canvas 关闭弹框
         */
        _myChart.getZr().on('globalout', () => {
            _loopBox.style.display = 'none';
        });
        /**
         *  键盘事件
         */
        document.onkeydown = (event) => {
            let e = event || window.event || arguments.callee.caller.arguments[0];
            let dataLenth = _data.categoryData.length;
            let minLenth = Math.floor(dataLenth * (_zomStart / 100));
            let op = _myChart.getOption();
            let xData = 0;
            if (e && e.keyCode == 37 && _hasAxisPointer) { // 键盘-左
                if (_xIndex > 0) {
                    _xIndex--;
                    xData = op.xAxis[0].data[_xIndex];
                    op.xAxis.map((item, index) => {
                        op.xAxis[index].axisPointer.value = xData;
                    });
                    if (_xIndex < minLenth) {
                        _zomStart -= 10;
                        op.dataZoom[0].start = _zomStart;
                        op.dataZoom[1].start = _zomStart;
                    }
                    _myChart.clear();
                    _myChart.setOption(op, true, true);
                    let paramData = that.getXYArr(_xIndex);
                    that.openBox(paramData);
                }
                return false; // 阻止键盘默认事件
            }
            if (e && e.keyCode == 39 && _hasAxisPointer) { // 键盘-右
                if (_xIndex < (dataLenth - 1)) {
                    _xIndex++;
                    xData = op.xAxis[0].data[_xIndex];
                    op.xAxis.map((item, index) => {
                        op.xAxis[index].axisPointer.value = xData;
                    });
                    _myChart.clear();
                    _myChart.setOption(op, true, true);
                    let paramData = that.getXYArr(_xIndex);
                    that.openBox(paramData);
                }
                return false;
            }
            if (e && e.keyCode == 38 && _hasAxisPointer) { // 键盘-上

                if (_zomStart <= 85) {
                    _zomStart += 5;
                } else if (_zomStart < 95 && _zomStart > 85) {
                    _zomStart += 1;
                }
                minLenth = Math.floor(dataLenth * (_zomStart / 100));
                if (_xIndex < minLenth) { // 重设_xIndex
                    _xIndex = minLenth;
                }
                op.dataZoom[0].start = _zomStart;
                op.dataZoom[1].start = _zomStart;
                _myChart.setOption(op, true, true);
                return false;
            }
            if (e && e.keyCode == 40 && _hasAxisPointer) { // 键盘-下
                if (_zomStart > 90 && _zomStart <= 100) {
                    _zomStart -= 1;
                } else if (_zomStart > 5) {
                    _zomStart -= 5;
                }
                op.dataZoom[0].start = _zomStart;
                op.dataZoom[1].start = _zomStart;
                _myChart.setOption(op, true, true);
                return false;
            }
        };
        /**
         * 窗口大小改变，重绘Echarts
         * resizeTimer: 重绘timeout
         */
        window.onresize = () => {
            let op = _myChart.getOption();
            let gridParams = that.getGrid(_attachedNum);
            op.grid.map((item, index) => {
                op.grid[index].top = gridParams[index].gridT;
                op.grid[index].height = gridParams[index].gridH;
            });
            _myChart.resize();
            _myChart.setOption(op);
        };
    }
};

chartT.init('#chartTabel');