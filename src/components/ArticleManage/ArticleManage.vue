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
       </div>
       <div class="articlebottom">

        <el-table
          :data="tableData"
          style="width: 96%;max-height:81vh;margin:0 auto;"
          height="81vh"
          border
          stripe >
          <el-table-column min-width="20" label="文章id" prop="id"></el-table-column>
          <el-table-column min-width="30" label="封面">
              <template slot-scope="scope">
                  <el-image
                    style="width: 100px; "
                    :src="scope.row.coverImg"
                    fit="fit">
                    <div slot="error" class="image-slot">
                        没有图片
                     </div>
                </el-image>
              </template>    
          </el-table-column>
          <el-table-column min-width="70" label="标题" prop="title"></el-table-column>
          <el-table-column min-width="28" label="信息" style="padding:0">
              <template slot-scope="scope" > 
                  <ul style="font-size:12px;">
                      <li >评论数 &nbsp;{{scope.row.numComment}}</li>
                      <li >点赞数 &nbsp;{{scope.row.numStar}}</li>
                      <li >收藏数 &nbsp;{{scope.row.numFavorite}}</li>
                  </ul>
               </template>  
          </el-table-column>
          <el-table-column min-width="20" label="类别" >
              <template slot-scope="scope" > 
                  <!-- {{scope.row.labels.replace(/[\"|\'|\“|\”|\‘|\’|\[|\]]/g, "").split(',')[0]}} -->
                  <ul>
                    <li v-for="item in scope.row.labels.replace(/[\'|\“|\”|\‘|\’|\[|\]]/g ,'').split(',')" :key="item">{{item.replace(/[\"]/g ,'')}}</li>
                </ul>
               </template>
          </el-table-column>
          <el-table-column min-width="40" label="时间"  prop="time" sortable :formatter="formatTime"> </el-table-column>
          <el-table-column min-width="50" label="操作" align="center">          
            <template slot-scope="scope" > <!--handleDelete(scope.$index, scope.row) -->
            <router-link :to="{name:'ArticleManage/Comment',query:{articleId:scope.row.id}}">
              <el-button size="mini" type="info" >查看</el-button>
            </router-link>
              <el-button size="mini" v-if="scope.row.isSticky" disabled type="primary" @click="StickyArticle(scope.$index, scope.row)">置顶</el-button>
              <el-button size="mini" v-else type="primary" @click="StickyArticle(scope.$index, scope.row)">置顶</el-button>
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
        labels: [{      //所有标签的值
          id: '1',
          content: '1'
        }, {
          id: '2',
          content: '2'
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
        selectLabel(val){   //通过标签筛选文章
           					
        // console.log(this.labelValue === '');
          if(this.labelValue!= ''){     //通过某个标签筛选
                let index = this.labels.findIndex(item=>{	//indexe为Id所在的索引
                                      if(item.id == val)
									    	return true
					                   })	
                console.log(index);     //获取label的id，从而获取内容
                // 通过this.labelValue发请求，上市成立就无参请求  否者就labels：this.labelValue发请求
                this.$axios.get('/Content/QueryArticleByCondition',{params:{labels:this.labels[index].content }})
                .then(res=> {
                    console.log(res);
                this.tableData = res.data;
                })
                .catch(err=> {
                    console.log(err);
                })  
            }
          else{     //标签框为空。请求所有
                this.$axios.get('/Content/QueryArticleByCondition')
                .then(res=> {
                    console.log(res);
                    this.tableData = res.data;
                })
                .catch(err=> {
                    console.log(err);
                })
            }
            
        },
        deleteArticle(index,row){ //删除文章
            console.log(row);
            this.$axios.delete('/Content/DeleteArticleByid?id='+row.id)
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
            this.$axios.post('/Content/stickyArticleByid',QS.stringify({id:row.id}))
            .then(res=> {
                console.log(res);
               if(res.data.status === 0){
                   this.$message('置顶成功');
                  // this.tableData.splice(index,1);
                  this.init();
               }
                 
                else
                this.$message('置顶失败');
            })
            .catch(err=> {
                console.log(err);
            }) 
        },
        init(){
            this.$axios.get('/Content/QueryArticleByCondition')
                .then(res=> {
                    console.log(res);
                    this.tableData = res.data;
                    //console.log("----");
                    //console.log(res.data[0].labels.split(","));
                })
                .catch(err=> {
                    console.log(err);
                }) 
                }
    },
    beforeRouteLeave(to, from, next){     //通过url长度判断要去的页面是否是文章评论列表，是的话就缓存本页面
        let toDepth = to.path.split('/').length     //要去的文章评论列表的路由url长度
        let fromDepth = from.path.split('/').length //现在的文章列表的路由url长度
        //console.log(toDepth);
        //console.log(fromDepth);
        if (toDepth > fromDepth) 
            from.meta.keepAlive = true  //在离开之前把现在的页面缓存
        next();
    },
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