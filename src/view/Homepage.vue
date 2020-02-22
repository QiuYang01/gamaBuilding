<template>
<el-container>
  <el-header style="min-height:8vh">伽马建筑后台管理系统</el-header>
  <div style="height:91vh">
    <el-row>
         <el-col style="" :span="3" :class="[this._isMobile() ? 'aside_phone' : 'aside']" >
          <div style="">
            <div style="height:4vh" class="userMessage">{{this.welcome}}欢迎您</div>  
            <el-menu
                style="height:87vh;margin:0 auto"
                default-active="/Homepage/EducationReview"
                :router="true"
                :unique-opened="true"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                align="left"
               
                >
                <el-submenu index="1">
                    <template slot="title">
                    <i class="el-icon-s-custom"></i>
                    <span>用户管理</span>
                    </template>
                    <el-menu-item  index="/Homepage/EducationReview" style="min-width: auto;">学历审核</el-menu-item>
                    <el-menu-item index="/Homepage/PositionReview" style="min-width: auto;">职位审核</el-menu-item>
                    <el-menu-item index="/Homepage/grantBadge" style="min-width: auto;">授予徽章</el-menu-item>
                    <el-menu-item index="/Homepage/AccountManage" style="min-width: auto;">账户管理</el-menu-item>
                    <el-menu-item index="#" style="min-width: auto;">修改密码</el-menu-item>
                    <el-menu-item index="#" style="min-width: auto;">停启用账户</el-menu-item>
                </el-submenu>

            <el-submenu index="2">
                    <template slot="title">
                    <i class="el-icon-s-data"></i>
                    <span>内容管理</span>
                    </template>
                    <el-menu-item index="#" style="min-width: auto;">主页推荐设置</el-menu-item>
                    <el-menu-item index="#"    style="min-width: auto;">删除不良</el-menu-item>
                    <el-menu-item index="#"    style="min-width: auto;">徽章管理</el-menu-item>
            </el-submenu>

            <el-submenu index="3">
                    <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>管理员管理</span>
                    </template>
                    <el-menu-item index="#" style="min-width: auto;">修改管理员信息</el-menu-item>
                   
            </el-submenu>
                </el-menu>
             </div>
        </el-col>
        <el-col :span="21" :class="[this._isMobile() ? 'main_phone' : 'main']" >
            <div >
                <router-view></router-view>
            </div>
        </el-col>
        
    </el-row>
  </div>
</el-container>
</template>
<script>
export default {
    data() {
        return {
          welcome:'',
        }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      _isMobile() { //判断是手机还是PC
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
      }
    },
    beforeRouteEnter(to, from, next) {     //判断是否登录
      if(sessionStorage.getItem("UserId")) {     //如果sessionstorage里存了用户名，则表示已登录
        next(true);
      }else {
        next(vm => {    // 通过 `vm` 访问组件实例 ，直接用this是有指向问题的   
          vm.$router.push('/');
          vm.$message({     
            message: '请先登录！',
            type: 'warning'
          });
        })

      }
    },
    created(){
      if( this.$store.state.name !=''){
          this.welcome = this.$store.state.name;
      }
      else{
        console.log("执行else里面的");
        this.welcome = sessionStorage.getItem('UserName');
      }
      
    }
        
}
</script>
<style scope>
 /* .el-container {
     background-color: blue
 } */
 .el-collapse-item__content {
     padding: 0;
     margin: 0%
 }
 .aside {
     background-color: antiquewhite;  /*欢迎您的颜色*/
     height:91vh
 }
 .aside_phone {
     overflow:auto;
    background-color: antiquewhite;   /*欢迎您的颜色*/
     width: 100%;
     height: 30vh;
     
 }
 .main {
     /* background-color: aqua */
 }
 .main_phone {
     /* background-color: aqua; */
     width: 100%;
 }
 .userMessage {
     text-align: center;
 }

.el-collapse-item__header {
     text-align: center;
     font-size: 16px;
 }
 .el-collapse-item__arrow {
     margin: 0 8px 0 auto;
 }

a {
    text-decoration: none
}
</style>
<style >
 .el-submenu__title {
     background-color: blue;
     padding: 0;
 }
</style>
