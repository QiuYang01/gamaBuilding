<template>
 <div  style="width:96%;margin:0 auto;max-height:91vh;height:89vh;margin-top:2vh">
  <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;height:89vh" stripe 
    @selection-change="handleSelectionChange"
     :default-sort = "{prop: 'lever', order: 'descending'}"> <!--默认排序 -->
    <!-- <el-table-column type="selection" width="55">
    </el-table-column> -->
    <el-table-column  prop="nickName" label="昵称" > </el-table-column>
    <el-table-column sortable prop="lever" label="等级" > </el-table-column>
    <el-table-column sortable prop="numProfession" label="专业回答数" show-overflow-tooltip> </el-table-column>
     <el-table-column  prop="badgeId" label="徽章" show-overflow-tooltip> </el-table-column>
    <el-table-column label="操作">
     <template slot-scope="scope">  <!-- //加了slot-scope="scope"，后面就能用scope.row获取当前行的信息 -->
        <el-button
          size="mini"
          type="danger"
          @click="opendialog(scope.$index, scope.row)">授予徽章</el-button> <!-- 点击按钮后，发请求返回这个人的文章数量等显示在弹出框 -->
      </template>
    </el-table-column>
  </el-table>

      <!-- 显示用户的信息的对话框 -->
    <el-dialog
      :visible.sync="dialogVisible"
      style="width:100%;margin:0 auto;"
      width="80%"
      :before-close="handleClose">
      <showdata :userData="this.userData" style="width:100%;margin:0 auto;"></showdata>
      <!-- //选择徽章 -->
      <el-rate v-model="checkedbadge" :max='badgeNum' show-text :texts="badges">
        </el-rate>
      <span slot="footer" class="dialogfoot">
        <el-button @click=cacle>取 消</el-button>
        <el-button type="primary" @click=grantBadge>确 定</el-button>
      </span>
</el-dialog>

    </div>
</template>

<script>
import showdata from '@/components/GrantBadge/ShowdataArticleAnswer.vue'
  export default {
    components:{showdata},
    data() {
      return {
        checkedbadge:null,  //选中的徽标额下标  1开始
        //badgeNum:6,   //徽章的总数
        badges:['差','一般','好','优秀','超级棒','sss'],
          dialogVisible: false,
          tableData: [{   //列表显示的数据
          userId: '1',
          nickName: '张三',
          lever: '2',
          numProfession: '1',
          badgeId:'',
        },{
          userId: '2',
          nickName: '李四',
          lever: '1',
          numProfession: '3',
          badgeId:'',
        }, {
          userId: '3',
          nickName: '邓五',
          lever: '3',
          numProfession: '3',
          badgeId:'',
        }, ],
        multipleSelection: [],
        checkUserId:'',   //被选中的用户的id
        userData:[{  //发请求返回七天的数据，数组对象，每个对象有时间，提问数，回答数，文章数
          time:'2020-02-18',
          questionNumber:'13',
          answerNumber:'12',
          articleNumber :'21'
        },{  //发请求返回七天的数据，数组对象，每个对象有时间，提问数，回答数，文章数
          time:'2020-02-19',
          questionNumber:'22',
          answerNumber:'13',
          articleNumber :'22'
        },{  //发请求返回七天的数据，数组对象，每个对象有时间，提问数，回答数，文章数
          time:'2020-02-20',
          questionNumber:'33',
          answerNumber:'14',
          articleNumber :'23'
        },{  //发请求返回七天的数据，数组对象，每个对象有时间，提问数，回答数，文章数
          time:'2020-02-21',
          questionNumber:'44',
          answerNumber:'15',
          articleNumber :'24'
        },{  //发请求返回七天的数据，数组对象，每个对象有时间，提问数，回答数，文章数
          time:'2020-02-22',
          questionNumber:'22',
          answerNumber:'16',
          articleNumber :'25'
        },{  //发请求返回七天的数据，数组对象，每个对象有时间，提问数，回答数，文章数
          time:'2020-02-23',
          questionNumber:'22',
          answerNumber:'17',
          articleNumber :'26'
        },{  //发请求返回七天的数据，数组对象，每个对象有时间，提问数，回答数，文章数
          time:'2020-02-24',
          questionNumber:'22',
          answerNumber:'18',
          articleNumber :'27'
        }]
      }
    },

    methods: {
      // toggleSelection(rows) {
      //   if (rows) {
      //     rows.forEach(row => {
      //       this.$refs.multipleTable.toggleRowSelection(row);
      //     });
      //   } else {
      //     this.$refs.multipleTable.clearSelection();
      //   }
      // },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      opendialog(index,row){  //通过用户的id请求各数量信息，赋值给userData
        this.dialogVisible = true;
         // console.log(index);
          //console.log(row);
          this.checkUserId = row.userId;
      },
      cacle(){
        this.dialogVisible = false;
        this.checkedbadge = null;   //清空选择的徽章
      },
      grantBadge(){   //发送请求，保存授予的徽章 发送用户id和徽章id
        this.dialogVisible = false;
        console.log("选中的id为"+this.checkUserId)
        console.log(this.checkedbadge);
        console.log("选中的标签为"+this.badges[this.checkedbadge-1]);
        this.checkedbadge = null;
      }
    
    },
    computed:{
      badgeNum(){   //徽章的总数
        return this.badges.length;
      }
    },
    mounted(){
      //发送请求为tableData赋值
    }
  }
</script>

<style >
.dialogfoot {
  text-align: center
}
.el-rate__icon {
    font-size: 30px;
}
.el-table th {
    background-color: #ffffff;
}
</style>