<template>
  <div>
    <!-- <p v-if="plan">逻辑计划如下：</p> -->
    <p v-if="plan">Logical Plan:</p>
    <div id="logical-plan-view" :style="{width: '1200px', minWidth: '1200px', height: viewHeight+'px'}"></div>
  </div>
</template>
<script>
import * as echarts from "echarts";

export default {
  name: "",
  data: () => {
    return {
      viewHeight: 400,
      serieHeight: 390
    };
  },
  components: {},
  props: ["plan"],
  watch: {
    plan: function(val) {
      console.log(val);
      if (val) {
        this.renderChart();
      }
    }
  },
  methods: {
    renderChart() {
      let myChart = echarts.init(document.getElementById("logical-plan-view"));

      let datas =
        this.plan && this.plan.primary
          ? this.plan.subPlans.concat(this.plan.primary)
          : [];

      this.viewHeight = (datas.length || 1) * 400;

      let series = datas.map((data, index) => {
        // data.name = `Plan ${index}: \n ${data.name}`;
        data.label = {
          formatter: `{a|Plan ${index}: }\n{b}:\n{c}`
        };
        return {
          type: "tree",
          data: [data],
          top: this.serieHeight * index + 5,
          left: "6%",
          // bottom: (index+1)*400 - 20,
          right: "6%",
          height: this.serieHeight,
          symbolSize: 10,
          label: {
            position: "top",
            // distance: 10,
            verticalAlign: "bottom",
            align: "center",
            fontSize: 14,
            lineHeight: 20,
            formatter: "{b}:\n{c}",
            rich: {
              a: {
                color: "red",
                fontSize: 18,
                lineHeight: 24
              }
            }
          },
          expandAndCollapse: false,
          animationDuration: 550,
          animationDurationUpdate: 750
        };
      });

      myChart.setOption({
        tooltip: {
          trigger: "item",
          triggerOn: "mousemove",
          formatter: "{b}: <br/>{c}"
        },
        series: series
      });
      this.$nextTick(() => {
        myChart.resize();
      });
    }
  },
  mounted() {
    if (this.plan) {
      this.renderChart();
    }
  }
};
</script>
