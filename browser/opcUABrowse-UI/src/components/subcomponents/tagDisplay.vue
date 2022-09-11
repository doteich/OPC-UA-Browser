<template>
  <div class="nodeContainer">
    <div class="tagDisplay" :style="{marginLeft:calcWidth + '%'}">
      <i
        class="bi bi-boxes"
        v-if="tagInfo.nodeClass === 'Object'"
        style="color: rgb(98, 141, 177)"
      ></i>
      <i
        class="bi bi-hexagon"
        v-if="tagInfo.nodeClass === 'Variable'"
        style="color: rgb(194, 99, 207)"
      ></i>
      <div class="nodeLabel">
        <label>Browse Name</label>
        <p>{{ tagInfo.browseName.name }}</p>
      </div>
      <div class="nodeLabel">
        <label>NodeId</label>
        <p>{{ tagInfo.nodeId }}</p>
      </div>
      <div class="nodeControls">
        <input type="checkbox" v-if="tagInfo.nodeClass === 'Variable'" @change="toggleNode(tagInfo.nodeId,tagInfo.browseName.name,$event)"/>
        <i
          class="bi bi-plus-square expander"
          v-if="tagInfo.nodeClass === 'Object' && !tagInfo.childs.length"
          @click="browseNode(tagInfo.nodeId, tagInfo.index)"
        ></i>
         <i
          class="bi bi-dash-square expander"
          v-if="tagInfo.childs.length"
          @click="collapseNode(tagInfo, tagInfo.index)"
        ></i>
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
  computed: {
    calcWidth() {
      const arrLen = this.tagInfo.index.length;
      let width = arrLen * 2;
      return width
    },
  },
  methods: {
    browseNode(nodeId, index) {
      let payload = {
        nodeId,
        index,
      };
      this.$store.dispatch("browseNode", payload);
    },
    collapseNode(branch,index){
      let payload = {
         branch,
        index,
      };
      this.$store.commit("collapseNode",payload)
    },
    toggleNode(nodeId,name,$event){

      const checked = $event.target.checked

      const payload = {
        nodeId,
        name
      }
        if(checked){
          this.$store.commit("addSelectedNode",payload)
        }else{
          this.$store.commit("dropSelectedNode",payload)
        }
    }
  },
};
</script>

<style>
.nodeContainer{
  display: flex;
  flex-direction: column;
  margin-top: 5px;
 
}

.tagDisplay {
  background: rgb(78, 77, 77);
  color: white;
  font-size: 1.2rem;
  border-radius: 5px;
  display: flex;

  align-items: center;
}

.tagDisplay > i {
  margin: 0 10px;
  font-size: 1.5rem;
  color: white;
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

.nodeControls {
  margin-left: auto;
  margin-right: 2%;
}

.nodeControls input {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.expander {
  cursor: pointer;
}

.expander:hover {
  font-size: 1.3rem;
}
</style>