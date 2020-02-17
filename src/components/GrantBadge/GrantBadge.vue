<template>
 <div  style="width:100%;max-height:91vh;background-color: aliceblue;height:91vh;">
  <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
    @selection-change="handleSelectionChange"
     :default-sort = "{prop: 'lever', order: 'descending'}"> <!--默认排序 -->
    <!-- <el-table-column type="selection" width="55">
    </el-table-column> -->
    <el-table-column  prop="nickName" label="昵称" >
    </el-table-column>
    <el-table-column sortable prop="lever" label="等级" >
    </el-table-column>
    <el-table-column sortable prop="numProfession" label="专业回答数" show-overflow-tooltip>
    </el-table-column>
    <el-table-column label="操作">
     <template slot-scope="scope">  <!-- //加了slot-scope="scope"，后面就能用scope.row获取当前行的信息 -->
        <el-button
          size="mini"
          type="danger"
          @click="GrantBadge(scope.$index, scope.row)">授予徽章</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button>
  </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          userId: '1',
          nickName: '张三',
          lever: '2',
          numProfession: '1',
        },{
          userId: '2',
          nickName: '李四',
          lever: '1',
          numProfession: '3',
        }, {
          userId: '3',
          nickName: '邓五',
          lever: '3',
          numProfession: '2',
        }, ],
        multipleSelection: []
      }
    },

    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      GrantBadge(index,row){
          console.log(index);
          console.log(row);
      }
    }
  }
</script>

<style >

</style>