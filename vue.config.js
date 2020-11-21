module.exports = {
  devServer: {
    // 自动开启浏览器
    open: true,
    // 一切服务都启用gzip 压缩：
    compress: true,
    // 热模块替换
    hot: true,
    port: 7643,
    // 将运行进度输出到控制台。
    progress: true
  }
}
