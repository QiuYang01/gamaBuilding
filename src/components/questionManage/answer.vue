<template>
    <div>
        <div class="questionTop">
             <router-link :to="{name:'questionManage'}">
                 &nbsp;&nbsp;&nbsp;<i style="font-size:24px;font-weight:700" class="el-icon-back">&nbsp;返回</i>
            </router-link>
        </div>
        <div class="questionbottom">
            <!-- 问题 -->
            <div class="question">
               <span style="font-size:18px;font-weight:600">{{this.answermsg.nickName}}</span>  <span style="font-size:12px">{{this.answermsg.time |formatTimer}}</span> 
               <el-button  v-if="isdelete === 1" style="float:right" type="danger" size="mini" @click="deletequestion()">删除问题</el-button>
               <el-button v-else style="float:right" type="info" disabled="" size="mini">问题已删除</el-button>
                <br/>
               <span>{{this.answermsg.content}}</span>
               
            </div>
            <!-- 所有回答 -->
            <div class="answer">
                <!-- 一个回答和所有评论 -->
                <div v-for="item in this.answermsg.gamaQuestionAnswers" :key="item.id">
                    <!-- 回答 -->
                    <div style="width:98%;margin-left:2%;border-bottom: 1px solid #000" >
                        <span style="font-size:18px;font-weight:600">{{item.nickName}}</span><span style="font-size:12px">{{item.time |formatTimer}}</span>
                        <el-button style="float:right" type="danger" size="mini" @click="deleteanswer(item.id)">删除回答</el-button>
                        <br/> 
                        <span>{{item.content}}</span>
                         <!-- <span>{{item.gamaQanswerComments}}</span> -->
                    </div>
                    <!-- 回答的评论 -->
                    <div  style="width:96%;margin-left:4%;border-bottom: 1px solid #000" v-for="itemquecom in item.gamaQanswerComments" :key="itemquecom.id">
                        <span style="font-size:18px;font-weight:600">{{itemquecom.nickName}}</span>  <span style="font-size:12px">{{itemquecom.time |formatTimer}}</span>
                        <el-button style="float:right" type="danger" size="mini" @click="deleteanswercom(itemquecom.id)">删除回答的评论</el-button>
                        <br/> 
                        <span>{{itemquecom.content}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
          isdelete:'',
           answermsg:{ } 
        }
    },
    methods:{
        // deleteComment(id){ //删除文章的评论
        //     console.log("回复的id");
        //     console.log(id);
        //     this.$axios.delete('/Content/DeleteCommentByid?id='+id)
        //     .then(res=> {
        //         console.log(res.data);
        //        this.$message('删除成功');
        //        this.init();
        //     })
        //     .catch(err=> {
        //         console.log(err)
        //     })
        // },
        init(){
            this.$axios.get('/Content/QueryQuestionDetailsByid',{params:{id:this.$route.query.questionId}})
            .then(res=> {
                console.log("这个问题的回答");
                console.log(res.data);
                this.answermsg = res.data[0];
                console.log(this.answermsg)
            })
            .catch(err=> {
                console.log(err);
            })
            // console.log(this.$route.query.questionId);
        },
        deletequestion(){
            // this.$route.query.questionId为打开的问题的id
            console.log(this.$route.query.questionId);
            this.$axios.delete('/Content/DeleteQuestionByid?id='+this.$route.query.questionId)
             .then(res=> {
                console.log(res);
                if(res.data.status === 0){
                     this.$message('删除成功');
                    //  this.tableData.splice(index,1);
                    //this.init();
                    this.isdelete = 0;
                }   
                else
                    this.$message('删除失败');
            })
            .catch(err=> {
                console.log(err);
            })
        },
        deleteanswer(answerId){
            console.log(answerId);
            this.$axios.delete('/Content/DleteAnswerByid?id='+answerId)
            .then(res=>{
                //console.log(res);
                if(res.data.status === 0){
                    this.$message("删除成功");
                    this.init();
                }
                
            })
            .catch(err=> {
                console.log(err);
            })
        },
        deleteanswercom(comid){    //删除问题回答的评论
            console.log(comid);
            this.$axios.delete('/Content/DeleteAnswerCommentByid?id='+comid)
            .then(res=>{
                //console.log(res);
                if(res.data.status === 0){
                    this.$message("删除成功");
                    this.init();
                }   
            })
            .catch(err=> {
                console.log(err);
            })
        }

    },
    beforeLeave(to, from, next){
        console.log("likai");
        let toDepth = to.path.split('/').length
        let fromDepth = from.path.split('/').length
        console.log(toDepth+fromDepth)
        if (toDepth < fromDepth) {
         console.log('back...')
        to.meta.keepAlive = true
        }
    },
    created(){
        this.init();
        this.isdelete = this.$route.query.isdelete;
    }
}

</script>
<style scope>
.questionTop {
    height: 8vh;
    line-height: 8vh;
    text-align: left;
}
.questionbottom {
    height: 82vh;
    max-height: 82vh;
    width: 96%;
    margin: 0 auto;
}
.question {
    width: 100%;
    border: 1px solid #ccc;
    max-height: 6vh;
    text-align: left;
    
}
.answer {
    width: 100%;
    text-align: left;
    max-height: 74vh;
    height: 74vh;
    border: 1px solid #ccc
}
</style>