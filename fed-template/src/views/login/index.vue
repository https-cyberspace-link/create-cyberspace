<template>
    <div class="amp-login" v-loading="loading">
        <login-header />
        <div class="amp-login-content cj-col-12">
            <div class="amp-login-module">
                <h3>登录超境服务系统</h3>
                <cj-form class="amp-login-form" :model="form" :rules="rules" ref="form">
                    <cj-form-item label="" prop="userName" >
                        <cj-input v-model="form.userName" autocomplete="off" placeholder="请输入用户名" isTrim>
                            <i class="cj-icon-user" slot="prefix"></i>
                        </cj-input>
                    </cj-form-item>
                    <cj-form-item label="" prop="password">
                        <cj-input type="new-password" v-model="form.password" autocomplete="off" placeholder="请输入密码" show-password isTrim>
                            <i class="cj-icon-lock" slot="prefix"></i>
                        </cj-input>
                    </cj-form-item>
                    <cj-button class="amp-login-button" type="primary" @click="submitLogin">登录</cj-button>

                    <!-- <div class="amp-login-other flex-between">
                        <div class="flex" @click="feishuLogin">
                            <img src="../../assets/images/feishu.png">飞书登录
                        </div>
                        <div class="flex" @click="codeLogin">
                            <img src="../../assets/images/mobile.png">验证码登录
                        </div>
                    </div> -->
                </cj-form>
            </div>
        </div>
    </div>
</template>

<script>
import index from './index.js'
export default index
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
