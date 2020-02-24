<template>
    <div style="width:100%;max-height:91vh">
      <div style="max-height:5vh;margin-top:1vh">
        <!-- 选择不同的审核状态，改变表格的数据 -->
        <div style="float:left;margin-left:3%;width:8%">
           <el-select v-model="showType" size="mini" @change="typeChange" placeholder="待审核">
             <el-option label="已通过" value="1">  </el-option>
             <el-option label="待审核" value="0">  </el-option>
             <el-option label="未通过" value="2">  </el-option>
            </el-select>
        </div>
        <!-- 搜索框 -->
        <div style="float:left;margin-left:4%;width:12%">
          <el-input v-model="search" prefix-icon="el-icon-search" size="mini" placeholder="输入关昵称/姓名搜索"/>
        </div>
      </div>
      <el-container style="width:100%">
      <el-table
          :data="tableData.filter(data => !search || data.nickName.toLowerCase().includes(search.toLowerCase()) ||data.name.toLowerCase().includes(search.toLowerCase()) )"
          style="width: 100%;max-height:91vh;"
          height="87vh"
          border
          stripe >
          <el-table-column label="昵称" prop="nickName"></el-table-column>
          <el-table-column label="公司" prop="company"></el-table-column>
          <el-table-column label="职位" prop="position"></el-table-column>
          <el-table-column label="手机号" prop="bindPhone"></el-table-column>
          <el-table-column label="时间" prop="time"></el-table-column>
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
              公司:{{this.openDialogData.company}}&nbsp;职位:{{this.openDialogData.position}}&nbsp;
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
        <el-button v-if="showType!='2'" @click="disPass(openDialogData.positionId,openDialogData.userId)">不通过</el-button>
        <el-button v-if="showType!='1'" type="primary" @click="pass(openDialogData.positionId,openDialogData.userId)">通过</el-button>
    </div>
    </el-dialog>


    </div>
</template> 

<script>
  export default {
    data() {
      return {
          search: '', //搜索框输入的
          dialogFormVisible: false,  //控制显示弹出框
          showType:'0',
          tableData: [{
          userId:'1',
          nickName:'小明',
          time: '2020-02-22',
          name: '1',
          bindPhone: '13479445697',
          positionId:'1',
          company:'华为',
          position:'java工程师',
          pictureA: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          pictureB: 'http://5b0988e595225.cdn.sohucs.com/images/20171103/ac2da7fba0d447ff8565b81694b4da5d.jpeg',
          pictureC: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          pictureD: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          pictureE: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        },{
          userId:'2',
          nickName:'小红',
          time: '2020-02-01',
          name: '1',
          bindPhone: '15879804785',
          positionId:'2',
          company:'联想',
          position:'运维',
          pictureA: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          pictureB: 'http://5b0988e595225.cdn.sohucs.com/images/20171103/ac2da7fba0d447ff8565b81694b4da5d.jpeg',
          pictureC: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          pictureD: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          pictureE: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        },{
          userId:'2',
          nickName:'小毛',
          time: '2020-02-01',
          name: '1',
          bindPhone: '15879804785',
          positionId:'2',
          company:'华腾地毯有限公司',
          position:'软件开发工程师',
          pictureA: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          pictureB: 'http://5b0988e595225.cdn.sohucs.com/images/20171103/ac2da7fba0d447ff8565b81694b4da5d.jpeg',
          pictureC: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          pictureD: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          pictureE: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        },{
          userId:'2',
          nickName:'小黑',
          time: '2020-02-01',
          name: '1',
          bindPhone: '15856132574',
          positionId:'2',
          company:'昌荣传媒',
          position:'H5页面工程师',
          pictureA: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          pictureB: 'http://5b0988e595225.cdn.sohucs.com/images/20171103/ac2da7fba0d447ff8565b81694b4da5d.jpeg',
          pictureC: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          pictureD: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          pictureE: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        },{
          userId:'2',
          nickName:'小白',
          time: '2020-02-01',
          name: '1',
          bindPhone: '15875124885',
          positionId:'2',
          company:'腾讯',
          position:'PHP高级研发工程师',
          pictureA: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          pictureB: 'http://5b0988e595225.cdn.sohucs.com/images/20171103/ac2da7fba0d447ff8565b81694b4da5d.jpeg',
          pictureC: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          pictureD: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          pictureE: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        },{
          userId:'2',
          nickName:'小红',
          time: '2020-02-01',
          name: '1',
          bindPhone: '15874682785',
          positionId:'2',
          company:'联想',
          position:'运维',
          pictureA: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          pictureB: 'http://5b0988e595225.cdn.sohucs.com/images/20171103/ac2da7fba0d447ff8565b81694b4da5d.jpeg',
          pictureC: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          pictureD: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          pictureE: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        },{
          userId:'2',
          nickName:'小红',
          time: '2020-02-01',
          name: '1',
          bindPhone: '15879804785',
          positionId:'2',
          company:'联想',
          position:'运维',
          pictureA: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          pictureB: 'http://5b0988e595225.cdn.sohucs.com/images/20171103/ac2da7fba0d447ff8565b81694b4da5d.jpeg',
          pictureC: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          pictureD: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          pictureE: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        },
        ],
        openDialogData:{  //弹出框显示的数据
          userId:'',  //用户id
          nickName:'',  //昵称
          name: '',   //姓名
          bindPhone: '',  //手机号
          positionId:'', //职位的id
          time: '',   //认证上传时间
          company:'',  //公司
          position:'',  //职位
          pictureA: '', //图片
          pictureB: '',
          pictureC: '',
          pictureD: '',
          pictureE: '',
        },
        
      }
    },
    methods: {
      handleDelete(row) {
        //console.log(row.userId);
        let index1 = this.tableData.findIndex(item=>{	//index1为userId所在的索引
										if(item.userId == row.userId)
									    	return true;
							})
        this.tableData.splice(index1,1);
      },
      open(){
          console.log("显示身份证的弹框显示");
      },
      close(){
          console.log("显示身份证的弹框被关闭");
      },
      openDialog(index,row){
          console.log(row);
          this.openDialogData = row;
          console.log("this.openDialogData"+this.openDialogData);
          this.dialogFormVisible = true;
      },
      disPass(positionId,userId){
        console.log("不通过的positionId为"+positionId);
        //发送不通过审核的id
        this.dialogFormVisible = false;
        this.handleDelete(userId);
      },
      pass(positionId,userId){
        console.log("通过的positionId为"+positionId);
        //发送通过审核的id
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
        if(this.showType ==='0')
         console.log("发送请求，待审核的数据 status='0'");
         else if (this.showType ==='1')
           console.log("发送请求，已通过的数据 status='1'");
           else if(this.showType ==='2')
            console.log("发送请求，未通过的数据 status='2'");
      }
    },
    mounted() {
    // 发送请求，待审核的数据 status='0'
    // this.$axios.post('', {
    //       name: '0',  
    //     })
    //     .then(function (response) {
    //       console.log(response);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     }); 
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
    background-color: #ffffff;
} 
</style>