<template>
  <div class="tagDisplay">
    <div @click="browseNode(tagInfo.nodeId)">{{ tagInfo.nodeId }} // {{tagInfo.browseName.name}}</div>
    <tag-display
      v-for="tag in tagInfo.childs"
      :key="tag.nodeId"
      :tagInfo="tag"
    ></tag-display>
  </div>
</template>

<script>
export default {
  props: {
    tagInfo: Object,
  },
  name: "tag-display",
  methods:{
    browseNode(nodeId){
        this.$store.dispatch("browseNode",nodeId)
    }
  }
};
</script>

<style>
    .tagDisplay{
        background: rgb(78, 77, 77);
        color:white;
        width: 20vw;
        font-size: 1.2rem;
        border-radius: 5px;
        cursor: pointer;
    }
    .tagDisplay:hover{
        border: 1px solid white;
    }
</style>