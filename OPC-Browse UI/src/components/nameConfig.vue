<template>
  <div>
    <h3>Anzeigenamen</h3>

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
    <p>{{ getTags }}</p>
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
  },

};
</script>

<style>
.nameDisplay {
  display: flex;
  align-items: center;
  border: 1px solid white;
  justify-content: flex-start;
  border-radius: 5px;
  height: 5vh;
  padding-top: 5px;
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