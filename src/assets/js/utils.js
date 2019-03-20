import axios from 'axios'

const dateFormat = function (date, fmt) {
    if (fmt === null || fmt === undefined) {
        return
    }
    let _date = new Date(date)
    let o = {
        'M+': _date.getMonth() + 1, // 月份
        'd+': _date.getDate(), // 日
        'h+': _date.getHours(), // 小时
        'm+': _date.getMinutes(), // 分
        's+': _date.getSeconds(), // 秒
        'q+': Math.floor((_date.getMonth() + 3) / 3), // 季度
        'S': _date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (_date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
    }
    return fmt
}

const getType = function (obj) {
    let map = {
        // eslint-disable-next-line
        '[object Boolean]'  : 'boolean', // eslint-disable-next-line
        '[object Number]'   : 'number', // eslint-disable-next-line
        '[object String]'   : 'string', // eslint-disable-next-line
        '[object Function]' : 'function', // eslint-disable-next-line
        '[object Array]'    : 'array', // eslint-disable-next-line
        '[object Date]'     : 'date', // eslint-disable-next-line
        '[object RegExp]'   : 'regExp', // eslint-disable-next-line
        '[object Undefined]': 'undefined', // eslint-disable-next-line
        '[object Null]'     : 'null', // eslint-disable-next-line
        '[object Object]'   : 'object'
    }
    if (obj instanceof Element) {
        return 'element'
    }
    return map[Object.prototype.toString.call(obj)]
}

const deepClone = function (data) {
    let type = getType(data)
    let obj = null
    if (type === 'array') {
        obj = []
    } else if (type === 'object') {
        obj = {}
    } else {
        // 不再具有下一层次
        return data
    }
    if (type === 'array') {
        for (let i = 0, len = data.length; i < len; i++) {
            obj.push(deepClone(data[i]))
        }
    } else if (type === 'object') {
        for (let key in data) {
            obj[key] = deepClone(data[key])
        }
    }
    return obj
}

const $http = function (prompt) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: prompt.url,
            data: prompt.data,
            baseURL: '/apicomm',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }).then(function (response) {
            resolve(response.data)
        }).catch(err => {
            reject(err)
        })
    })
}

export {
    dateFormat,
    deepClone,
    $http
}
