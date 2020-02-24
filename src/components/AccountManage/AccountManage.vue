<template>
    <div style="width:100%;max-height:91vh;background-color: aliceblue;height:91vh;">
      <div style="height:5vh;border-bottom: 2px solid #a0a0a0;">
        <ul class="clearfix">
                <router-link :to="{name:'StopAccount'}"><li class="manage_li" @click="check(1)" :class="{'check':ischeck===1}">停 用 账 户</li></router-link>
                <router-link :to="{name:'StartAccount'}"><li class="manage_li" @click="check(2)" :class="{'check':ischeck===2}">启 用 账 户</li></router-link>
       </ul>
      </div>
      <router-view></router-view>

    </div>
</template>
<script>
export default {
    data() {
      return {
        ischeck:1,
      };
    },
    methods: {

      check(ischeck){
        this.ischeck = ischeck;
      }
    },
    
}
</script>

<style scope>
ul {
    width: 100%;
}
.manage_li {
    /* background-color: #a0a0a0; */
    width: 50%;
    display: block;
    padding: 0;
    float: left;
    /* border-bottom: 2px solid #a0a0a0; */
    text-align: center;
    border-left: 4px;
    border-top-left-radius:4px;
    border-top-right-radius:4px;
    /* padding: 8px 0; */
    font-weight: 700;
    height:5vh;
    line-height: 5vh;
    }
.clearfix:after{/*伪元素是行内元素 正常浏览器清除浮动方法,将clearfix加在父盒中*/
content: "";
display: block;
height: 0;
clear:both;
visibility: hidden;
}
.clearfix{
*zoom: 1;/*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
}
.check {
    background-color: #021e73;
    color: #ffffff 
}
</style>