<template>
  <select
    :name="name || 'generic-selector'"
    :value="modelValue"
    @input="selectChanged"
  >
    <option v-for="choice in choices" :key="choice">{{ choice }}</option>
  </select>
</template>

<script>
export default {
  emits: ["update:modelValue"],
  props: ["modelValue", "choices", "name"],
  created() {
    console.log("Initial Value: ", this.modelValue);
  },
  methods: {
    selectChanged(e) {
      this.$emit("update:modelValue", e.target.value);
    },
  },
};
</script>

<style scoped>
select {
  flex: 1;
}
</style>