<template>
    <div>
        <div class="commentTop">
             <router-link :to="{name:'ArticleManage'}">
                 &nbsp;&nbsp;&nbsp;<i style="font-size:24px;font-weight:700" class="el-icon-back">&nbsp;返回</i>
            </router-link>
        </div>
        <div class="commentbottom">
            <!-- 左边显示文章 -->
          <div class="article">
             <div class="title">
                 <h3>{{this.articlemsg.title}}</h3> 
                <div class="fontsamll" style="font-size:14px">
                    作者 <span >{{this.articlemsg.nickName}}</span>&nbsp; 时间 <span >{{this.articlemsg.time |formatTimer}}</span>
                <br/><br/><br/>
                </div>
             </div>
             <div style="overflow:auto;width=100%;" class="content"> <div  v-html="this.articlemsg.content"></div></div>
             <div class="foot">
                 <i class="el-icon-ice-cream-round"></i>点赞{{this.articlemsg.numStar}}  <i class="el-icon-star-on"></i>收藏{{this.articlemsg.numFavorite}}  <i class="el-icon-chat-dot-round"></i>评论{{this.articlemsg.numComment}}
                &nbsp;&nbsp;&nbsp;
             </div>
          </div>
          <!-- 右边显示评论 -->
          <div  class="comment">
              <div v-for="item in this.articlemsg.gamaArticleComments" :key="item.id">
                  <div class="userinfo">
                      <span>{{item.replynickName}}</span> <span style="font-size:12px">{{item.time |formatTimer}}</span> 
                     <el-popover
                         trigger="hover"
                         v-model="visible"
                         style="text-align:center">
                        <p>确定删除吗？</p>
                         <div style="float:left; margin: 0;text-align:center">
                            <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                            <el-button type="primary" size="mini" @click="deleteComment(item.id)">确定</el-button>
                        </div>
                        <el-button style="float:right" slot="reference" size="mini" type="primary"> 删除</el-button>
                    </el-popover>
                  </div>
                  <div style="overflow-x:hidden;overflow-y:auto;word-break:break-all;text-indent:2em; " class="commentinfo">
                      11121111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
                      <!-- <div style="width:100%;overflow: hidden;" v-html="item.content"></div> -->
                  </div>
              </div>
          </div>
        </div>
    </div>
</template>
    <!--<div>
        评论列表
        {{$route.query.articleId}}
        <router-link :to="{name:'ArticleManage',query:{articleId:'111111'}}">返回</router-link>
       <input type="text">
    </div>-->
<script>
export default {
    data() {
        return {
            visible:false,
           articlemsg:{
    

           } 
        }
    },
    methods:{
        deleteComment(id){ //删除文章的评论
        // this.visible = false;
            console.log("回复的id");
            console.log(id);
            this.$axios.delete('/Content/DeleteCommentByid?id='+id)
            .then(res=> {
                console.log(res.data);
               this.$message('删除成功');
               this.init();
            })
            .catch(err=> {
                console.log(err)
            })
        },
        init(){
            this.$axios.get('/Content/QueryArticleDetailsByid',{params:{id:this.$route.query.articleId}})
        .then(res=> {
            console.log("-----");
            console.log(res.data);
            this.articlemsg = res.data[0];
        })
        .catch(err=> {
            console.log(err);
        })
        }

    },
    // filters:{	//过滤器名：方法
    //         timeFormat:function(str){
    //         var date = new Date(str)
    //         var year = date.getFullYear().toString()
    //         var month = (date.getMonth()+1).toString()
    //         var day = date.getDate().toString()
    //         var hour = date.getHours().toString()
    //         var minute = date.getMinutes().toString().padStart(2,'0')
    //         var second = date.getSeconds().toString()
    //         return year +'-' + month +'-' + day +' '+ hour +':'+ minute +':' + second 
    //         }
    //     },
    beforeLeave(to, from, next){console.log("likai");
        let toDepth = to.path.split('/').length
        let fromDepth = from.path.split('/').length
        console.log(toDepth+fromDepth)
        if (toDepth < fromDepth) {
        // console.log('back...')
        to.meta.keepAlive = true
        }
    },
    created(){
        this.init();
    }
}

</script>
<style scope>
.commentTop {
    height: 8vh;
    line-height: 8vh;
    text-align: left;
}
.commentbottom {
    height: 82vh;
    max-height: 82vh;
    width: 96%;
    margin: 0 auto;
}
.article {
   padding: 1px;
    width: 48%;
    float: left;
    height: 78vh;
    border: 1px solid #ccc;
    /* overflow: auto; */
}
.title {
    width: 100%;
    max-height: 8vh;
    height: 8vh;
     /* overflow: auto; */
}
.fontsamll {
    font-weight: 700;
    color: brown;
    font-family: 'Courier New', Courier, monospace
}
.content {
     width: 100%;
    text-align: left;
    max-height: 66vh;
    height: 66vh;
    /* overflow: auto; */
}
.foot {
    text-align: right;
    max-height: 4vh;
    line-height: 4vh;
    font-size: 12px
}
.comment {
   padding: 1px;
    width:48%;
    float: left;
    height: 78vh;
     border: 1px solid #ccc;
     overflow:auto;
}
.userinfo {
    width: 98%;
    padding-left: 2%;
    text-align: left;
}
.commentinfo {
    width: 94%;
    padding-left: 6%;
    border-bottom: 1px solid blue; 
    text-align: left;
   
}
</style>