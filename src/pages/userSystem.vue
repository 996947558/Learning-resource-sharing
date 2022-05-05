<template>
  <div>
    <mu-paper :z-depth="1"  class="panel">
      <div class="box">
        <mu-text-field v-model="value" placeholder="请输入用户名" style="margin: 0 0 0 10px;padding: 4px 0 0;"></mu-text-field>
        <i class="fa fa-search search" @click="queryArticle"></i>
      </div>
      <div class="clear"></div>
        <mu-data-table :columns="columns" :data="user">
        <template slot-scope="scope">
            <td>{{scope.row.userId}}</td>
            <td>{{scope.row.username}}</td>
            <td>{{scope.row.password}}</td>
        </template>
        </mu-data-table>
        <mu-pagination raised :total="userCount" :current.sync="current" style="justify-content: center;margin-top: 10px;"></mu-pagination>
    </mu-paper>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      user:[],
      userCount:0,
      current:1,
      columns: [
          { title: 'userId', width: 420, name: 'userId',},
          { title: 'username', name: 'username', width: 420},
          { title: 'password', name: 'password', width: 420},
      ],
      value:'',
    }
  },
  methods: {
    getAllUser() {
      var _this=this;
      axios.post('/admin/queryAllUser?pageNo='+_this.current+'&pageSize=10').then(
            function(res) {
              //console.log(res.data[1].substr(3,1));
              _this.user=res.data[0];
              _this.userCount=Number(res.data[1].substr(3,1)*10);
            }
            )
            .catch();
    },
    queryArticle() {
      let _this=this;
      axios.post('/admin/queryUserInfoByName?name='+_this.value).then(
        function(data) {
          if (data.data === '') {
            alert('查无该用户')
          } else {
            alert('该用户存在，\nID：'+data.data.userId+'\n用户名：'+data.data.username+'\n密码：'+data.data.password)
          }
        }
      ).catch();
    }
  },
  mounted() {
   this.getAllUser();
  },
  watch:{
    current:{
      handler:'getAllUser'
    }
  },
};
</script>

<style scoped>
a {
  color: blue;
}
.panel {
    background-color: #fff;
    width: 83%;
    position: absolute;
    height: 100%;
    right: 20px;
    border-radius: 5px;
}
.box {
  float: left;
}
.clear {
  clear:both;
}
.search {
  font-size:24px;
  color:rgba(0, 0, 0, 0.54);
  cursor: pointer;
}
</style>