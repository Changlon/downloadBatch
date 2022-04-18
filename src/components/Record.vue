<template>
      <div>
       
      </div>
</template>

<script>

export default {
    name:"Record",
    setup() {

    }, 
    mounted() { 
        
        // this.downRow("http://y4157921z1.wicp.vip/assets/logo.35c123ec.png")
        // https://vd4.bdstatic.com/mda-kahkamit6zzx1yrx/sc/mda-kahkamit6zzx1yrx.mp4 
        
    },
    methods :{
//传进来一个资源的url
    downRow(data) {
        
        let ajax= new XMLHttpRequest();
        ajax.open('GET', data, true);
        ajax.responseType = 'blob';
        // ajax.withCredentials = true;//如果跨域
        ajax.onload = function (oEvent) {
            let content = ajax.response;
            let a = document.createElement('a');
            a.download = 'recording.png';
            a.style.display = 'none';
            let blob = new Blob([content]);
            a.href = URL.createObjectURL(blob);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        };
        ajax.send();
    },

    }
} 

</script>


<style>

</style>