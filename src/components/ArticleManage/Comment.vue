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
                    作者 <span >{{this.articlemsg.nickName}}</span>&nbsp; 时间 <span >{{this.articlemsg.time |timeFormat}}</span>
                <br/><br/><br/>
                </div>
             </div>
             <div class="content">{{this.articlemsg.content}}</div>
             <div class="foot">
                 <i class="el-icon-ice-cream-round"></i>点赞{{this.articlemsg.numStar}}  <i class="el-icon-star-on"></i>收藏{{this.articlemsg.numFavorite}}  <i class="el-icon-chat-dot-round"></i>评论{{this.articlemsg.numComment}}
                &nbsp;&nbsp;&nbsp;
             </div>
          </div>
          <!-- 右边显示评论 -->
          <div class="comment">显示评论</div>
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
           articlemsg:{
                id: 1,
                userId: 1,
                nickName: "Zeng",
                title: "1",
                content: "1",
                numStar: 1,
                numComment: 1,
                numFavorite: 1,
                labels: "1",
                time: "2020-02-27T06:51:12.000+0000",
                gamaArticleComments:[
                     {id: 1, userId: 2, replyId: 1, content: null, time: "2020-02-27T06:45:44.000+0000" },
                     {id: 2, userId: 1, replyId: 2, content: null, time: "2020-02-27T06:58:30.000+0000" }
                ]
                

           } 
        }
    },
    methods:{

    },
    filters:{	//过滤器名：方法
            timeFormat:function(str){
            var date = new Date(str)
            var year = date.getFullYear().toString()
            var month = (date.getMonth()+1).toString()
            var day = date.getDate().toString()
            var hour = date.getHours().toString()
            var minute = date.getMinutes().toString().padStart(2,'.')
            var second = date.getSeconds().toString()
            return year +'-' + month +'-' + day +' '+ hour +':'+ minute +':' + second 
            }
        },
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
        this.$axios.get('/Content/QueryArticleDetailsByid',{params:{id:this.$route.query.articleId}})
        .then(res=> {
            console.log(res.data);
            this.articlemsg = res.data[0];
        })
        .catch(err=> {
            console.log(err);
        })
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
    overflow: auto;
}
.title {
    width: 100%;
    max-height: 14vh;
    height: 12vh;
     overflow: auto;
}
.fontsamll {
    font-weight: 700;
    color: brown;
    font-family: 'Courier New', Courier, monospace
}
.content {
    text-align: left;
    max-height: 62vh;
    height: 62vh;
    overflow: auto;
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
}
</style>