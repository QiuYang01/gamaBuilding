<template>
    <div style="width:100%;max-height:91vh">
      <div style="height:4vh">
        <!-- 选择不同的审核状态，改变表格的数据 -->
        <div style="float:left;margin-left:5%">
           <el-select v-model="showType" size="mini" @change="typeChange" placeholder="请选择审核类型">
             <el-option label="已通过" value="已通过">  </el-option>
             <el-option label="待审核" value="待审核">  </el-option>
             <el-option label="未通过" value="未通过">  </el-option>
            </el-select>
        </div>
        <!-- 搜索框 -->
        <div style="float:right;margin-right:5%">
          <el-input v-model="search"  size="mini" placeholder="输入关键字搜索"/>
        </div>
      </div>
      <el-container>
      <el-table
          :data="tableData.filter(data => !search || data.nickname.toLowerCase().includes(search.toLowerCase()) ||data.name.toLowerCase().includes(search.toLowerCase()) )"
          style="width: 100%;max-height:91vh;overflow:auto"
          stripe >
          <el-table-column label="昵称" prop="nickName"></el-table-column>
          <el-table-column label="手机号" prop="bindPhone"></el-table-column>
          <el-table-column label="时间" prop="time"></el-table-column>
          <el-table-column align="right">          
            <template slot-scope="scope"> <!--handleDelete(scope.$index, scope.row) -->
              <el-button size="mini"  type="danger" @click="openDialog(scope.$index, scope.row)">审核</el-button>
            </template>

          </el-table-column>
        </el-table>
      </el-container>

    
        <!-- 点击按钮后弹框显示身份证 -->
    <el-dialog :visible.sync="dialogFormVisible" @open="open" @close="close" width="80%"
       style="width:100%;margin:0 auto;">
            <template slot="title">
              昵称:{{this.openDialogData.nickName}}&nbsp;时间:{{this.openDialogData.time}}&nbsp;
            </template>
            <div :class="[this._isMobile() ? 'image_phone' : 'image_PC']" >
                <div class="demonstration">正面 id{{this.openDialogData.userId}}</div>
                <el-image :src="openDialogData.idPicturePront"> </el-image>
                <!-- <img :src="this.openDialogData.src" width="100%" alt="1" /> -->
            </div> 
             <div :class="[this._isMobile() ? 'image_phone' : 'image_PC']">
                <div class="demonstration">反面</div>
                <el-image :src="openDialogData.idPictureBack"> </el-image>
            </div> 
    <div slot="footer" class="dialog-footer">
        <el-button @click="disPass(openDialogData.userId)">不通过</el-button>
        <el-button type="primary" @click="pass(openDialogData.userId)">通过</el-button>
    </div>
    </el-dialog>


    </div>
</template> 

<script>
  export default {
    data() {
      return {
        showType:'',
        tableData: [{
          userId:'1',
          nickName:'1',
          time: '2016-05-02',
          name: '1',
          bindPhone: '15829801243',
          idPicturePront: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          idPictureBack: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        },{
          userId:'2',
          nickName:'2',
          time: '2016-05-02',
          name: '2',
          bindPhone: '15829180542',
          idPicturePront: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          idPictureBack: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        },
        ],
        openDialogData:{  //弹出框显示的数据
         userId:'',
          nickName:'',
          time: '',
          name: '',
          bindPhone: '',
          idPicturePront: '',
          idPictureBack: '',
        },
        search: '',
         dialogFormVisible: false,  //控制显示弹出框
      }
    },
    methods: {
      handleDelete(index, row) {
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
      disPass(userId){
        console.log("不通过的userid为"+userId);
        //发送不通过审核的id
      },
      pass(userId){
        console.log("通过的userid为"+userId);
        //发送通过审核的id
      },
      _isMobile() { //判断是手机还是PC
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
      },
      typeChange(){
        console.log(this.showType);
        // 通过判断this.showType发送不同的请求请求数据,给tableData赋值
      }
    },
    mounted() {
    // if (this._isMobile()) {
    //   alert("手机端");
    // } else {
    //   alert("pc端");
    // }
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

</style>