<template>
    <div style="width:100%;">
      <div style="max-height:6vh;margin-top:1vh;">
        <!-- 选择不同的审核状态，改变表格的数据 -->
       <div style="float:left;margin-left:4%;width:10%">
           <el-select v-model="showType" size="mini" @change="typeChange" placeholder="待审核">
             <el-option label="已通过" value="1">  </el-option>
             <el-option label="待审核" value="0">  </el-option>
             <el-option label="未通过" value="2">  </el-option>
            </el-select>
        </div>
        <!-- 搜索框 -->
        <div style="float:left;margin-left:4%;width:14%">
          <el-input v-model="search"  prefix-icon="el-icon-search" size="mini" placeholder="输入关昵称/学校搜索"/>
           
        </div>
      </div>
      <el-container style="width:96%;margin:0 auto;">
      <el-table
          :data="tableData.filter(data => !search || data.nickName.toLowerCase().includes(search.toLowerCase()) ||data.school.toLowerCase().includes(search.toLowerCase()) )"
          style="width: 100%;max-height:82vh;margin-top:1vh"
          height="86vh"
          border
          stripe >
          <el-table-column label="昵称" prop="nickName"></el-table-column>
          <el-table-column label="学校" prop="school"></el-table-column>
          <el-table-column label="学位" prop="degree"></el-table-column>
          <el-table-column label="手机号" prop="bindPhone"></el-table-column>
          <el-table-column label="时间" prop='time' :formatter="formatTime"></el-table-column>
          <el-table-column align="center">          
            <template slot-scope="scope" > <!--handleDelete(scope.$index, scope.row) -->
              <el-button v-if="showType === '0'" size="mini"  type="danger" @click="openDialog(scope.$index, scope.row)">审核</el-button>
              <el-button v-else="" size="mini"  type="danger" @click="openDialog(scope.$index, scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-container>
    
        <!-- 点击按钮后弹框显示学历照片 -->
    <el-dialog :visible.sync="dialogFormVisible" @open="open" @close="close" width="80%"
       style="width:100%;margin:0 auto;">
            <template slot="title">
              学校:{{this.openDialogData.school}}&nbsp;学位:{{this.openDialogData.degree}}&nbsp;
            </template>
            <div v-if="this.openDialogData.pictureA !=''" :class="[this._isMobile() ? 'image_phone' : 'image_PC']" >   
                <el-image :src="openDialogData.pictureA"> </el-image>
            </div> 
            <div v-if="this.openDialogData.pictureB !=''" :class="[this._isMobile() ? 'image_phone' : 'image_PC']" > 
                <el-image :src="openDialogData.pictureB"> </el-image>
            </div> 
            <div v-if="this.openDialogData.pictureC !=''" :class="[this._isMobile() ? 'image_phone' : 'image_PC']" >
                <el-image :src="openDialogData.pictureC"> </el-image>           
            </div> 
            <div v-if="this.openDialogData.pictureD !=''" :class="[this._isMobile() ? 'image_phone' : 'image_PC']" >
                <el-image :src="openDialogData.pictureD"> </el-image>
            </div> 
            <div v-if="this.openDialogData.pictureE !=''" :class="[this._isMobile() ? 'image_phone' : 'image_PC']" > 
                <el-image :src="openDialogData.pictureE"> </el-image>
            </div> 
            
    <div slot="footer" class="dialog-footer">
        <el-button v-if="showType!='2'" @click="disPass(openDialogData.educationId,openDialogData.userId)">不通过</el-button>
        <el-button v-if="showType!='1'" type="primary" @click="pass(openDialogData.educationId,openDialogData.userId)">通过</el-button>
    </div>
    </el-dialog>


    </div>
</template> 

<script>
import QS from 'qs';
  export default {
    data() {
      return {
          search: '', //搜索框输入的
          dialogFormVisible: false,  //控制显示弹出框
          showType:'0', // 显示数据的审核状态

          tableData: [],
          openDialogData:{  //弹出框显示的数据
          userId:'',  //用户id
          nickName:'',  //昵称
          name: '',   //姓名
          bindPhone: '',  //手机号
          educationId:'', //教育经历的id
          time: '',   //认证上传时间
          school:'',  //学校
          degree:'',  //学位
          pictureA: '', //图片
          pictureB: '',
          pictureC: '',
          pictureD: '',
          pictureE: '',
        },
      }
    },

    methods: {
      formatTime(row, column){
        //获取datas
         const date= new Date(row[column.property]); 
         //var date = new Date(dates);
        // console.log(date);
         return date.getFullYear() + '/' + (date.getMonth()+1).toString() + '/' +
                date.getDate() + '  ' + 
                date.getHours() + ':' +
                 date.getMinutes() + ':' +
                 date.getSeconds();
      },
      handleDelete(userId) {
        //console.log(row.userId);
        let index1 = this.tableData.findIndex(item=>{	//index1为userId所在的索引
										if(item.userId === userId)
									    	return true;
              })
          
        this.tableData.splice(index1,1);
      },
      open(){
          //console.log("显示身份证的弹框显示");
      },
      close(){
         // console.log("显示身份证的弹框被关闭");
      },
      openDialog(index,row){
         // console.log(row);
          this.openDialogData = row;
          console.log("审核的信息");
          console.log(this.openDialogData);
          this.dialogFormVisible = true;
      },
      disPass(educationId,userId){
         console.log("不通过的educationId为"+educationId);
        this.$axios.post('/User/updateStatus', QS.stringify({   
          eId: parseInt(educationId), Status: 2 }))
            .then(response=> {
              if(response.data.status === 0){
                this.$message('审核成功');
              }
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });      
        this.dialogFormVisible = false;
        this.handleDelete(userId);
      },
      pass(educationId,userId){
        console.log("通过的educationId为"+educationId);
        this.$axios.post('/User/updateStatus', QS.stringify({   
          eId: parseInt(educationId), Status: 1 }))
            .then(response=> {
              if(response.data.status === 0){
                this.$message('审核成功');
              }
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            }); 
        this.dialogFormVisible = false;
        this.handleDelete(userId);
      },
      _isMobile() { //判断是手机还是PC
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
      },
      typeChange(){
        console.log(this.showType);
        // 通过判断this.showType发送不同的请求请求数据,给tableData赋值
        if(this.showType ==='0'){
          console.log("发送请求，待审核的数据 status='0'");
           let aData = {};
    // 发送请求，待审核的数据 status='0'
    this.$axios.get('/User/QueryAuditByStatus', {params: {Status: '0' }})
        .then( response=> {
          console.log(response.data);
          this.tableData = [];
          response.data.forEach(item => {
            aData.userId = item.userPart.id;
            aData.nickName = item.userPart.nickName;
            aData.name = item.userPart.name;
            aData.bindPhone = item.userPart.bindPhone;
            aData.educationId = item.eId;
            aData.time = item.time;
            aData.school = item.school;
            aData.degree = item.degree;
            aData.pictureA = item.pictureA;
            aData.pictureB = item.pictureB;
            aData.pictureC = item.pictureC;
            aData.pictureD = item.pictureD;
            aData.pictureE = item.pictureE;
            this.tableData.push(aData);
            aData = {};
            console.log(aData); 
          });
        })
        .catch(function (error) {
          console.log(error);
        }); 
        }
         else if (this.showType ==='1'){
           console.log("发送请求，已通过的数据 status='1'");
            let aData = {};
          this.$axios.get('/User/QueryAuditByStatus', {params: {Status: '1' }})
              .then( response=> {
                console.log(response.data);
                this.tableData = [];
                response.data.forEach(item => {
                  aData.userId = item.userPart.id;
                  aData.nickName = item.userPart.nickName;
                  aData.name = item.userPart.name;
                  aData.bindPhone = item.userPart.bindPhone;
                  aData.educationId = item.eId;
                  aData.time = item.time;
                  aData.school = item.school;
                  aData.degree = item.degree;
                  aData.pictureA = item.pictureA;
                  aData.pictureB = item.pictureB;
                  aData.pictureC = item.pictureC;
                  aData.pictureD = item.pictureD;
                  aData.pictureE = item.pictureE;
                  this.tableData.push(aData);
                  aData = {};
                  console.log(aData);
                });
              })
              .catch(function (error) {
                console.log(error);
              }); 
         }
           
           else if(this.showType ==='2'){
             console.log("发送请求，未通过的数据 status='2'");
             let aData = {};
            this.$axios.get('/User/QueryAuditByStatus', {params: {Status: '2' }})
                .then( response=> {
                  console.log(response.data);
                  this.tableData = [];
                  response.data.forEach(item => {
                    aData.userId = item.userPart.id;
                    aData.nickName = item.userPart.nickName;
                    aData.name = item.userPart.name;
                    aData.bindPhone = item.userPart.bindPhone;
                    aData.educationId = item.eId;
                    aData.time = item.time;
                    aData.school = item.school;
                    aData.degree = item.degree;
                    aData.pictureA = item.pictureA;
                    aData.pictureB = item.pictureB;
                    aData.pictureC = item.pictureC;
                    aData.pictureD = item.pictureD;
                    aData.pictureE = item.pictureE;
                    this.tableData.push(aData);
                    aData = {};
                    console.log(aData);
                    
                  });
                })
                .catch(function (error) {
                  console.log(error);
                }); 
           }
            
      }
    },
    mounted() {
      let aData = {};
    // 发送请求，待审核的数据 status='0'
    this.$axios.get('/User/QueryAuditByStatus', {params: {Status: '0' }})
        .then( response=> {
          console.log(response.data);
          response.data.forEach(item => {
            aData.userId = item.userPart.id;
            aData.nickName = item.userPart.nickName;
            aData.name = item.userPart.name;
            aData.bindPhone = item.userPart.bindPhone;
            aData.educationId = item.eId;
            aData.time = item.time;
            aData.school = item.school;
            aData.degree = item.degree;
            aData.pictureA = item.pictureA;
            aData.pictureB = item.pictureB;
            aData.pictureC = item.pictureC;
            aData.pictureD = item.pictureD;
            aData.pictureE = item.pictureE;
            this.tableData.push(aData);
            aData = {};
            console.log(aData);
            
          });
        })
        .catch(function (error) {
          console.log(error);
        }); 
  },
  }
</script>

<style scope>
* {
    margin: 0px;
    padding: 0px;
 }
 
.image_PC {
   display: inline-block;
    width: 46%;
    margin: 0 auto;
}  
.image_phone {
   display: block;
}
.image_back {
   display: inline-block;
    width: 46%;
    margin: 0 auto;
}

.el-dialog__header {
    padding: 20px 20px 10px;

}
.el-table thead {
    background-color: #ccc;
    font-weight: 700;
}
.el-table th {
    background-color: #fff;
} 

</style>