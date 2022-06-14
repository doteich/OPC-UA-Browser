<template>
  <div>
    <h3>Datenpunkt Selektion</h3>
    <div>
     <ul>
        <li v-for="tag in setTags" :key="tag.nodeId">{{tag.nodeId}}{{tag.browseName.name}}
          <ul>
            
          </ul>
        </li>
     </ul>
     
    </div>
  </div>
</template>

<script>
export default {
  computed:{
    setTags(){
      return this.$store.getters.tagGetter
    }
  }
};
</script>

<style>
</style>