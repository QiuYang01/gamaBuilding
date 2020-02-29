<template>
    <div>
        <button @click="funnn">发请求1</button>
        <button @click="fun4">发请求</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
           article:{
                "id": 1,
                "author": "2212",
                "title": "手摸手教你开发spring boot",
                "content": "c",
                "createTime":"2020-02-14 21:56:1",
                "reader":[{"name":"zimug","age":18},{"name":"kobe","age":37}]
            } 
        }
    },
    methods:{
        funnn(){
            this.$axios({
              method:"get",
                url:'https://www.baidu.com/',
                // `data` 是作为请求主体被发送的数据
                //data: JSON.stringify(this.article),
                headers:{
                    'Content-Type':'application/json;charset=UTF-8'  
                }
            })
            .then(res=>{
                console.log(res);
            })
            .catch(Error=>{
                console.log(Error)
            })
        },
        fun1(){         //后台用@RequestBody接受整个article参数
            console.log("DSf");
            this.$axios({
              method:"post",
                url:'http://127.0.0.1:8888/rest/article',
                // `data` 是作为请求主体被发送的数据
                data: JSON.stringify(this.article),
                headers:{
                    'Content-Type':'application/json;charset=UTF-8'  
                }
            })
            .then(res=>{
                console.log(res);
            })
            .catch(Error=>{
                console.log(Error)
            })
        },
        fun2(){
            this.$axios({
              method:"post",
                url:'http://127.0.0.1:8888/rest/article',
                // `params` 是即将与请求一起发送的 URL 参数
                // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
                params: {
                    id: '12345',
                    author: 'sdf'
                },
                headers:{
                    'Content-Type':'application/json;charset=UTF-8'  
                }
              
            })
            .then(res=>{
                console.log(res);
            })
            .catch(Error=>{
                console.log(Error)
            })
        },
        fun3(){     //将数据下载URL里面，后端用@PathVariable Long id获取
            this.$axios({
              method:"delete",
                url:'http://127.0.0.1:8888/rest/article/'+ Number(4),
            })
            .then(res=>{
                console.log(res);
            })
            .catch(Error=>{
                console.log(Error)
            })

        },
        fun4(){       //同时拼接url和在body传参，后端用@PathVariable Long id, @RequestBody Article article获取
            this.$axios({
              method:"put",
                url:'http://127.0.0.1:8888/rest/article/'+ Number(3),
                data: JSON.stringify(this.article),
                headers:{
                    'Content-Type':'application/json;charset=UTF-8'  
                }
            })
            .then(res=>{
                console.log(res);
            })
            .catch(Error=>{
                console.log(Error)
            })

        },
        fun5(){       //同时拼接url和在body传参，后端用@PathVariable Long id, @RequestBody Article article获取
            this.$axios({
              method:"get",
                url:'http://127.0.0.1:8888/rest/article/'+ Number(3),
            })
            .then(res=>{
                console.log(res);
            })
            .catch(Error=>{
                console.log(Error)
            })

        },
    }
}
</script>