<template>
  <div class="details">
    <el-button class="fanhui" @click="gohome">返回</el-button>
    <div class="content">
      <div class="title">标题：{{ fromData.name }}</div>
      <div class="parent">所属父级：{{ fromData.columnName }}</div>
      <div class="article">内容:{{ fromData.content }}</div>
    </div>
  </div>
</template>

<script>
import { detail } from "@/api/new-home.js";

export default {
  data() {
    return {
      fromData: {},
    };
  },
  created() {
    // console.log(this.$route.params);
    this.searchDetail();
  },
  methods: {
    gohome() {
      this.$router.push("/");
    },
    searchDetail() {
      detail({ id: this.$route.params.code }).then((res) => {
        console.log(res);
        this.fromData = res.body;
      });
    },
  },
};
</script>

<style scoped>
.fanhui {
  position: absolute;
  left: 16px;
  top: 16px;
}
.content {
  width: 100%;
}
</style>
