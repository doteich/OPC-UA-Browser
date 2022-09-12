<template>
  <div>
    <h3>Anzeigenamen</h3>
    <div class="nameDisplay" v-for="tag in selectedTags" :key="tag.nodeId">
      <div class="inputClass">
        <label>NodeId</label>
        {{ tag.nodeId }}
      </div>
       <div class="inputClass">
        <label>Anzeigename</label>
        <input :value="tag.name">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    selectedTags() {
      return this.$store.getters.getSelectedTags;
    },
  },
};
</script>

<style>
.nameDisplay{
    display: flex;
    align-items: flex-start;
    border: 1px solid white;
}
</style>