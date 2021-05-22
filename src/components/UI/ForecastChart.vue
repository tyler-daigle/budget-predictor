<template>
  <section class="forecast-chart-container">
    <header>
      <h2 class="forecast-header">Your Budget Forecast For The Year</h2>
    </header>
    <div class="graph-container">
      <div class="graph">
        <!-- <ul>
          <li v-for="bar in barPercentages" :key="nextId * bar">{{ bar }}</li>
        </ul> -->
        <bar
          v-for="(barHeight, index) in bars"
          :key="barHeight + nextId"
          :barHeight="barHeight"
          :monthTotal="forecastData[index]"
          :barLabel="months[index]"
        />
      </div>
    </div>
  </section>
</template>

<script>
import generateId from "../../utils/id";
import Bar from "./Bar";

export default {
  components: {
    Bar,
  },
  props: {
    forecastData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    };
  },
  created() {
    console.log("Forecast: ", this.forecastData);
  },
  watch: {
    forecastData() {
      console.log("Forecast Data", this.forecastData);
    },
  },
  methods: {
    maxInArray(nums) {
      let largest = Math.abs(nums[0]);
      for (let i = 1; i < nums.length; i++) {
        if (Math.abs(nums[i]) > largest) {
          largest = Math.abs(nums[i]);
        }
      }
      return largest;
    },
    minInArray(nums) {
      let smallest = Math.abs(nums[0]);
      for (let i = 1; i < nums.length; i++) {
        if (Math.abs(nums[i]) < smallest) {
          smallest = Math.abs(nums[i]);
        }
      }
      return smallest;
    },
  },
  computed: {
    /*
      The charts are created using a percentage value. The tallest bar is the month with the most money.
      The largest amount of money is the max value and is 100% height. The rest of the bars are less 
      than the max and their percentages are created using the max value: (amount / max) * 100 = bar height
      It is just a regular percentage calculation.

      Negative values do work. The graph is set inside a flex container that is larger than the actual graph.
      The graph will overflow downwards for negative values using translateY(100%), then setting the height
      to a percentage will make the bar go downwards.

      The graph div is a flex container so adding bars, which are spans with width set to 100%, will cause 
      the flex container to size its children. This makes adding bars easy and we don't have to worry about
      setting the size of the container as we add more bars.
    */
    bars() {
      let max = this.maxInArray(this.forecastData);
      if (max === 0) {
        // everything is negative
        max = this.minInArray(this.forecastData);
        // everything has to be flipped
      }
      const values = [];

      if (max !== 0) {
        this.forecastData.forEach((d) => values.push((d / max) * 100));
      } else {
        // assume the array is all 0? We can't divide by 0.
        this.forecastData.forEach(() => values.push(0));
      }

      /* 
        check if the percentages are very close to each other. If they are the graph doesnt
        look very good, all the bars will be almost the same height.
      */

      let avg = values.reduce((acc, d) => acc + d, 0) / values.length;
      if (avg > 70) {
        for (let i = 0; i < values.length - 1; i++) {
          // change all but the last
          values[i] -= 5.0;
        }
      }
      console.log("Average: ", avg);
      console.log(values);
      return values;
      // values.forEach((val) => insertBar(graph, `${val}%`));
    },
    nextId() {
      return generateId();
    },
  },
};
</script>

<style scoped>
.forecast-header {
  text-align: center;
}
.forecast-chart-container {
  width: 100%;
  height: 500px;
}
.graph-container {
  display: flex;
  justify-content: center;

  height: 100%;
  width: 100%;
  margin: 0 auto;
}

.graph {
  display: flex;
  height: 70%;
  width: 95%;
  align-items: flex-end;
}
</style>