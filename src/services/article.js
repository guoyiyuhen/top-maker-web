import request from './plugins/request'

export let timestampToTime = (time) => {
    var date = new Date(time * 1000) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear();
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
    var D = date.getDate();
    return {
        Y,M,D
    }
}
// 分类
export let Designer = (params = {}) => {
    let url = '/api/designer';
    return request({
        url,
        params,
        method: 'get'
    })
}
export let Works = (params = {}, id = -1) => {
    let url = '/api/works';
    if (id > 0) {
        url = '/api/works/' + id;
    }
    return request({
        url,
        params,
        method: 'get'
    })
}

