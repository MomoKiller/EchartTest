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
     * 计算新grid的高度和top值
     */
    getGrid: (num) => {
        num = parseInt(num);
        let tempJson = [];
        tempJson.push({ 'gridH': 73 - 10 * num, 'gridT': 2 });
        for (let i = 0; i < (num - 1); i++) {
            tempJson.push({ 'gridH': 30 / (num - 1) + 5, 'gridT': (80 - 10 * num + i * (30 / (num - 1) + 10)) });
        }
        return tempJson;
    },
    /**
     * 深拷贝
     */
    deepClone: (obj) => {
        let objClone = Array.isArray(obj) ? [] : {};
        if (obj && typeof obj === "object") {
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (obj[key] && typeof obj[key] === "object") {
                        objClone[key] = calc.deepClone(obj[key]);
                    } else {
                        objClone[key] = obj[key];
                    }
                }
            }
        }
        return objClone;
    }
};