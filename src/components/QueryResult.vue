<template>
  <div v-if="result && result.rows">
    <p>查询结果如下：</p>
    <div>共同找到{{result.rows.length}}条结果：</div>
    <div style="width:1000px">
      <el-table v-if="result.rows" :data="result.rows" border stripe style="width: 100%">
        <el-table-column
          v-for="(column, i) in result.columns"
          :key="column + i"
          :prop="column"
          :label="column"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  data: () => {
    return {};
  },
  props: ["result"],
  components: {},
  methods: {
    send() {
      this.axios
        .post("http://127.0.0.1:8888/", { query: this.input })
        .then((response) => {
          console.log(response.data);
        });
      return;
    },
  },
};
</script>