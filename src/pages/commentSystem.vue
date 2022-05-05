<template>
  <div>
    <mu-paper :z-depth="1"  class="panel">
        <mu-data-table :columns="columns" :data="comment">
        <template slot-scope="scope">
            <td>{{scope.row.content}}</td>
            <td class="is-center">{{scope.row.time}}</td>
            <td class="is-center"><a href="javascript:;" @click="deleteComment(scope.row.id)">删除</a></td>
        </template>
        </mu-data-table>
        <mu-pagination raised :total="commentCount" :current.sync="currenttwo" style="justify-content: center;margin-top: 10px;"></mu-pagination>
    </mu-paper>
    
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      comment:[],
      commentCount:0,
      currenttwo:1,
      columns: [
          { title: '内容', width: 500, name: 'name' },
          { title: '时间', name: 'time', width: 500, align: 'center'},
          { title: '操作', width: 200, align: 'center'},
      ],
    }
  },
  methods: {
    getComment() {
    var _this=this;
    axios.post('/hallComment/queryAllHallComment?pageNo='+_this.currenttwo+'&pageSize=10').then(
        function(res) {
            //console.log(res.data[0]);
            _this.comment=res.data[0];
            _this.commentCount=Number(res.data[2].substr(4,1)*10);
            //console.log(_this.comment);
        }
        )
        .catch();
    },
    deleteComment(res) {
      axios.post('/admin/deleteHallComment?ID='+res).then().catch();
      location.reload();
    },
  },
  mounted() {
   this.getComment();
},
  watch:{
    currenttwo:{
      handler:'getComment'
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
</style>