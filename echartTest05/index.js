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

let chartT = {
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
        let params = {
            httpUrl: './data.json',
            type: 'get',
            data: {}
        };
        com.httpRequest(params, (result) => {
            // console.log(result)
            that.formateEcharts(result);
        }, () => {
            console.log('httpRequest faild');
        });
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
     * 加载Echarts
     */
    formateEcharts: (result) => {
        let that = chartT;
        if (result && result.length) {
            _data = that.splitData(JSON.parse(result).reverse());
            let option = {
                backgroundColor: '#eee',
                animation: false,
                tooltip: [{ 
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    },
                    formatter: (params) => {
                        let param = [];
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
                        data: calc.calculateMA(20, _data),
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
                        data: calc.calculateMA(30, _data),
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
            _myChart.setOption(option);

            that.initGraphic(); // graphic组件

            that.initSwitch(); // 切换图表

            that.bindEvents(); // 事件绑定
        }
    },
    /**
     * graphic组件
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
            _isDrawAllow = !_isDrawAllow; // 是否让画线
            if (_isDrawAllow) {
                domDrawBtn.style.color = '#ee0000';
                isFirstDraw = true;
            } else {
                domDrawBtn.style.color = '#333333';
            }
        };
        // 重新画线
        domRedrawBtn.onclick = () => {
            isFirstDraw = true;
            _isDrawAllow = true;
            domDrawBtn.style.color = '#333333';
        };
        // 清除线条
        domClearBtn.onclick = () => {
            op = _myChart.getOption();
            _isDrawAllow = false;
            domDrawBtn.style.color = '#333333';
            op.series = op.series.filter((item, index) => {
                return op.series[index].name != 'theLine';
            })
            _myChart.clear();
            _myChart.setOption(op);
        };
    },
    /**
     * 切换图表 
     */
    initSwitch: () => {
        let domSwitch = document.querySelector('#switch ul');
        let op = _myChart.getOption();
        let mapDtata = op.series;
        domSwitch.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-index') != null) {
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
                op.series.push(JSON.parse(JSON.stringify(mapDtata[serIndex])));
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
            for (let i = 0; i < 3; i++) {
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
            });
            op.xAxis.map((item, index) => {
                delete(op.xAxis[index].axisPointer);
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
        /**
         * 双击事件
         * params: echarts 事件返回值
         */
        _myChart.getZr().on('dblclick', (params) => {
            that.getPoint(params);
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
            if (e && e.keyCode == 37) { // 键盘-左
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
                    _myChart.setOption(op);

                    let paramData = that.getXYArr(_xIndex);
                    that.openBox(paramData);
                }
                return false; // 阻止键盘默认事件
            }
            if (e && e.keyCode == 39) { // 键盘-右
                if (_xIndex < (dataLenth - 1)) {
                    _xIndex++;
                    xData = op.xAxis[0].data[_xIndex];
                    op.xAxis.map((item, index) => {
                        op.xAxis[index].axisPointer.value = xData;
                    });
                    _myChart.clear();
                    _myChart.setOption(op);
                    let paramData = that.getXYArr(_xIndex);
                    that.openBox(paramData);
                }

                return false;
            }
            if (e && e.keyCode == 38) { // 键盘-上
                if (_zomStart < 100 && _xIndex != 0) {
                    _zomStart += 10;
                    op.dataZoom[0].start = _zomStart;
                    op.dataZoom[1].start = _zomStart;
                    _myChart.setOption(op, false, true);
                }

                return false;
            }
            if (e && e.keyCode == 40) { // 键盘-下
                if (_zomStart > 10 && _xIndex != 0) {
                    _zomStart -= 10;
                    op.dataZoom[0].start = _zomStart;
                    op.dataZoom[1].start = _zomStart;
                    _myChart.setOption(op, false, true);
                }
                return false;
            }
        };
        /**
         * 窗口大小改变，重绘Echarts
         * resizeTimer: 重绘timeout
         */
        let resizeTimer = null;
        window.onresize = () => {
            if (resizeTimer) {
                clearTimeout(resizeTimer);
            }
            resizeTimer = setTimeout(() => {
                if (_myChart != '' && _myChart != null && _myChart != undefined) {
                    _myChart.resize();
                }
                resizeTimer = null;
            }, 100);
        };
    }
};

chartT.init('#chartTabel');