/**
 * 根据key找出对应枚举的值并返回
 * @param {*} key 
 * @param {*} enumLists 
 */
export const matchEnumData = (key, enumLists) => {
    return enumLists.hasOwnProperty(key) ? enumLists[key] : '';
}

/**
 * 遍历对象找出对应的key和value并返回
 * @param {*} dataObject 
 * @param {*} enumLists 
 */
export const matchEnumDataByObject = (dataObject, enumLists) => {
    let data = {};
    let keyArr = Object.keys(enumLists);
    keyArr.forEach(k => {
        data[k] = {
            title: enumLists[k],
            value: dataObject[k] || '-'
        }
    });
    return data;
}

/**
 * 根据时间戳转换成一个日期时间对象
 * @param {*} timeStr 
 */
export const getDateByStr = (timeStr) => {
    const date = new Date(timeStr);
    let data = {};
    data['year'] = date.getFullYear();
    data['month'] = (date.getMonth() + 1 < 10) ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    data['day'] = (date.getDate() < 10) ? `0${date.getDate()}` : date.getDate();
    data['hour'] = (date.getHours() < 10) ? `0${date.getHours()}` : date.getHours();
    data['minute'] = (date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes();
    data['seconds'] = (date.getSeconds() < 10) ? `0${date.getSeconds()}` : date.getSeconds();
    return data;
}

/**
 * 日期格式化 19920314 转为 1992年03月14日
 * @param {*} str 
 */
export const formatDate = (str) => {
    str = String(str);
    return str.substring(0, 4) + '年' + str.substring(4, 6) + '月' + str.substring(6) + '日';
}

/**
 * Px单位转为Rem单位
 * @param {*} Str 
 */
export const PxToRem = (Str) => {
    var reg = /:\s*([\d\.]+)px/gi;
    var regFontSize = /font-size\s*:\s*([\d\.]+)px/gi;
    return Str.replace(regFontSize, function (_x) {
        _x = _x.replace(/font-size\s*:\s*/, '').replace(/px/i, '');
        return 'font-size:' + (parseFloat(_x) + 12) / 75 + 'rem';
    }).replace(reg, function (_x) {
        _x = _x.replace(/(\:|: )/, '').replace(/px/i, '');
        return ':' + parseFloat(_x) / 75 + 'rem';
    });
}

/**
 * 根据出生日期算出年龄
 * @param {*} Str  eg: '2012-12-11'
 */
export const calcAge = (strBirthday) => {       
    var returnAge;
    var strBirthdayArr=strBirthday.split("-");
    var birthYear = strBirthdayArr[0];
    var birthMonth = strBirthdayArr[1];
    var birthDay = strBirthdayArr[2];
    
    var d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();
    
    if(nowYear == birthYear){
        returnAge = 0;//同年 则为0岁
    }
    else{
        var ageDiff = nowYear - birthYear ; //年之差
        if(ageDiff > 0){
            if(nowMonth == birthMonth) {
                var dayDiff = nowDay - birthDay;//日之差
                if(dayDiff < 0)
                {
                    returnAge = ageDiff - 1;
                }
                else
                {
                    returnAge = ageDiff ;
                }
            }
            else
            {
                var monthDiff = nowMonth - birthMonth;//月之差
                if(monthDiff < 0)
                {
                    returnAge = ageDiff - 1;
                }
                else
                {
                    returnAge = ageDiff ;
                }
            }
        }
        else
        {
            returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
        }
    }
    
    return returnAge;//返回周岁年龄
    
  }