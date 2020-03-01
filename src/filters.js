const formatTimer = function(str) {
    var date = new Date(str)
            var year = date.getFullYear().toString()
            var month = (date.getMonth()+1).toString()
            var day = date.getDate().toString()
            var hour = date.getHours().toString()
            var minute = date.getMinutes().toString().padStart(2,'0')
            var second = date.getSeconds().toString()
            return year +'-' + month +'-' + day +' '+ hour +':'+ minute +':' + second 

}
export {
    formatTimer
}
