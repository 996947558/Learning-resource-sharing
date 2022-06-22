<template>
  <div class="panel">
<mu-container style="text-align:left;">
  文章标题：<mu-text-field v-model="title"></mu-text-field><br/>
  文章内容：<mu-text-field v-model="content" multi-line :rows="4" full-width></mu-text-field><br/>
  上传图片：<input type="file" ref="img"><br/><br/>
  上传资源：<input type="file" ref="resources"><br/>
  <mu-button color="primary" style="margin:50px 30px 0 400px" @click="createPassage()">提交</mu-button>
  <mu-button color="success" @click="toArticleSystem()">返回</mu-button>
</mu-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
        title:'',
        content:'',
        id:'',
    }
  },
  methods: {
    toArticleSystem() {
        this.$router.push('/system/articleSystem')
    },
    createPassage() {
    var _this=this;
    axios.post('/admin/createPassage?content='+this.content+'&title='+this.title).then(
        function(res) {
        //console.log(res.data);
        _this.id = res.data.substr(44);
        //console.log(_this.id);
        let resources = _this.$refs.resources.files[0];
        //console.log(resources);
        if (resources!==undefined) {
            let formDataOne = new FormData();
            formDataOne.append('file', _this.$refs.resources.files[0]);
            formDataOne.append('passageID', _this.id)
            axios.post('/admin/uploadResources', formDataOne, {
              headers:{
            'Content-Type':'multipart/form-data',
              }
            }).then(res=>{
                console.log(res);
            })
        };
        let img = _this.$refs.img.files[0];
        if (img !== undefined) {
            let formData = new FormData();
            formData.append('file', _this.$refs.img.files[0]);
            formData.append('passageID', _this.id)
            axios.post('/admin/uploadImg', formData, {
              headers:{
            'Content-Type':'multipart/form-data',
              }
            }).then(res=>{
                console.log(res);
            })
        };
        }
        )
        .catch();
      alert('新建文章成功')
    },
  }
}
</script>

<style>
.panel {
    background-color: #fff;
    width: 83%;
    position: absolute;
    height: 100%;
    right: 20px;
    border-radius: 5px;
}
</style>