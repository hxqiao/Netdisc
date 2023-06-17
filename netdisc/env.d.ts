declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'echarts' {
  const echarts: any
  export default echarts
};

declare module 'spark-md5';