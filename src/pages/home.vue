<template>
  <div>
    <div class="e"></div>
    <mu-container class="demo-container">
      <mu-row gutter>
        <!-- 文章合集 -->
        <mu-col span="8"><div class="grid-cell">
          <ul>
            <li v-for="item in articles" :key="item.id" @click="busFun(item.id)">
              <div :class="classOne">
              <h2 :class="classA">{{item.title}}</h2>
              <div :class="classB">{{item.content}}</div>
                <div style="position: absolute;bottom:0px;right:0px">
                  {{item.time}}
                </div>
              </div>
              <mu-divider></mu-divider>
            </li>
          </ul>
          <mu-pagination :total="articlesCount" :current.sync="current" style="justify-content: center;padding:10px 0 30px"></mu-pagination>
        </div></mu-col>
        <!-- 右边 -->
        <mu-col span="4"><div class="grid-cell" style="background-color: #fff">
          <!-- 公告 -->
          <div style="background-color: #fff;border-radius: 10px;margin-bottom: 20px;">
            <h2 style="text-align:left;"><i class="fa fa-bullhorn"></i>本站公告</h2>
            <mu-divider></mu-divider>
            <ul>
              <li v-for="item in notice" :key="item.id">
                <h3 style="margin-bottom: 10px;text-align:left;" :class="classB"><i class="fa fa-caret-right"></i> {{item.content}}</h3>
              </li>
            </ul>
          </div>
          <!-- 留言 -->
          <div style="background-color: #fff;border-radius: 10px;">
            <h2 style="text-align:left;"><i class="fa fa-bars"></i>用户留言</h2>
            <mu-divider></mu-divider>
            <ul>
              <li v-for="item in comment" :key="item.id">
                <div style="height:40px;text-align:left;position: relative;" :class="classB">
                  <i class="fa fa-address-book"></i>
                  留言：{{item.content}}
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
import bus from "../api/bus.js"

export default {
name:'home',
data() {
  return {
    token:'',
    username:'',
    articles:[],
    notice:[],
    comment:[],
    classOne: 'one',
    classA:'classA',
    classB:'classB',
    current: 1,
    currenttwo:1,
    articlesCount:0,
    commentCount:0,
    id:'',
    value: '',
  }
},
methods:{
  getAllPassage() {
    var _this=this;
    axios.get('/passage/queryAllPassage?pageNo='+_this.current+'&pageSize=10').then(
      function(res) {
        //console.log(res);
        _this.articles=res.data.passageItem;
        _this.articlesCount=res.data.passageItemCount;
      }
      )
      .catch();
  },
  getNotice() {
  var _this=this;
  axios.get('/notice/queryNotice').then(
      function(res) {
        //console.log(res.data);
        _this.notice=res.data;
      }
      )
      .catch();
  },
  getComment() {
  var _this=this;
  axios.post('/hallComment/queryAllHallComment?pageNo='+_this.currenttwo+'&pageSize=10').then(
      function(res) {
        //console.log(res.data[2]);
        _this.comment=res.data[0];
        _this.commentCount=Number(res.data[2].substr(4,1)*10);
        //console.log(_this.commentCount);
      }
      )
      .catch();
  },
  busFun(data) {
    //console.log(data);
    this.$router.push({path:"/detailss"})
    this.$nextTick(function () { //解决第一次监听不到数据
       bus.$emit('id', data);
     })
    localStorage.setItem('id',data);

  },
  getUserComment() {
    axios.post('/hallComment/createHallComment?content='+this.value).then(
        function() {
          location.reload()
        }
        )
        .catch();
  }
},
watch:{
  current:{
    handler: 'getAllPassage'
  },
  currenttwo:{
    handler:'getComment'
  }
},
mounted() {
    this.token = localStorage.getItem("token");
    this.username = localStorage.getItem("username");
    this.getAllPassage();
//mounted并不会等这次请求结束才去执行，而是直接就去执行，而此时data中的值还没有被赋值，所以拿不到。于是，手动添加延时
   this.getNotice();
   this.getComment();
},
}
</script>

<style lang="less">
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
.one {
  height: 100px;
  width: 100%;
  background-color: #fff;
  position: relative;
}
.one:hover::before {
  display: block;
  cursor:pointer;
}
.one::before {
  content: "";
  position: absolute;
  display: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.02);
}
.classA {
text-align:left;
}

.classB {
  text-align:left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; 
}
</style>