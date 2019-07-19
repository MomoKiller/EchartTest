/**
 * 加载表格
 */
let _myChart = ''; // ECHARTS 实例对象
let _data = []; // 数据对象
let _hasAxisPointer = false; // 点击是否给了坐标
let _loopBox = ''; // 模拟弹框
let _zomStart = 90; // dataZoom-start
let _zomEnd = 100; // dataZoom-end
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
        // com.loginJSON(that.api.login, params, (result) => {
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
     * 鼠标移动回调
     */
    toolCallback: (params) => {
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
            _data = com.splitData(result);
            let domH = _domSelector.clientHeight || _domSelector.offsetHeight;
            let option = {
                backgroundColor: '#eee',
                animation: false,
                tooltip: [{ 
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: { type: 'solid' }
                    },
                    formatter: (params) => that.toolCallback(params),
                    show: false
                }],
                axisPointer: {
                    link: { xAxisIndex: 'all' },
                    label: { backgroundColor: '#777' },
                    show: false
                },
                grid: [{
                    left: 90,
                    right: 20,
                    top: 25,
                    height: domH * 0.5 - 50
                }, {
                    left: 90,
                    right: 20,
                    top: domH * 0.5 + 25,
                    height: domH * 0.25 - 50
                }, {
                    left: 90,
                    right: 20,
                    top: domH * 0.75 + 25,
                    height: domH * 0.25 - 50
                }],
                xAxis: [{
                    type: 'category',
                    gridIndex: 0,
                    data: _data.categoryData,
                    splitLine: { show: true },
                    // axisLine: { show: false },
                    // axisTick: { show: false }
                }, {
                    type: 'category',
                    gridIndex: 1,
                    data: _data.categoryData,
                    splitLine: { show: true },
                    // axisLine: { show: false },
                    // axisTick: { show: false }
                }, {
                    type: 'category',
                    gridIndex: 2,
                    data: _data.categoryData,
                    splitLine: { show: true },
                    // axisLine: { show: false },
                    // axisTick: { show: false }
                }],
                yAxis: [{
                    scale: true,
                    gridIndex: 0,
                    splitLine: { show: true },
                    // axisLine: {
                    //     lineStyle: { color: '#ccc' }
                    // },
                    // axisLabel: { color: '#333' },
                    // axisTick: { show: false }
                }, {
                    scale: true,
                    gridIndex: 1,
                    // splitLine: { show: true },
                    // axisLine: {
                    //     lineStyle: { color: '#ccc' }
                    // },
                    // axisLabel: { color: '#333' },
                    // axisTick: { show: false }
                }, {
                    scale: true,
                    gridIndex: 2,
                    // splitLine: { show: true },
                    // axisLine: {
                    //     lineStyle: { color: '#ccc' }
                    // },
                    // axisLabel: { color: '#333' },
                    // axisTick: { show: false }
                }],
                dataZoom: [{
                    type: 'slider',
                    xAxisIndex: [0, 1, 2],
                    start: _zomStart,
                    end: _zomEnd,
                    show: false
                }, {
                    type: 'inside',
                    xAxisIndex: [0, 1, 2],
                    show: false
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
                            lineStyle: { color: '#ee0000' }
                        }, {
                            name: 'max line on close',
                            type: 'max',
                            valueDim: 'close'
                        }]
                    },
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    data: _data.values
                }, {
                    name: 'MA5',
                    type: 'line',
                    smooth: true,
                    lineStyle: { normal: { opacity: 0.5 } },
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    showSymbol: false,
                    data: calc.calculateMA(5, _data)
                }, {
                    name: 'MA10',
                    type: 'line',
                    smooth: true,
                    lineStyle: { normal: { opacity: 0.5 } },
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

            that.graphicLine(); // graphic组件

            that.switchEvents(); // 切换图表

            that.bindEvents(); // 事件绑定

            that.graphicEvents(); // 增删附图
        }
    },
    /**
     * graphic组件-画线
     */
    graphicLine: () => {
        let domStrLine = document.querySelector('#straightLine'); // 直线
        let domHalLine = document.querySelector('#halfLine'); // 射线
        let domParLine = document.querySelector('#parallelLine'); // 平行线
        let domClearBtn = document.querySelector('#delLine');
        let domMouRBox = document.querySelector('.mousedown-right');
        let isFirstDraw = true; // 是否画第一点
        let data = [];
        let seriesIndex = 0;
        let tempGrid = { gridIndex: 0 }; // 第一象限
        let op = _myChart.getOption();
        let allowDrag = false; // 是否允许拖动
        let offsetData = []; // x轴，y轴偏移量
        let promaryData = []; // series 的深拷贝对象

        // seriesName: 'theLine' 监听
        _myChart.getZr().on('mousedown', (e) => {
            op = _myChart.getOption();
            domMouRBox.style.display = 'none';
            let pointInPixel = [e.offsetX, e.offsetY];
            let xData = _myChart.convertFromPixel('grid', pointInPixel)[0]; // x轴值
            let yData = _myChart.convertFromPixel('grid', pointInPixel)[1]; // y轴值
            if (e.topTarget &&
                e.topTarget.parent &&
                e.topTarget.parent.parent &&
                e.topTarget.parent.parent.__ecComponentInfo &&
                e.topTarget.parent.parent.__ecComponentInfo.index) {
                offsetData = [xData, yData];
                seriesIndex = e.topTarget.parent.parent.__ecComponentInfo.index;
                promaryData = com.deepClone(op.series);
                allowDrag = true;
                delete(op.dataZoom[1].type); // 禁用dataZoom 拖动
                _myChart.setOption(op, true, true);
            }

            if (e.event && e.event.button == '2') { // 右键事件
                domMouRBox.style.top = e.offsetY + 'px';
                domMouRBox.style.left = e.offsetX + 'px';
                domMouRBox.style.display = 'block';
            }
            _xIndex = xData; // _xIndex 重新赋值

            // let pointInPixel = [e.offsetX, e.offsetY];
            // let xData = _myChart.convertFromPixel(tempGrid, pointInPixel)[0]; // x轴值
            // let yData = _myChart.convertFromPixel(tempGrid, pointInPixel)[1]; // y轴值
            if (_isDrawAllow) { // 添加坐标点
                op = _myChart.getOption();
                if (isFirstDraw) {
                    seriesIndex = op.series.length;
                    data = [];
                    data.push([xData, yData]); // graphic遍历的点坐标
                    op.series.push({
                        data: [
                            [xData, yData]
                        ],
                        type: 'line',
                        smooth: false,
                        symbolSize: 10,
                        name: 'theLine' // 用name属性区分是否画线
                    })
                    isFirstDraw = false;
                } else if (seriesIndex) {
                    op.series[seriesIndex].data.push([xData, yData]);
                    data.push([xData, yData]);
                    isFirstDraw = true;
                    _isDrawAllow = false;
                    domStrLine.style.color = '#333333';
                }
                _myChart.setOption(op, true, true);
            }
        });
        _myChart.getZr().on('mousemove', (e) => {
            if (allowDrag) {
                op = _myChart.getOption();
                let pointInPixel = [e.offsetX, e.offsetY];
                if (_myChart.convertFromPixel('grid', pointInPixel)) {
                    let xData = _myChart.convertFromPixel('grid', pointInPixel)[0]; // x轴值
                    let yData = _myChart.convertFromPixel('grid', pointInPixel)[1]; // y轴值
                    op.series[seriesIndex].data.map((item, index) => {
                        op.series[seriesIndex].data[index][0] = xData - offsetData[0] + promaryData[seriesIndex].data[index][0];
                        op.series[seriesIndex].data[index][1] = yData - offsetData[1] + promaryData[seriesIndex].data[index][1];
                    });
                    _myChart.setOption(op, true, true);
                }
            }
        });
        _myChart.getZr().on('mouseup', (e) => {
            if (allowDrag) {
                allowDrag = false;
                op = _myChart.getOption();
                op.dataZoom[1].type = 'inside'; // 放开 dataZoom 拖动
                _myChart.setOption(op, true, true);
            }
        });

        // 禁用鼠标右键默认事件
        document.oncontextmenu = () => { return false; };
        // 监听鼠标滚动事件
        _myChart.getZr().on('mousewheel', (e) => {
            op = _myChart.getOption();
            _zomStart = op.dataZoom[0].start;
            _zomEnd = op.dataZoom[0].end;
        });

        // 控制是否可画线
        domStrLine.onclick = () => {
            if (!_hasAxisPointer) {
                _isDrawAllow = !_isDrawAllow; // 是否让画线
                if (_isDrawAllow) {
                    domStrLine.style.color = '#ee0000';
                    isFirstDraw = true;
                } else {
                    domStrLine.style.color = '#333333';
                }
            }
        };
        // 清除线条
        domClearBtn.onclick = () => {
            if (!_hasAxisPointer) {
                op = _myChart.getOption();
                _isDrawAllow = false;
                domStrLine.style.color = '#333333';
                op.series = op.series.filter((item, index) => {
                    return op.series[index].name != 'theLine';
                })
                _myChart.clear();
                _myChart.setOption(op);
            }
        };
    },
    // 重绘tool-line
    toolLineDraw: (num, isDel) => {
        if (isDel) {
            document.getElementById('grid' + (num + 1)).remove();
        }
        let domGrid = null;
        for (let i = 0; i < num - 1; i++) {
            domGrid = document.getElementById('grid' + (i + 2));
            if (domGrid == null) {
                _domSelector.insertAdjacentHTML('afterend', '<div class="tool-line" id="grid' + (i + 2) + '"></div>');
                domGrid = document.getElementById('grid' + (i + 2));
            }
            domGrid.style.top = 80 - 10 * num + i * (20 + 10 * num) / (num - 1) + '%';
        }
    },
    graphicEvents: () => {
        let that = chartT;
        let domAdd = document.querySelector('#addGraph');
        let domDel = document.querySelector('#delGraph');
        let domMouRBox = document.querySelector('.mousedown-right');
        let op = _myChart.getOption();
        let gridParams = [];
        // 添加附图
        domAdd.addEventListener('click', (e) => {
            if (_attachedNum < 6)
                _attachedNum++;
            else
                return;
            op = _myChart.getOption();
            gridParams = com.getGrid(_domSelector, _attachedNum);
            let tempGrid = [];
            for (let i = 0; i < _attachedNum; i++) {
                tempGrid.push({
                    left: 90,
                    right: 20,
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
                showSymbol: false,
                data: _data.volumns
            });
            op.dataZoom[0].xAxisIndex.push(_attachedNum - 1);
            op.dataZoom[1].xAxisIndex.push(_attachedNum - 1);
            // _myChart.clear();
            that.toolLineDraw(_attachedNum, false);
            _myChart.setOption(op, true, true);
            domMouRBox.style.display = 'none';
        });
        // 删除附图
        domDel.addEventListener('click', (e) => {
            if (_attachedNum > 2)
                _attachedNum--;
            else
                return;
            op = _myChart.getOption();
            gridParams = com.getGrid(_domSelector, _attachedNum);
            let tempGrid = [];
            for (let i = 0; i < _attachedNum; i++) {
                tempGrid.push({
                    left: 90,
                    right: 20,
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
            that.toolLineDraw(_attachedNum, true);
            _myChart.setOption(tempOp, true, true);
            domMouRBox.style.display = 'none';

            that.graphicLine(); // graphic组件
            that.bindEvents(); // 事件绑定
        });
    },
    /**
     * 切换图表 
     */
    switchEvents: () => {
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
            op.dataZoom[0].end = _zomEnd;
            let param = that.getXYArr(_xIndex);
            that.openBox(param);
            _hasAxisPointer = true;
        } else {
            op.yAxis.map((ietm, index) => {
                delete(op.yAxis[index].axisPointer);
            });
            op.xAxis.map((item, index) => {
                delete(op.xAxis[index].axisPointer);
            });
            // _xIndex = 0;
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
     * 模拟弹框
     */
    openBox: (params) => {
        let xLength = _data.categoryData.length;
        let helfLen = Math.floor(xLength * (_zomEnd + _zomStart) / 200);
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
     * 事件绑定
     */
    bindEvents: () => {
        let that = chartT;
        let op = _myChart.getOption();
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
            let maxLenth = Math.floor(dataLenth * (_zomEnd / 100));
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
                        _zomStart--;
                        _zomEnd--;
                        op.dataZoom[0].start = _zomStart;
                        op.dataZoom[0].end = _zomEnd;
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
                    if (_xIndex > maxLenth) {
                        _zomStart++;
                        _zomEnd++;
                        op.dataZoom[0].start = _zomStart;
                        op.dataZoom[0].end = _zomEnd;
                    }
                    _myChart.clear();
                    _myChart.setOption(op, true, true);
                    let paramData = that.getXYArr(_xIndex);
                    that.openBox(paramData);
                }
                return false;
            }
            if (e && e.keyCode == 38 && _hasAxisPointer) { // 键盘-上
                if (_zomStart < 100) {
                    _zomStart += 1;
                }
                minLenth = Math.floor(dataLenth * (_zomStart / 100));
                if (_xIndex < minLenth) { // 重设_xIndex
                    _xIndex = minLenth;
                }
                op.dataZoom[0].start = _zomStart;
                op.dataZoom[0].end = _zomEnd;
                _myChart.setOption(op, true, true);
                return false;
            }
            if (e && e.keyCode == 40 && _hasAxisPointer) { // 键盘-下
                if (_zomStart > 0) {
                    _zomStart -= 1;
                }
                maxLenth = Math.floor(dataLenth * (_zomEnd / 100));
                if (_xIndex > maxLenth) { // 重设_xIndex
                    _xIndex = maxLenth;
                }
                op.dataZoom[0].start = _zomStart;
                op.dataZoom[0].end = _zomEnd;
                _myChart.setOption(op, true, true);
                return false;
            }
        };
        /**
         * 窗口大小改变，重绘Echarts
         */
        window.onresize = () => {
            let op = _myChart.getOption();
            let gridParams = com.getGrid(_domSelector, _attachedNum);
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