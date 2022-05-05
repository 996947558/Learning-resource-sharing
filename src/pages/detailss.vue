<template>
  <div>
    <div class="e"></div>
    <mu-container class="demo-container">
      <mu-row gutter>
        <!-- 文章合集 -->
        <mu-col span="8"><div class="grid-cell">
          <h2>{{title}}</h2>
          <div class="time">{{time}}</div>
          <mu-divider></mu-divider>
          <div class="content">
            {{content}}
          </div>
          <mu-divider></mu-divider>
          <div class="address">
            <ul> 
              <li v-for="item in address" :key="item.id">
                <a href="javascript:;" @click="downResources(item.address)">
                 {{item.address.replace(/(.*\/)*([^.]+).*/ig,"$2")+'.'+item.address.replace(/.+\./,"")}}
                </a>
              </li>
            </ul>
          </div>
          <mu-divider></mu-divider>
        </div></mu-col>
        <!-- 右边 -->
        <mu-col span="4"><div class="grid-cell" style="background-color: #fff">
          <!-- 留言 -->
          <div style="background-color: #fff;border-radius: 10px;">
            <h2 style="text-align:left;"><i class="fa fa-bars"></i>用户留言</h2>
            <mu-divider></mu-divider>
            <ul>
              <li v-for="item in comment" :key="item.id">
                <div style="height:40px;text-align:left;position: relative;">
                  <i class="fa fa-address-book"></i>
                  {{item.username}}：{{item.content}}
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
  name:'detailss',
  data() {
    return {
      getid:0,
      title:'标题',
      time:'2022-04-27 02:30:20',
      content:'内容',
      current: 1,
      comment:[],
      commentCount:0,
      currenttwo:1,
      value:'',
      userId:'',
      address:'',
    }
  },
  methods:{
    getArticleDetails() {
    var _this=this
    axios.get('/passage/passageResources?passageID='+this.getid).then(
      function(res) {
        //console.log(res.data);
        _this.title = res.data[0].title;
        _this.time = res.data[0].time;
        _this.content = res.data[0].content;
        //console.log(res.data[1][0]);
        if(res.data[1][0] !== undefined) {
        _this.address = res.data[1];
        }

      }
      )
      .catch();
    },
    queryCommentByPassageID() {
    var _this=this
    axios.get('/passage/queryCommentByPassageID?pageNo='+_this.currenttwo+'&pageSize=10&passageID='+this.getid).then(
      function(res) {
        _this.comment=res.data.slice(0,-1);
        let length = res.data.length;
        _this.commentCount=res.data[length-1].substr(3,1)*10;
        //console.log(res.data.length);
        // console.log(_this.commentCount);
      }
      )
      .catch();
    },
    getUserComment() {
    axios.post('/comment/createComment?content='+this.value+'&passageID='+this.getid+'&userID='+this.userId).then(
        function() {
          alert('发言成功')
          location.reload()
        }
        )
        .catch();
    },
    downResources(data) {
    var _this=this
    _this.name=data.substr(49)
    // console.log(this.address);
    //console.log(this.name);
    axios.post('/passage/downResources?filePath='+data,data,{
        responseType: 'blob',
    }).then(
        function(res) {
          //console.log(res);
          let blob = new Blob([res.data]);
          let url = window.URL.createObjectURL(blob); // 创建一个临时的url指向blob对象
          let a = document.createElement("a");
          a.href = url;
          a.download = _this.name;
          a.click();
          // 释放这个临时的对象url
          window.URL.revokeObjectURL(url); 
          //fileDownload(res.data,_this.name)
        }
        )
        .catch();
    }
  },
  mounted() {
      //console.log(data);
      this.getid = localStorage.getItem("id");
      //console.log(this.getid);
      this.getArticleDetails();
      this.queryCommentByPassageID();
      this.userId = localStorage.getItem("userId");
  },
watch:{
  currenttwo:{
    handler:'queryCommentByPassageID'
  }
},
}
</script>

<style lang="less" scoped>
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

.e {
  height: 10px;
}

.time {
  text-align:left;
  color: #828282;
  background-color: #fff;
}
.content {
  text-align:left;
  text-indent:2em;
  background-color: #fff;
  min-height: 580px;
}
.address {
  background-color: #fff;
  text-align:left;
  text-decoration:underline;
}
a {
  color: blue;
}
</style>