<template>
    <div>    
         <!-- 表格 -->
    <div style="width: 100%;min-height:80vh;">
        <el-table :data="TableDatafilter( )"  style="width: 100%;">
          <el-table-column label="昵称" prop="nickName"> </el-table-column>
          <el-table-column label="手机号" prop="bindPhone"> </el-table-column>
          <el-table-column label="是否实名" prop="isRealName"> </el-table-column>
          <el-table-column label="是否职位认证" prop="idRealJob"> </el-table-column>
          <el-table-column label="注册时间" prop="registration_time"> </el-table-column>
            <!-- <el-table-column label="Date" prop="date"> </el-table-column>
            <el-table-column label="Name" prop="name"> </el-table-column> -->
            <el-table-column align="right">
            <template slot="header" slot-scope="scope">
                 <el-input v-model="search" prefix-icon="el-icon-search" size="mini" placeholder="输入关昵称/姓名搜索"/>
                <!-- <el-input  v-model="search" prefix-icon="el-icon-search" size="mini" placeholder="输入关键字搜索11"/> -->
            </template>
            <template slot-scope="scope">
                 <el-button size="mini" type="danger" @click="stopAccount(scope.$index, scope.row)">停用</el-button>
                <el-button size="mini" @click="opendialog(scope.$index, scope.row)">修改密码</el-button>
               
            </template>
            </el-table-column>
        </el-table>
    </div>

         <!-- 分页  -->
         <div style="">
            <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            layout="total, prev, pager, next, jumper"
            :total="datalength">
            </el-pagination>
        </div> 
      <!-- 修改密码的框 -->
      <el-dialog :title=this.currentRow.nickName :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="form.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="form.checkPass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="alterPassword">修 改</el-button>
      </div>
    </el-dialog>


        </div>
</template>
<script>
export default {
    data() {
      return {
        form: { pass: '', checkPass: '', },
        dialogFormVisible:false,  //控制修改密码的弹出框
        currentPage: 1, //当前页
        currnetAllDataNum:0,  
         search: '',
         currentRow:{}, //当前行的信息
        tableData: [{   //显示在表格的数据
          userId:'1', //用户id
          bindPhone:'1',  //绑定手机号
          nickName:'1', //昵称
          isRealName:'1', //是否实名
          idRealJob:'1',  //是否职位认证
          registration_time:'1',  //注册时间
        }, {
          userId:'2',
          bindPhone:'2',
          nickName:'2',
          isRealName:'2',
          idRealJob:'2',
          registration_time:'2',
        }, {
         userId:'3',
          bindPhone:'3',
          nickName:'3',
          isRealName:'3',
          idRealJob:'3',
          registration_time:'3',
        }, {
          userId:'4',
          bindPhone:'4',
          nickName:'4',
          isRealName:'4',
          idRealJob:'4',
          registration_time:'4',
        }, {
          userId:'5',
          bindPhone:'5',
          nickName:'5',
          isRealName:'5',
          idRealJob:'5',
          registration_time:'5',
        }, {
          userId:'6',
          bindPhone:'6',
          nickName:'6',
          isRealName:'6',
          idRealJob:'6',
          registration_time:'6',
        }, {   
          userId:'1',
          bindPhone:'1',
          nickName:'1',
          isRealName:'1',
          idRealJob:'1',
          registration_time:'1',
        }, {
          userId:'2',
          bindPhone:'2',
          nickName:'2',
          isRealName:'2',
          idRealJob:'2',
          registration_time:'2',
        }, {
         userId:'3',
          bindPhone:'3',
          nickName:'3',
          isRealName:'3',
          idRealJob:'3',
          registration_time:'3',
        }, {
          userId:'4',
          bindPhone:'4',
          nickName:'4',
          isRealName:'4',
          idRealJob:'4',
          registration_time:'4',
        }, {
          userId:'5',
          bindPhone:'5',
          nickName:'5',
          isRealName:'5',
          idRealJob:'5',
          registration_time:'5',
        }, {
          userId:'6',
          bindPhone:'6',
          nickName:'6',
          isRealName:'6',
          idRealJob:'6',
          registration_time:'6',
        },{
         userId:'1',
          bindPhone:'1',
          nickName:'1',
          isRealName:'1',
          idRealJob:'1',
          registration_time:'1',
        }, {
          userId:'1',
          bindPhone:'1',
          nickName:'1',
          isRealName:'1',
          idRealJob:'1',
          registration_time:'1',
        }],
       
      };
    },
    methods: {
      handleCurrentChange(val) {    //当前页改变会触发的函数
        //console.log(val);
        console.log(`当前页: ${val}`);
        this.currentPage = val;
      },
      opendialog(index, row) {   //
        //console.log(index, row);
        this.currentRow = row;  //把当前行的信息赋值给data的currentRow，给后面的修改密码的函数用
        this.dialogFormVisible = !this.dialogFormVisible;
      },
      alterPassword(){
        if(this.form.pass===''){
          this.$message('请填写完整');
        }
        else if(this.form.pass!=this.form.checkPass){
          this.$message('密码不一致');
        }
         else {
            
            this.dialogFormVisible = !this.dialogFormVisible;
            console.log("当前用户信息");console.log(this.currentRow);
            console.log("密码"+this.form.pass);
            //  发送修改密码的请求
          }
        this.form.pass = this.form.checkPass = '';
      },
      stopAccount(index, row) { //停用账户
        //console.log(index);
        console.log(row);
        //通过row的信息的某个属性发送请求，删除一行数据
        this.$notify({
          title: '提示',
          message: row.nickName+'停用成功',
          type: 'success'
        });
        this.tableData.splice((this.currentPage-1)*10 + index,1);   //点击停用账号后删除列表的一行
      },
      TableDatafilter(){ //控制表格的数据显示，实现搜索和分页
         if(!this.search){   //搜索框为空
              return  this.tableData.slice((this.currentPage-1)*10,this.currentPage*10) ;     
         }
         else{  //搜索框不为空
           console.log(this.search);
            let newtableData = [];
            this.tableData.forEach(item=>{
                if(item.nickName.indexOf(this.search) != -1){    //搜索符合条件的，组成新的数组
                    newtableData.push(item)
                }
                })
             this.currnetAllDataNum = newtableData.length;    //设置分页中的数组条数
             this.currentPage = 1;
            return newtableData.slice((this.currentPage-1)*10,this.currentPage*10)
         }
            
        },

    },
    filters:{   //好像不能用this.currentPage   要在过滤器里面传参
        
    },
    computed:{
        datalength(){
            if(!this.search)    //没搜索，分页的数据条数为总数
                 return this.tableData.length;
            else{   //有搜索，分页的数据条数为搜索出来的条数
                return this.currnetAllDataNum;
            }
        }
    }
    
}
</script>

<style scope>
ul {
    width: auto;
}

</style>