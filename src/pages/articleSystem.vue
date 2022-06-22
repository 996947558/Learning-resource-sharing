<template>
  <div>
    <mu-paper :z-depth="1"  class="panel">
        <mu-button color="primary" style="float:left;margin:10px 0 10px 10px" @click="toCreateAndRevise">创造新的文章</mu-button>
        <div style="float:right;margin:20px 10px 10px 0">文件总数：{{TotalFileCount}}</div>
        <div class="clear"></div>
        <mu-data-table :columns="columns" :data="articles">
        <template slot-scope="scope">
            <td class="classB">{{scope.row.title}}</td>
            <td class="classB">{{scope.row.content}}</td>
            <td>{{scope.row.time}}</td>
            <td>
              <a href="javascript:;" @click="deletePassage(scope.row.id)">删除</a> / 
              <a href="javascript:;" @click="toupdatePassage(scope.row.id)" style="color:blue">修改</a>
            </td>
        </template>
        </mu-data-table>
        <mu-pagination raised :total="articlesCount" :current.sync="current" style="justify-content: center;margin-top: 10px;"></mu-pagination>
    </mu-paper>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
    TotalFileCount:'',
    articles:[],
    current: 1,
    articlesCount:0,
    classB:'classB',
    columns: [
        { title: '标题', name: 'title', width: 200,},
        { title: '内容', name: 'content', width: 620},
        { title: '时间', name: 'time', width: 220},
        { title: '操作', name: 'operate', width: 200},
    ],
    }
  },
  methods: {
  getAllPassage() {
    var _this=this;
    axios.get('/passage/queryAllPassage?pageNo='+_this.current+'&pageSize=10').then(
      res => {
        //console.log(res);
        _this.articles=res.data.passageItem;
        _this.articlesCount=res.data.passageItemCount;
      },
      error => {
        alert('网络繁忙，请稍后再试')
        console.log(error);
      }
      )

  },
  queryPassageByCommentCount() {
    axios.post('/admin/queryPassageByCommentCount').then(
      function(res) {
        //console.log(res);
      }
      )
  },
  deletePassage(res) {
    axios.post('/admin/deletePassage?passageID='+res).then(
      function(data) {
        //console.log(data);
        if(data.data === 'isOk') {
            alert('删除成功')
            location.reload()
        }
      }
      )
      .catch();
  },
  toCreateAndRevise() {
  this.$router.push('/system/create')
  },
  toupdatePassage(data) {
  this.$router.push('/system/revise')
  localStorage.setItem('id',data);
  },
  queryTotalFileCount() {
    var _this = this;
    axios.post('/admin/queryTotalFileCount').then(
      function(data) {
        //console.log(data.data);
        _this.TotalFileCount=data.data;
      }
      )
      .catch();
  }
  },
  mounted() {
    this.getAllPassage();
    this.queryPassageByCommentCount();
    this.queryTotalFileCount();
  },
  watch:{
    current:{
      handler:'getAllPassage'
    }
  },
};
</script>

<style scoped>
.panel {
    background-color: #fff;
    width: 83%;
    position: absolute;
    height: 100%;
    right: 20px;
    border-radius: 5px;
}
.classB {
  text-align:left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; 
}
.clear {
  clear:both;
}
</style>