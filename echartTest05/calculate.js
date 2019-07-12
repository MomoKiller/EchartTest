/**
 * 算法
 */
// 'use strict';
class Calculate {
    constructor() {}; // 默认构造器
    /**
     * MA算法
     * @param {*} dayCount 
     * @param {*} data 
     */
    calculateMA(dayCount, data) {
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
    };
}

export { Calculate }