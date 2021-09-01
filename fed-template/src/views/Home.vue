<template>
  <div class="home flex-cloumn flex-center">
    <h2>超境项目Vue模板</h2>
    <p>assets ->目录放置资源 scss/image/svg等</p>
    <p>constant -> 放置静态变量/配置</p>
    <p>api -> 接口</p>
    <p>directive -> 指令</p>
    <p>eventbus -> 用到时引入到main.js</p>
    <p>mixins -> 混入代码,按需</p>
    <p>lang -> 多语言</p>
    <p>router -> 路由</p>
    <p>store -> 仓库</p>
    <p>utils -> 工具库</p>
    <p>views -> 页面</p>
  </div>
</template>

<script>
export default {
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.home{
  width: 50%;
  height: 100%;
  margin: 0 auto;
  h2+p{
     margin-top: 30px;
  }
  p+p{
    margin-top: 12px;
  }
}
</style>
