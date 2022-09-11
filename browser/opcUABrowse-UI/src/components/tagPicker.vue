<template>
  <div>
    <h3>Datenpunkt Selektion</h3>
    <div>
      <tag-display
        v-for="tag in setTags"
        :key="tag.nodeId"
        :tagInfo="tag"
      ></tag-display>
      <button @click="displayNextComp('methodConfigurator')">Bestätigen</button>
    </div>
  </div>
</template>

<script>
import tagDisplay from "../components/subcomponents/tagDisplay.vue";
export default {
  components: {
    tagDisplay,
  },
  computed: {
    setTags() {
      return this.$store.getters.tagGetter;
    },
    displayConfig(){
      return this.$store.getters.configFileGetter
    }
  },
   methods:{
    displayNextComp(component){
      this.$store.commit("displayComponent",component)
    }
  }
};
</script>

<style>
</style>