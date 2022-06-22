<template>
  <div class="panel">
<mu-container style="text-align:left;">
  <mu-row gutter>
    <mu-col span="8"><div class="grid-cell">
      文章标题：<mu-text-field v-model="title"></mu-text-field><br/>
      文章内容：<mu-text-field v-model="content" multi-line :rows="4" full-width></mu-text-field><br/>
      <div class="img show" v-show="img !== ''"><img :src='imgUcl' alt="" height="100px"><i class="fa fa-times" style="color:red;font-size: 26px;cursor:pointer;margin-left:10px;" @click="deleteImg()"></i></div>
      <div v-show="img == ''">上传图片：<input type="file" ref="img"></div><br/><br/>
      <div>上传资源：<input type="file" ref="resources"><br/></div>
      <div class="resources" v-show="address !== ''">已存在资源：
      <br/>
      <ul>
        <li v-for="item in address" :key="item.id">
          {{item.address.replace(/(.*\/)*([^.]+).*/ig,"$2")+'.'+item.address.replace(/.+\./,"")}}<i class="fa fa-times" style="color:red;font-size: 26px;cursor:pointer;margin-left:10px;" @click="deleteResources()"></i>
        </li>
      </ul>
      </div>
      <mu-button color="primary" style="margin:50px 30px 0 200px" @click="updatePassage()">提交</mu-button>
      <mu-button color="success" @click="toArticleSystem()">返回</mu-button>
    </div></mu-col>
    <mu-col span="4"><div class="grid-cell">
          <div style="background-color: #fff;border-radius: 10px;">
            <h2 style="text-align:left;"><i class="fa fa-bars"></i>用户留言</h2>
            <mu-divider></mu-divider>
            <ul>
              <li v-for="item in comment" :key="item.id">
                <div style="height:40px;text-align:left;position: relative;">
                  <i class="fa fa-address-book"></i>
                  {{item.username}}：{{item.content}}
                  <a href="javascript:;" style="float:right" @click="deleteComment(item.commentID)">X</a>
                  <div style="position: absolute;bottom:0px;right:0px">
                    {{item.time}}
                  </div>
                </div>
                <mu-divider></mu-divider>
              </li>
            </ul>
            <mu-pagination raised :total="commentCount" :current.sync="currenttwo" style="justify-content: center;"></mu-pagination>
            <mu-text-field v-model="value" placeholder="请在这里留言" multi-line :rows="3" :rows-max="6" :max-length="100" full-width @keydown.enter="getUserComment()"></mu-text-field><br/>
          </div>

    </div></mu-col>
  </mu-row>
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
        comment:[],
        commentCount:0,
        currenttwo:1,
        getid:'',
        value:'',
        address:'',
        img:'',
        resourcesID:'',
        imgUcl:'11',
    }
  },
  methods: {
    getArticleDetails() {
    var _this=this
    axios.get('/passage/passageResources?passageID='+this.getid).then(
      res => {
        //console.log(res.data);
        _this.title = res.data[0].title;
        _this.content = res.data[0].content;
        //console.log(res.data[1][0].passageID);
        if(res.data[1][0] !== undefined) {
        //console.log(res.data[1]);
        //_this.address = res.data[1][0].address.replace(/(.*\/)*([^.]+).*/ig,"$2") +'.'+res.data[1][0].address.replace(/.+\./,"");
        _this.resourcesID = res.data[1][0].id;
        _this.address = res.data[1];
        //console.log(_this.address);
        }
        if(res.data[2] !== undefined) {

        //console.log(res.data[2]);
        let i='';
        for (i in res.data[2]) {
          //console.log(i); // 获取键
          _this.img = i.substr(6);
          //console.log(_this.img);
          _this.imgUcl = 'data:image/png;base64,'+res.data[2][i]; // 获取值
        }
        }
      },
      error => {
        alert('网络繁忙，请稍后再试')
        console.log(error);
      }
      )
    },
    queryCommentByPassageID() {
    var _this=this
    axios.get('/passage/queryCommentByPassageID?pageNo='+_this.currenttwo+'&pageSize=10&passageID='+this.getid).then(
      function(res) {
        _this.comment=res.data.slice(0,-1);
        let length = res.data.length;
        _this.commentCount=res.data[length-1].substring(3)*10;
      }
      )
      .catch();
    },
    getUserComment() {
    axios.post('/admin/createComment?content='+this.value+'&passageID='+this.getid).then(
        function() {
          location.reload()
          alert('发言成功')
        }
        )
        .catch();
    },
    deleteComment(res) {
      //console.log(res);
    axios.post('/admin/deleteComment?commentID='+res).then(
        res => {
          alert('删除成功')
          location.reload()
        },
        error => {
        alert('网络繁忙，请稍后再试')
        console.log(error);
        }
        )
    },
    toArticleSystem() {
        this.$router.push('/system/articleSystem')
    },
    updatePassage() {
    var _this=this
    var id = _this.getid;
    axios.post('/admin/updatePassage?content='+this.content+'&passageID='+id+'&title='+this.title).then(
        res => {
            //console.log(res);
        }
        )
    let resources = this.$refs.resources.files[0];
    if (resources!==undefined) {
        let formDataOne = new FormData();
        formDataOne.append('file', this.$refs.resources.files[0]);
        formDataOne.append('passageID', id)
        axios.post('/admin/uploadResources', formDataOne, {
          headers:{
         'Content-Type':'multipart/form-data',
          }
        }).then(res=>{
            console.log(res);
        })
    };
    let img = this.$refs.img.files[0];
    if (img !== undefined) {
        let formData = new FormData();
        formData.append('file', this.$refs.img.files[0]);
        formData.append('passageID', id)
        axios.post('/admin/uploadImg', formData, {
          headers:{
         'Content-Type':'multipart/form-data',
          }
        }).then(res=>{
            console.log(res);
        })
    };
    _this.$router.push('/system/articleSystem');
    },
    deleteResources() {
      var _this = this;
    axios.post('/admin/deleteResources?resourcesID='+_this.resourcesID).then(
        function(res) {
          //console.log(res);
          location.reload()
        }
        )
        .catch();
    },
    deleteImg() {
      var _this = this;
    axios.post('/admin/deleteImg?imgID='+_this.img).then(
        function(res) {
          //console.log(res);
          location.reload()
        }
        )
        .catch();
    },
  },
  mounted() {
    this.getid = localStorage.getItem("id");
    this.queryCommentByPassageID();
    this.getArticleDetails();
  },
  watch:{
    currenttwo:{
      handler:'queryCommentByPassageID'
    }
  },
}
</script>

<style scoped lang="less">
.demo-container {
  .row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .grid-cell {
    border-radius: 4px;
    height: 36px;
    background: rgba(255, 255, 255, 0.8);
  }
}
.demo-container.is-stripe .col:nth-child(2n) .grid-cell{
  background: rgba(0, 0, 0, 0.54);
}
.panel {
    width: 83%;
    position: absolute;
    height: 100%;

}
.img {
  font-size: 18px;
}
.resources {
  font-size: 18px;
}
</style>