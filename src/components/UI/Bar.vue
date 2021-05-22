<template>
  <div class="bar" :class="barClass" :style="barStyle" @mouseover="showTooltip">
    <span :style="barLabelClass">{{ barLabel }}</span>
  </div>
</template>

<script>
export default {
  props: {
    barHeight: {
      type: Number,
      required: true,
    },
    monthTotal: {
      type: Number,
      required: false,
    },
    barLabel: {
      type: String,
      required: false,
    },
  },
  computed: {
    barClass() {
      return {};
    },
    barStyle() {
      if (this.barHeight < 0) {
        console.log(`Negative: ${this.barHeight * -1}%`);
        return {
          backgroundColor: "red",
          transform: "translateY(100%)",
          marginBottom: "-2rem",
          height: `${this.barHeight * -1}%`,
          border: "solid 1px pink",
        };
      } else {
        return {
          height: `${this.barHeight}%`,
          background: "linear-gradient(#354f42, #84a98c)",
        };
      }
    },
    barLabelClass() {
      if (this.barHeight < 0) {
        return {
          transform: "translateY(-33px)",
          alignSelf: "flex-start",
          color: "red",
        };
      } else {
        return {
          transform: "translateY(26px)",
          color: "black",
        };
      }
    },
  },
  methods: {
    showTooltip() {
      console.log("Hover");
    },
  },
};
</script>

<style scoped>
.bar {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  border: solid 1px black;
  margin: 0 1px;
}

/* .bar-label {
  color: black;
  transform: translateY(2rem);
} */
</style>