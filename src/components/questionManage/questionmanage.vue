<template>
   
   <div>
       <div class="articleTop">
        <el-select @change="selectLabel" style="width:16%;margin:0 2%" clearable  v-model="labelValue" placeholder="所有类别">
            <el-option
            v-for="item in labels"
            :key="item.id"
            :label="item.content"
            :value="item.id"
            >
            </el-option>
         </el-select>
         按标题/发布人查询
         <el-input
            placeholder="标题/发布人"
            style="width:20%"
            v-model="searchbyname"
            @input="search"
            clearable>
        </el-input>
       </div>
       <div class="articlebottom">

        <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
         :data="tableData.filter(data => !searchbyname || data.nickName.toLowerCase().includes(searchbyname.toLowerCase()) ||data.title.toLowerCase().includes(searchbyname.toLowerCase()) )"
         
          style="width: 96%;max-height:81vh;margin:0 auto;"
          height="81vh"
          border
          stripe >
          <el-table-column min-width="20" label="问题编号" prop="id"></el-table-column>
          <el-table-column min-width="30" label="发布者" prop="nickName"> </el-table-column>
          <el-table-column min-width="70" label="问题" prop="title"></el-table-column>
          <el-table-column min-width="28" label="信息" style="padding:0">
              <template slot-scope="scope" > 
                  <ul style="font-size:12px;">
                      <li >关注数 &nbsp;{{scope.row.numAttention}}</li>
                      <li >回答数 &nbsp;{{scope.row.numAnswer}}</li>
                      <li >浏览数 &nbsp;{{scope.row.numView}}</li>
                  </ul>
               </template>  
          </el-table-column>
          <el-table-column min-width="20" label="类别" prop="labels">
              <!-- <template slot-scope="scope" > 
                  {{scope.row.labels.replace(/[\"|\'|\“|\”|\‘|\’|\[|\]]/g, "").split(',')[0]}}
                  <ul>
                    <li v-for="item in scope.row.labels.replace(/[\'|\“|\”|\‘|\’|\[|\]]/g ,'').split(',')" :key="item">{{item.replace(/[\"]/g ,'')}}</li>
                </ul>
               </template> -->
          </el-table-column>
          <el-table-column min-width="40" label="时间"  prop="time" sortable :formatter="formatTime"> </el-table-column>
          <el-table-column min-width="50" label="操作" align="center">          
            <template slot-scope="scope" > <!--handleDelete(scope.$index, scope.row)   查询一个问题的详细的接口没有返回问题是否删除，这里传是否删除过去-->
            <router-link :to="{name:'questionManage/answer',query:{questionId:scope.row.id,isdelete:scope.row.isUseful}}">
              <el-button size="mini" type="info" >查看</el-button>
            </router-link>
              <el-button size="mini" v-if="!scope.row.isUseful" disabled type="danger" @click="deleteArticle(scope.$index, scope.row)">删除</el-button>
              <el-button size="mini" v-else type="danger" @click="deleteArticle(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

       </div>
   </div>
    
</template>
 <!-- <div>
            <div>
        文章管理<router-link :to="{name:'ArticleManage/Comment',query:{articleId:'111111'}}">跳转</router-link>
       <input type="text">
        </div>
    </div> -->
<script>
import QS from 'qs';
export default {
    data() {
        return {
            searchbyname:'',
        labels: [{      //所有标签的值
          id: '1',
          content: '中国'
        }, {
          id: '2',
          content: '建筑'
        }, {
          id: '3',
          content: '3'
        }, {
          id: '4',
          content: '龙须面'
        }, {
          id: '5',
          content: '北京烤鸭'
        }],
        labelValue: '',     
         tableData: [  ],
         loading:true
        }
    },
    methods:{
         formatTime(row, column){
        //获取datas
         const date= new Date(row[column.property]); 
         //var date = new Date(dates);
        // console.log(date);
         return date.getFullYear() + '/' + (date.getMonth()+1).toString() + '/' +
                date.getDate() + '  ' + 
                date.getHours().toString() + ':' +
                 date.getMinutes().toString().padStart(2,'0') + ':' +
                 date.getSeconds().toString().padStart(2,'0');
      },
        selectLabel(val){   //通过标签筛选问题
          if(this.labelValue!= ''){     //通过某个标签筛选
                let index = this.labels.findIndex(item=>{	//indexe为Id所在的索引
                                      if(item.id == val)
									    	return true
					                   })	
                console.log(index);     //获取label的id，从而获取内容
                this.$axios.get('/Content/QueryQuestionByCondition',{params:{labels:this.labels[index].content }})
                .then(res=> {
                    console.log(res);
                    this.tableData = res.data;
                })
                .catch(err=> {
                    console.log(err);
                })  
            }
          else{     //标签框为空。请求所有
                this.$axios.get('Content/QueryQuestionByCondition')
                .then(res=> {
                    console.log(res);
                    this.tableData = res.data;
                })
                .catch(err=> {
                    console.log(err);
                })
            }   
        },
        search(){      //按标题/发布者搜索
            console.log("改变");
        },
        deleteArticle(index,row){ //删除问题
            console.log(row);
            this.$axios.delete('/Content/DeleteQuestionByid?id='+row.id)
             .then(res=> {
                console.log(res);
                if(res.data.status === 0){
                     this.$message('删除成功');
                   //  this.tableData.splice(index,1);
                   this.init();
                }   
                else
                    this.$message('删除失败');
            })
            .catch(err=> {
                console.log(err);
            })
            
        },
        StickyArticle(index,row){   //置顶文章
            //console.log(row);
            //发送置顶的请求  Content/stickyArticleByid
            // this.$axios.post('/Content/stickyArticleByid',QS.stringify({id:row.id}))
            // .then(res=> {
            //     console.log(res);
            //    if(res.data.status === 0){
            //        this.$message('置顶成功');
            //       // this.tableData.splice(index,1);
            //       this.init();
            //    }
                 
            //     else
            //     this.$message('置顶失败');
            // })
            // .catch(err=> {
            //     console.log(err);
            // }) 
        },
        init(){
            this.loading = true;
            this.$axios.get('Content/QueryQuestionByCondition')
                .then(res=> {
                    console.log(res);
                    this.tableData = res.data;
                    //console.log("----");
                    //console.log(res.data[0].labels.split(","));
                })
                .catch(err=> {
                    console.log(err);
                })
                .finally(()=> {
                   this.loading = false;
                }) 
                }
                
    },
    // beforeRouteLeave(to, from, next){     //通过url长度判断要去的页面是否是文章评论列表，是的话就缓存本页面
    //     let toDepth = to.path.split('/').length     //要去的文章评论列表的路由url长度
    //     let fromDepth = from.path.split('/').length //现在的文章列表的路由url长度
    //     //console.log(toDepth);
    //     //console.log(fromDepth);
    //     if (toDepth > fromDepth) 
    //         from.meta.keepAlive = true  //在离开之前把现在的页面缓存
    //     next();
    // },
    created(){
       this.init();
    }

}
</script>
<style scope>
.articleTop {
   text-align: left;
   max-height: 10vh;
   height: 10vh;
   line-height: 10vh;
}  
.articlebottom {
  max-height: 81vh;
   height: 81vh;  
}
li {
    list-style: none
}
.box-table tbody .cell{
    max-height: 150px;
 }
</style>
<style >

</style>