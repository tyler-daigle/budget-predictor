<template>
  <span class="bar" :class="barClass" :style="barStyle"></span>
</template>

<script>
export default {
  props: {
    barHeight: {
      type: Number,
      required: true,
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
          height: `${this.barHeight * -1}%`,
        };
      } else {
        return {
          height: `${this.barHeight}%`,
          backgroundColor: "purple",
        };
      }
    },
  },
};
</script>

<style scoped>
.bar-negative {
  transform: translateY(100%);
  background-color: purple;
}
.bar-positive {
  background: linear-gradient(red, blue);
}

.bar {
  display: inline-block;
  width: 100%;
  border: solid 1px black;
  margin: 0 1px;
}
</style>