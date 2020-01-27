<template>
  <div class="login">
    <div>
      <el-row style="margin-top:5%">
        <el-col :xs="{span: 22, offset: 1}" :sm="{span: 16, offset: 4}" :md="{span: 16, offset: 4}" :lg="{span: 12, offset: 6}" :xl="{span: 12, offset: 6}">
          <div class="grid-content bg-purple-light">
            <span class="title">伽马建筑后台管理</span>
            <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm">
            <el-form-item label="" prop="account">
              <el-input v-model="loginForm.account" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="" prop="password" style="margin:10% 0">
              <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
             
            <el-button type="primary" style="font-size:20px;margin-left:36%" @click="submit">登&nbsp;录</el-button>
              &nbsp;
            <el-checkbox v-model="store">记住密码</el-checkbox>

          </el-form>
          </div>
        </el-col>
       </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        store: false,
        loginForm: {
          account: '',
          password:'',
        },
        rules: {
          account: [
            { required: true, message: '账号不能为空'},
          ],
          password: { required: true, message: '密码不能为空'},
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      submit(){

        if(!this.loginForm.id&&!this.loginForm.password)
           this.$message.error('请填写完整');
        else{

          if(this.store){  //如果勾选了记住密码
           this.setCookie(this.loginForm.account,this.loginForm.password,7) //保存7天
          }
          else{ //没够选清除cookie
             this.clearCookie();
          }
          //发送请求
        }
      },
      //设置cookie
    setCookie(account, password, exdays) {
      // Encrypt，加密账号密码
      var cipherAccount = this.CryptoJS.AES.encrypt( account+'', "secretkey123" ).toString();
      var cipherPassword = this.CryptoJS.AES.encrypt(password+'', "secretkey123").toString();
      console.log(cipherAccount+'/'+cipherPassword)//打印一下看看有没有加密成功

      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie,加密后的字符串也有个=号,所以用==
      window.document.cookie =  "account" +  "==" + cipherAccount + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie = "password" + "==" + cipherPassword + ";path=/;expires=" + exdate.toGMTString();
    },
    //读取cookie
    getCookie: function() {
      if (document.cookie.length != 0) {
        var arr = document.cookie.split("; "); 
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("=="); //根据==切割
          //判断查找相对应的值
          if (arr2[0] == "account") {
            // Decrypt，将解密后的内容赋值给账号
            var bytes = this.CryptoJS.AES.decrypt(arr2[1], "secretkey123");
           // console.log("账号"+bytes.toString(this.CryptoJS.enc.Utf8));
            this.loginForm.account = bytes.toString(this.CryptoJS.enc.Utf8)-0;
          } else if (arr2[0] == "password") {
            // Decrypt，将解密后的内容赋值给密码
            var bytes = this.CryptoJS.AES.decrypt(arr2[1], "secretkey123");
          //  console.log("密码"+bytes.toString(this.CryptoJS.enc.Utf8));
            this.loginForm.password = bytes.toString(this.CryptoJS.enc.Utf8);
          }
        }
      }
    },
    //清除cookie
    clearCookie: function() {
      this.setCookie("", "", -1); 
    },
    
    },
    created() { //在挂载前读取cookie
      this.getCookie();
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    
  }
  .title {
    font: normal 400 36px 楷体;
  }
.demo-loginForm {
  width:60%;
  margin: 15% 16%;
  font-family: 宋体;
}
</style>
