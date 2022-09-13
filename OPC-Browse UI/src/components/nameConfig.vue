<template>
  <div>
    <h3>Anzeigenamen</h3>

    <div class="nameDisplay" v-for="tag in getTags" :key="tag.nodeId">
      <div class="horizontalInput">
        <label>NodeId</label>
        {{ tag.nodeId }}
      </div>
      <div class="horizontalInput">
        <label>Anzeigename</label>
        <input :value="tag.name" @change="updateTagNames(tag,$event.target.value)" />
      </div>
    </div>
    <button @click="updateTagNames()">Bestätigen</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: null,
    };
  },
  computed:{
    getTags(){
    
        return this.$store.getters.getSelectedTags;
    }
  },
  methods:{
    updateTagNames(tag, newName){
      tag.name = newName
      this.$store.commit("updateTagName", tag)
    }
  }
};
</script>

<style>
.nameDisplay {
  display: flex;
  align-items: center;
  border: 1px solid white;
  justify-content: flex-start;
  border-radius: 5px;
  height: 4vh;
}

.horizontalInput {
  display: flex;
  align-items: center;
  width: 33%;
}

.horizontalInput label {
  color: white;
  font-weight: bold;
  margin-right: 10px;
}

.horizontalInput input {
  width: 200px;
 height: 2vh;
}
</style>