/**
 * 图表配置项
 */

let chartConfig = {

};

/**
 * 直线
 */
let straightLineFn = () => {};
/**
 * 射线
 */
let halfLineFn = () => {};
/**
 * 平行线
 */
let parallelLineFn = () => {};
/**
 * 画线类型
 */
let lineType = {
    straightLine: straightLineFn,
    halfLine: halfLineFn,
    parallelLine: parallelLineFn
};


_myChart.getZr().on('click', (params) => {
    op = _myChart.getOption();
    let pointInPixel = [params.offsetX, params.offsetY];
    let xData = _myChart.convertFromPixel('grid', pointInPixel)[0]; // x轴值
    let yData = _myChart.convertFromPixel('grid', pointInPixel)[1]; // y轴值



    // op.series[seriesIndex].data.push([xData, yData]);
});


// 设置三个状态
let isDown = false;
let isMove = false;
let isUp = false;
let straightLine = true;

let lineType = 'straightLine'; // 画线类型
_myChart.getZr().on('mousedown', (params) => {
    if (straightLine) { //直线
        op = _myChart.getOption();
        let pointInPixel = [params.offsetX, params.offsetY];
        let xData = _myChart.convertFromPixel(tempGrid, pointInPixel)[0]; // x轴值
        let yData = _myChart.convertFromPixel(tempGrid, pointInPixel)[1]; // y轴值
        isDown = true;
        seriesIndex = op.series.length;
        op.series.push({
            data: [
                [xData, yData],
                [xData, yData]
            ],
            type: 'line',
            smooth: false,
            symbolSize: 10,
            name: 'theLine'
        });
        _myChart.setOption(op, true, true); // 添加两点
    }
    if (halfLineFn) { // 射线

    }
    if (parallelLineFn) { // 平行线

    }
});
_myChart.getZr().on('mousemove', (params) => {
    if (straightLine && isDown) { // 直线
        op = _myChart.getOption();
        let pointInPixel = [params.offsetX, params.offsetY];
        let xData = _myChart.convertFromPixel(tempGrid, pointInPixel)[0]; // x轴值
        let yData = _myChart.convertFromPixel(tempGrid, pointInPixel)[1]; // y轴值
        isMove = true;
        op.series[seriesIndex].data[1] = [xData, yData]; // 重绘第二点
        _myChart.clear();
        _myChart.setOption(op, true, true);
    }
});
_myChart.getZr().on('mouseup', (params) => {
    if (straightLine) {
        isUp = true;
        op = _myChart.getOption();
        if (!isMove && isUp) { // 未拖动--清除刚加的数据
            op.series[seriesIndex].data.pop(); // 删除第二点
            _myChart.setOption(op);
        } else { // 已拖动-重置所有状态
            isDown = false;
            isMove = false;
            isUp = false;
        }
    }
});


// graph 线
graphEvents: () => {



}

// markline 线