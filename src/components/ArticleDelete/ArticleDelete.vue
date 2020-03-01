<template>
    <div style="width:100%;max-height:91vh;margin-top:3vh;">
        <el-table
          :data="tableData"
          style="width: 96%;max-height:86vh;margin: auto;"
          height="86vh"
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
          <el-table-column min-width="20" label="信息" style="padding:0">
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
                  <ul>
                    <li v-for="item in scope.row.labels.replace(/[\'|\“|\”|\‘|\’|\[|\]]/g ,'').split(',')" :key="item">{{item.replace(/[\"]/g ,'')}}</li>
                </ul>
               </template>
          </el-table-column>
          <el-table-column min-width="40" label="时间" sortable prop="time" :formatter="formatTime"> </el-table-column>
          <el-table-column min-width="50" label="操作" align="center">          
            <template slot-scope="scope" > <!--handleDelete(scope.$index, scope.row) -->
              <el-button size="mini"  type="danger" @click="CancelStickyDelete(scope.$index, scope.row)">取消删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
</template>
<script>
import QS from 'qs';
export default {
    data() {
        return {
            tableData: [ ],    
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
                date.getHours() + ':' +
                 date.getMinutes().toString().padStart(2,'0') + ':' +
                 date.getSeconds();
      },
        CancelStickyDelete(index,row){ //取消删除
             console.log(row);
             this.$axios.post('/Content/cancelDeleteArticleByid',QS.stringify({id:row.id}))
             .then(res=> {
                console.log(res);
               if(res.data.status === 0){
                   this.$message('取消删除成功');
                   this.tableData.splice(index,1);
               }
                else
                this.$message('取消删除失败');
            })
            .catch(err=> {
                console.log(err);
            })
        }
           
    },
    created(){  //请求所有数据，筛选出已经删除的
         this.$axios.get('/Content/QueryArticleByCondition')
        .then(res=> {
            console.log(res);
            res.data.forEach(item => {
                if(item.isUseful === 0){
                    this.tableData.push(item);
                }
            });
             
        })
        .catch(err=> {
            console.log(err);
        })
    }
}
</script>