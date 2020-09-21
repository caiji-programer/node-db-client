<template>
  <div class="detail">
    <div class="line">表及其相关信息:</div>
    <!-- <div  width="760px"> -->
    <div style="width: 760px">
      <el-table border :data="schemaData">
        <el-table-column prop="name" label="表名" width="180">
          <template slot-scope="scope">
            {{scope.row.name}}
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="primaryKey" label="主键" width="180"></el-table-column>
        <el-table-column prop="fields" label="字段信息"></el-table-column>
      </el-table>
    </div>
    <br />
    <br />
    <div v-if="sql">
      <div class="line">SQL: {{sql}}</div>
      <el-table v-if="result.rows" :data="result.rows" border stripe style="width: 80%">
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
  name: "Query",
  data() {
    return {
      schemaData: [],
      result: {},
      tableData: null,
      sql: "",
    };
  },
  components: {
    // HelloWorld,
  },
  methods: {
    handleClick(row) {
      console.log(row);

      this.sql = "select * from " + row.name + ";";
      this.axios
        .post("http://localhost:8888", { query: this.sql })
        .then((rsp) => {
          let data = rsp.data.data;
          console.log(rsp, data);
          if (rsp.data.status === 1) {
            let data = rsp.data.data;
            if (data && data.result) {
              this.result = data.result;
            } else {
              this.result = {};
            }
          }
        });
    },
  },
  mounted() {
    this.axios.get("http://localhost:8888/schema").then((rsp) => {
      console.log(rsp);
      let data = rsp.data.data;
      console.log(data);
      if (data) {
        this.schemaData = data;
      }
    });
  },
};
</script>
<style lang="less" >
.detail {
  .el-table .el-table__row {
    // padding: 2px;
    td {
      padding: 6px 0;
    }
  }
  .line {
    height: 50px;
    line-height: 50px;
  }
}
</style>
