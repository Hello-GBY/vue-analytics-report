import"./AnalysysAgent_SDK/AnalysysAgent_JS_SDK.min.js";
import"./AnalysysAgent_SDK/AnalysysAgent_Encrypt.min.js";
import"./AnalysysAgent_SDK/AnalysysAgent_GBK.min.js";
import"./AnalysysAgent_SDK/AnalysysAgent_PageViewStayTime.min.js";
import {installPrototype , installDirective} from './register'

/* 必须暴露 install 方法 */
const install = function (Vue, options) {
  if (install.installed) return;
  install.installed = true;

  initSDK(Vue, options); 
  // 通过全局 directive 方法添加一些全局指令，如：analysys-track
  installDirective(Vue, options); 
};

const vueEventReport = { install };

vueEventReport.options = {
  appkey: '/*设置为实际APPKEY*/', //APPKEY
  debugMode: process.env.NODE_ENV === "development" ? 2 : 0,  
  uploadURL:'/*设置为实际地址*/', //上传数据的地址
  /**如无自定义配置，则与uploadURL相同**/
  autoHeatmap: true, // 点击位置热图、点击元素热图
  autoWebstay: true,
  autoTrack: false, // 全埋点
  encryptType: 1, // 默认不加密0 加密1，2
  sendType: "post", // 接口上传日志
};

// 初始化埋点SDK
function initSDK(Vue, options) {
  vueEventReport.options  = {
    ...vueEventReport.options,
    ...options
  }
  window.AnalysysAgent.init(vueEventReport.options)
  installPrototype(Vue, vueEventReport.options)
}


export default vueEventReport;


