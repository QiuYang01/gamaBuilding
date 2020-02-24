<template>
  <div class="shoowdata" style="width:100% ">
     <div class="pie" style="width:100%; ">
            <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
            <div class="mainnn" style="width:100%;height: 50vh"></div>
                <!-- 如果使用id后面的会覆盖前面的 -->
    </div>
  </div>
</template>

<script>
export default { // 显示结果的组件，画饼图，传入题目和选项和对应人数
  props:["userData"],
  data() {
    return {
    //   userData:[{  //发请求返回七天的数据，数组对象，每个对象有时间，提问数，回答数，文章数
    //     time:'',
    //     questionNumber:'13',
    //     answerNumber:'12',
    //     articleNumber :'21'
    //   },{  //发请求返回七天的数据，数组对象，每个对象有时间，提问数，回答数，文章数
    //     time:'',
    //     questionNumber:'22',
    //     answerNumber:'13',
    //     articleNumber :'22'
    //   },{  //发请求返回七天的数据，数组对象，每个对象有时间，提问数，回答数，文章数
    //     time:'',
    //     questionNumber:'33',
    //     answerNumber:'14',
    //     articleNumber :'23'
    //   },{  //发请求返回七天的数据，数组对象，每个对象有时间，提问数，回答数，文章数
    //     time:'',
    //     questionNumber:'44',
    //     answerNumber:'15',
    //     articleNumber :'24'
    //   },{  //发请求返回七天的数据，数组对象，每个对象有时间，提问数，回答数，文章数
    //     time:'',
    //     questionNumber:'22',
    //     answerNumber:'16',
    //     articleNumber :'25'
    //   },{  //发请求返回七天的数据，数组对象，每个对象有时间，提问数，回答数，文章数
    //     time:'',
    //     questionNumber:'22',
    //     answerNumber:'17',
    //     articleNumber :'26'
    //   },{  //发请求返回七天的数据，数组对象，每个对象有时间，提问数，回答数，文章数
    //     time:'',
    //     questionNumber:'22',
    //     answerNumber:'18',
    //     articleNumber :'27'
    //   }]
      
    }
  },
 mounted(){
    //console.log(this.userData);
    this.initData();
  },
  methods:{
    //初始化数据
    initData() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = this.$echarts.init(document.getElementsByClassName('mainnn')[0]);

        // 指定图表的配置项和数据
        let option = {
            grid: {
                // left:'20%'
                // width:'80%'
                // width: '80%'
            },
            title: {
                text: '新增\n数据统计 ',
                
               
            },
            tooltip: {},
           
            legend: {
                data:[{name:'提问数量',icon: 'circle',},
                {name:'回答数量',icon: 'circle',},
                {name:'文章数量',icon: 'circle',}]    //后面series的name属性与这个name对应
            },  
            xAxis: {
                 type: 'category',  
                 boundaryGap: false,     //x轴标在点上
                 data: [this.userData[0].time,this.userData[1].time,this.userData[2].time,this.userData[3].time,this.userData[4].time,this.userData[5].time,this.userData[6].time]
            },
            yAxis: {},
            series: [{
                
                name: '提问数量',
                type: 'line',icon: 'rect',
                data: [this.userData[0].questionNumber,this.userData[1].questionNumber,this.userData[2].questionNumber,this.userData[3].questionNumber,this.userData[4].questionNumber,this.userData[5].questionNumber,this.userData[6].questionNumber,],
            },{
                name: '回答数量',
                type: 'line',
                data: [this.userData[0].answerNumber,this.userData[1].answerNumber,this.userData[2].answerNumber,this.userData[3].answerNumber,this.userData[4].answerNumber,this.userData[5].answerNumber,this.userData[6].answerNumber,],
            },{
                name: '文章数量',
                type: 'line',
                data: [this.userData[0].articleNumber,this.userData[1].articleNumber,this.userData[2].articleNumber,this.userData[3].articleNumber,this.userData[4].articleNumber,this.userData[5].articleNumber,this.userData[6].articleNumber,],
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        setTimeout(function (){     //宽度自适应
	    window.onresize = function () {
	    	myChart.resize();
	    }
	},200)
    }

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mainnn{
   /* background-color: blue */
}
</style>
