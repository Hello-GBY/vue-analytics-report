
function installDirective(Vue) {
  Vue.directive("analytics-track", {
    bind(el, binding  ) {
      el.handler= (ev) => {
        ev.stopPropagation()
        let eventName = binding.arg
        let track = Vue.prototype.$Analytics && Vue.prototype.$Analytics.track
        let props
        if(!eventName) {
          console.log('事件名称不能为空，举例：v-analytics-track:myEvent');
          return
        }
        if(!track) {
          console.log('Vue.prototype.$Analytics 为空');
          return
        }
        if(binding.value === '') {
          track(eventName); return 
        }
        // 针对传递的是function 来获取动态获取data中的参数
        binding.value instanceof Function ? props = binding.value(el) : props = binding.value
        track(eventName, props)
      }

      el.addEventListener("click", el.handler) // 添加点击事件监听
    },
    unbind: function (el) {
      el.removeEventListener("click", el.handler) // 移出点击事件监听
    },
  });
}

function installPrototype(Vue, options) {
  // 引入埋点SDK
  Vue.prototype.$Analytics = window.AnalysysAgent;
  Vue.prototype.$AnalysysAgent = window.AnalysysAgent;
  Vue.prototype.$Analytics.options = options
}

// 注册全局组件
function installComponent(Vue, options) {
  console.log("options: ", options);
  //  Vue.component(testPanel.name, testPanel) // testPanel.name 组件的name属性
}

// 注册全局生命周期钩子
function installMixin(Vue, options) {
  console.log("options: ", options);
  Vue.mixin({
    created: function () {
      // console.log("mixin --- 我自己的混入");
    },
  });
}



export {installComponent, installMixin, installDirective, installPrototype}