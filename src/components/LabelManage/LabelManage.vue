<template>      <!--最大高度91vh-->
    <div>
        <div class="top">
            添加标签:
         <el-input v-model="inputLabelName" autofocus="true" style="width:20%;margin:0 2%" placeholder="请输标签名"></el-input>
         <el-button type="info" @click="addLabel">添 加</el-button>
        </div>
        <div class="bottom">
            <el-table
                :data="tableData"
                style="width: 80%;margin:0 auto;"
                stripe
                height="70vh">
                <el-table-column prop="content" label="标签名"> </el-table-column>
                <el-table-column prop="numQuote" label="引用次数"> </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    >
                    <template slot-scope="scope">
                        <el-button @click.native.prevent="deleteLabel(scope.$index, scope.row)" type="danger" size="small" > 移除
                        </el-button>
                        <el-button @click.native.prevent="openAlterDialog(scope.$index, scope.row)" type="info" size="small"> 修改
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="width:80%;margin:0 auto;text-align:left;font-size: 14px;">标签总数：&nbsp;<span style="font-weight:700">{{this.tableData.length}}</span></div>
        </div>
        <!-- //显示输入标签名的按钮 表示boolean要用属性绑定 -->
        <el-dialog
        :show-close = false     
        title="请输入标签名"
        :visible.sync="dialogVisible"
        width="30%"
        >
       <el-input v-model="alterLabeklName" autofocus="true" style="width:80%;margin:0 2%" placeholder="请输标签名"></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false;alterLabeklName='';">取 消</el-button>
            <el-button type="primary" @click=SureAlterLableName>确 定</el-button>
        </span>
        </el-dialog>


 </div>
</template>
<script>
export default {
    data() {
        return {
            dialogVisible: false,
            inputLabelName:'',  //添加的标签名
            alterLabeklName:'',    //修改的标签名
            currentLabel:{id:'',content:''},
            tableData: [{
                id:'0',
                content: '科技',
                numQuote: '1',
                },{
                id:'1',
                content: '生活',
                numQuote: '2',
                },{
                id:'2',
                content: '记录',
                numQuote: '3',
                },{
                id:'3',
                content: '科技',
                numQuote: '4',
                },{
                id:'4',
                content: '科技',
                numQuote: '5',
                },{
                id:'5',
                content: '科技',
                numQuote: '6',
                },{
                id:'6',
                content: '科技',
                numQuote: '7',
                },{
                id:'7',
                content: '科技',
                numQuote: '8',
                },{
                id:'8',
                content: '科技',
                numQuote: '9',
                },]
        }
    },
    methods: {
        addLabel(){
            if(!this.inputLabelName){
                this.$message('请输入标签名');
            }
            else{
                //发送添加标签的请求
                console.log("要添加的标签名为");
                console.log(this.inputLabelName);
               
            }
            this.inputLabelName = '';
            
        },
        deleteLabel(index,row){
            console.log("被删除标签的id");
            console.log(row.id);
            this.tableData.splice(index,1);
        },
        openAlterDialog(index,row){    //把被点击修改标签名对应的id保存
            this.dialogVisible = true;
            this.currentLabel.id = row.id;
        },
        SureAlterLableName(){   //提交修改的标签名
            if(this.alterLabeklName === ''){
                this.$message("请输入标签名");
            }
            else{
               
                console.log("输入的标签名,和id");
                console.log(this.alterLabeklName);
                console.log(this.currentLabel.id);
                this.alterLabeklName = '';
                 this.dialogVisible = false
            }
            
        }
    }
}
</script>
<style scope>
.top {
    
    max-height: 10vh;
    height: 10vh;
    text-align: left;
    line-height: 10vh;
    padding-left: 2%; 
    color: cadetblue;
    font-weight: 600;
}
.bottom {
    max-height: 77vh;
    height: 77vh;
    /* background-color: black */
    margin-top: 4vh;
    
}
.el-dialog__header {
    text-align: left;
    font-weight: 600;
    font-family: 'Courier New', Courier, monospace
}
</style>