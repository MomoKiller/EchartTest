/**
 * 图表算法
 */
let calc = {
    /**
     * MA算法
     */
    calculateMA: (dayCount, data) => {
        let result = [];
        for (let i = 0, len = data.values.length; i < len; i++) {
            if (i < dayCount) {
                result.push('-');
                continue;
            }
            let sum = 0;
            for (let j = 0; j < dayCount; j++) {
                sum += data.values[i - j][1];
            }
            result.push(+(sum / dayCount).toFixed(3));
        }
        return result;
    },
    /**
     * 
     */
    gridProportion: (num) => {
        num = parseInt(num);
        return 88 / x - 1;
    }
};