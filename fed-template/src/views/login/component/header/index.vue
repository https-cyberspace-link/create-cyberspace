<template>
  <div class="amp-login-header">
    <div class="cj-col-12 flex-between flex-align-center">
      <img src="http://s2.cyberspace.link/b-web/white-logo.png" alt="">
      <span>{{date}}</span>
    </div>
  </div>
</template>

<script>
import { dateToString, getWeekday } from '@/utils/utils.js'
export default {
  data () {
    return {
      date: `${dateToString(new Date(), 'yyyy-MM-dd')} ${getWeekday(new Date())}`
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/css/function.scss';
.amp-login-header{
  background: #000000;
  height: 60px;
  color: rgba(255,255,255, 0.8);
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  @include mobile{
    padding: 0 20px;
    font-size: 13px;
  }
  img{
    width: 130px;
  }
}
</style>
