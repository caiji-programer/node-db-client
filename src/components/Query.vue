
<template>
  <div>
    <div style="display: flex; align-items: center; flex-direction: column;">
      <el-input
        type="textarea"
        resize="both"
        :autosize="{ minRows: 4, maxRows: 10 }"
        placeholder="输入SQL"
        v-model="input"
        class="input-with-select"
        style="width: 800px;"
        @change="change"
      ></el-input>
      <div style="margin: 20px 0;">
        <el-button type="primary" width="300" @click="send">编译、执行</el-button>
      </div>
    </div>

    <div v-if="message" :class="message.status == 0 ? 'red': 'green'">{{message.text}}</div>

    <el-tabs
      type="border-card"
      style="min-height: 600px;"
      v-model="activeName"
      @tab-click="tabClick"
    >
      <el-tab-pane label="AST" name="AST">
        <ast></ast>
      </el-tab-pane>
      <el-tab-pane label="Logical Plan" name="LogicalPlan">
        <logical-plan :plan="logicalPlan"></logical-plan>
      </el-tab-pane>
      <el-tab-pane label="Query Result" name="QueryResult">
        <query-result :result="queryResult"></query-result>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import AST from "./AST";
import LogicalPlan from "./LogicalPlan";
import QueryResult from "./QueryResult";


export default {
  name: "Query",
  data() {
    return {
      input: "",
      message: null,
      activeName: "QueryResult",
      ast: null,
      logicalPlan: null,
      queryResult: null
    };
  },
  components: {
    // HelloWorld,
    ast: AST,
    "logical-plan": LogicalPlan,
    "query-result": QueryResult
  },
  methods: {
    change(input) {
      console.log(input);
    },
    tabClick(tab, event) {
      console.log(tab, event);
    },
    send() {
      this.logicalPlan = {};
      this.result = {};
      this.axios
        .post("http://localhost:8888", { query: this.input })
        .then(rsp => {
          console.log(rsp);
          let data = rsp.data.data;
          this.message = {
            status: rsp.data.status,
            text: rsp.data.message
          };
          if (data) {
            this.logicalPlan = data.plan;
            // this.queryResult = data.result;
            let result = data.result;
            // TODO 如果表的行数据的key存在 "." 会有些BUG
            // TODO 如果表的行数据的key存在 "." 会有些BUG
            // TODO 现在暂时用"__"来代替"."
            if (!result) {
              this.queryResult = {}
              return
            }
            if (typeof result === "string") {
              this.message.text = this.message.text + ", " + result;
              this.queryResult = {}
              return;
            }
            if (result.columns) {
              result.columns = result.columns.map(column => column.replace(".", "__"));
              result.rows = result.rows.map(row => {
                let obj = {}
                Object.keys(row).forEach(key => {
                  obj[key.replace(".", "__")] = row[key];
                })
                return obj;
              });
              console.log(result.columns, result.rows);
            }
            this.queryResult = result;
          } else {
            this.logicalPlan = {};
            this.queryResult = {};
          }
        });
    }
  }
};
</script>

<style>
.red {
  color: red;
}
.green {
  color: green;
}
</style>
