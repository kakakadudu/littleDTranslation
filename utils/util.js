const md5 = require("../utils/md5.min");

const appid = "20240222001970571";
const key = "mqnPAP6wjsRVssNOS5Yg";
/**
 * 翻译
 * @param {String} q 翻译文本
 * @param {String} from 原文语言
 * @param {String} to 译文语言
 */
function translateFunc(q, from = "auto", to) {
  wx.showLoading({
    title: '翻译中...',
  })
  const salt = Date.now(); // 随机数
  // appid+q+salt+密钥的MD5值
  const sign = md5(appid + q + salt + key);

  return new Promise((res, rej) => {
    wx.request({
      url: "https://fanyi-api.baidu.com/api/trans/vip/translate",
      data: {
        q,
        from,
        to,
        appid,
        salt,
        sign
      },
      success: (resp) => {
        const data = resp.data;
        if (data && data.trans_result) {
          res(data.trans_result[0])
        }
      },
      fail: () => {
        wx.showToast({
          title: '异常',
          icon: "error"
        })
        rej()
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  })
}

/**
 * 重置数据
 * @param {Array} data 数据
 * @param {String} key 字段
 * @param {*} val 值
 */
function resetGlobalDataFunc(data, key, val) {
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    item[key] = val;
  }
  return data;
}

/**
 * 函数防抖
 * @param {Function} func 传入函数
 * @param {Number} durtaion 延时
 */
function debounceFunc(func, duration) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    const agrs = [...arguments]
    timer = setTimeout(() => {
      func.apply(null, agrs)
      timer = null;
    }, duration);
  }
}

module.exports = {
  translateFunc,
  resetGlobalDataFunc,
  debounceFunc
}