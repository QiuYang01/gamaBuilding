<template>    
    <div>
        <div class="top">
            添加徽章:
         <el-input v-model="inputLabelName" autofocus="true" style="width:20%;margin:0 2%" placeholder="请输徽章名"></el-input>
         <el-button type="info" @click="addLabel">添 加</el-button>
        </div>
        <div class="bottom">
            <el-table
                :data="tableData"
                style="width: 80%;margin:0 auto;"
                stripe
                height="70vh">
                <el-table-column prop="name" label="徽章名"> </el-table-column>
                <el-table-column prop="icon" label="icon"> </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    >
                    <template slot-scope="scope">
                        <el-button @click.native.prevent="deleteLabel(scope.$index, scope.row)" type="text" size="small"> 移除
                        </el-button>
                        <el-button @click.native.prevent="alter(scope.$index, scope.row)" type="text" size="small"> 修改
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="width:80%;margin:0 auto;text-align:left;font-size: 14px;">标签总数：&nbsp;<span style="font-weight:700">{{this.tableData.length}}</span></div>
                    </div>
                </div>
</template>
<script>
export default {
    data() {
        return {
            inputLabelName:'',  //添加的标签名
            tableData: [{
                id:'0',
                icon: '科技',
                name: '1',
                remark:'',
                level:'',
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
</style>