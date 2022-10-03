<template>
  <div>
    <h3>Anzeigenamen</h3>
    <p class="refresher" @click="refetchOPCData()"><i class="bi bi-arrow-clockwise"></i>Refresh</p>
    <div class="nameDisplay" v-for="tag in getTags" :key="tag.nodeId">
      <div class="nodeLabel">
        <label>NodeId</label>
        <p>{{ tag.nodeId }}</p>
      </div>
      <div class="nodeLabel">
        <label>Datentyp</label>
        <p>{{ tag.dataType }}</p>
      </div>
      <div class="nodeLabel">
        <label>Aktueller Wert</label>
        <p>{{ tag.currentValue }}</p>
      </div>
      <div class="horizontalInput">
        <label>Anzeigename</label>
        <input
          :value="tag.name"
          @change="updateTagNames(tag, $event.target.value)"
        />
      </div>
    </div>
    <button @click.prevent="displayNextComp('methodConfigurator')">
      Bestätigen
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: null,
    };
  },

  computed: {
    getTags() {
      return this.$store.getters.getSelectedTags;
    },
  },
  methods: {
    updateTagNames(tag, newName) {
      tag.name = newName;
      this.$store.commit("updateTagName", tag);
    },
    displayNextComp(component) {
      this.$store.commit("displayComponent", component);
    },
    refetchOPCData(){
      this.$store.dispatch("readNodes")
    }
  },

};
</script>

<style>
.refresher{
  cursor: pointer;
  border: 1px solid white;
  width: 10vw;
  border-radius: 5px;
  text-align: center;
  background: rgb(56, 55, 55);
  color:white
}


.nameDisplay {
  display: flex;
  align-items: center;
  border: 1px solid white;
  border-radius: 5px;
  height: 5vh;
  padding-top: 5px;
}

.horizontalInput {
  display: flex;
  align-items: center;
  width: 33%;
  margin-left: auto !important;
  
}
 

.horizontalInput label {
  color: white;
  font-weight: bold;
  margin-right: 10px;
  
}

.horizontalInput input {
  width: 200px;
  
}
</style>