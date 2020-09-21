<template>
  <!-- <div style="padding: 10px 20px"> -->
  <div>
    <el-tabs tab-position="right" v-model="activeName">
      <el-tab-pane class="header-tab-pan" label="详情页" name="detail">
        <detail></detail>
      </el-tab-pane>
      <el-tab-pane class="header-tab-pan" label="查询页" name="query">
        <query></query>
      </el-tab-pane>
    </el-tabs>

    <!-- <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-menu-item index="2">消息中心</el-menu-item>
      <el-menu-item index="4">订单管理</el-menu-item>
    </el-menu>
    <detail></detail>
    <query></query> -->
  </div>
</template>
<script>
import Query from "./Query";
import Detail from "./Detail";
export default {
  name: "Home",
  data() {
    return {
      activeName: "detail"
    };
  },
  components: {
    Query,
    Detail,
  },
  methods: {
    /*  */
  },
};
</script>
<style>
</style>
