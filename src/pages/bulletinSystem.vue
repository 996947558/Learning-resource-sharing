<template>
  <div class="panel">
<span style="font-size:20px">发布公告：</span>
<mu-text-field v-model="value" multi-line :rows="4" style="width:500px;height: 200px;"></mu-text-field>
<br/>
  <mu-button color="primary" @click="upBulletin">提交</mu-button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      value:'',
    }
  },
  methods: {
    upBulletin() {
      //console.log(this.value);
      axios.post('/admin/updateNotice?content='+this.value).then(
            function() {
              alert("发布成功")
            }
            )
            .catch();
      this.value=''
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