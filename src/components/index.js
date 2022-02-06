// 基础组件的自动化全局注册
import Vue from 'vue'
const requireComponent = require.context(
    // 其组件目录的相对路径
    '@/components',
    // 是否查询其子目录
    true,
    // 匹配基础组件文件名的正则表达式
    /\.vue$/
)
//打印所有组件的路径名:
// console.log(requireComponent.keys())
requireComponent.keys().forEach(fileName => {
    // 获取组件配置
    const componentConfig = requireComponent(fileName)
    // 全局注册组件
    Vue.component(
        componentConfig.default.name,// 此处的name,是组件属性定义的name
        // 如果这个组件选项是通过 `export default` 导出的，
        // 那么就会优先使用 `.default`，
        // 否则回退到使用模块的根。
        componentConfig.default
    )
})