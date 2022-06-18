<template>
  <div>
    <div @click="browseNode(tagInfo.nodeId)" class="tagDisplay">
      <i class="bi bi-boxes" v-if="tagInfo.nodeClass === 'Object'"></i>
      <i class="bi bi-hexagon" v-if="tagInfo.nodeClass === 'Variable'"></i>
      <div class="nodeLabel">
        <label>Browse Name</label>
        <p>{{ tagInfo.browseName.name }}</p>
      </div>
      <div class="nodeLabel">
        <label>NodeId</label>
        <p>{{ tagInfo.nodeId }}</p>
      </div>
    </div>
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
  methods: {
    browseNode(nodeId) {
      this.$store.dispatch("browseNode", nodeId);
    },
  },
};
</script>

<style>
.tagDisplay {
  background: rgb(78, 77, 77);
  color: white;
  width: 30vw;
  font-size: 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.tagDisplay:hover {
  border: 1px solid white;
}

.tagDisplay i {
  margin: 0 10px;
  font-size: 1.5rem;
  color: rgb(181, 113, 236)


 
}

.nodeLabel {
  display: flex;
  flex-direction: column;
  margin-right: 4%;

  margin-bottom: 5px;
}

.nodeLabel label {
  font-size: 0.8rem;
  font-weight: bold;
}
.nodeLabel p {
  background: rgb(221, 221, 221);
  border-radius: 20px;
  padding: 1px 10px;
  color: black;
  font-size: 0.9rem;
}
</style>