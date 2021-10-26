<template>
  <div class="login">
    <div class="login-fomm">
      <el-form
        :model="formData"
        :rules="formRules"
        ref="loginForm"
        label-width="50px"
      >
        <el-form-item prop="username" label="账号">
          <el-input
            v-model="formData.username"
            placeholder="请输入用户名"
            @keyup.enter.native="doLogin"
          >
            <i slot="prefix" class="iconfont icon-zhanghao"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
            v-model="formData.password"
            placeholder="请输入密码"
            :type="inputType"
            @keyup.enter.native="doLogin"
            v-if="inputType === 'password'"
          >
            <i slot="prefix" class="iconfont icon-mima"></i>
            <span
              slot="suffix"
              class="cursor-pointer"
              @mousedown="mousedownPassword"
            >
              <i class="iconfont icon-yincangmima"></i>
            </span>
          </el-input>
          <el-input
            v-model="formData.password"
            placeholder="请输入密码"
            :type="inputType"
            @keyup.enter.native="doLogin"
            v-else
          >
            <i slot="prefix" class="iconfont icon-mima"></i>
            <span
              slot="suffix"
              class="cursor-pointer"
              @mousedown="mousedownText"
            >
              <i class="iconfont icon-xianshimima"></i>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doLogin">登录</el-button>
          <el-button type="primary" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/api/login.js";
// import { Form, FormItem, Input } from "element-ui";

export default {
  components: {
    // [Form.name]: Form,
    // [FormItem.name]: FormItem,
    // [Input.name]: Input,
    // 'login-background': LoginBackground
  },
  data() {
    return {
      loading: false,
      loadingVerify: false,
      inputType: "password",
      formData: {
        username: "",
        password: "",
      },
      verifyImage: "",
      formRules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    // 进入登录页面先清空个人信息
  },
  methods: {
    /**
			 登陆
			 */
    doLogin() {
      // 验证成功
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          console.log(this.formData);
          login(this.formData)
            .then((res) => {
              console.log(res);
              localStorage.setItem("AccessToken", res.body.accessToken);
              this.$router.push("/");
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.$message.error("请正确填写表单！");
          return false;
        }
      });
    },
    //注册
    register() {
      // 验证成功
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          console.log(this.formData);
          register(this.formData)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.$message.error("请正确填写表单！");
          return false;
        }
      });
    },
    mousedownPassword() {
      this.inputType = "text";
    },
    mousedownText() {
      this.inputType = "password";
    },
    mouseup() {
      this.inputType = "password";
    },
  },
};
</script>

<style scoped>
.login-fomm {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-250px, -250px);
  width: 500px;

  margin: 0;
}
</style>
