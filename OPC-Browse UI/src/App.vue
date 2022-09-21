<script setup>
</script>

<template>
  <header>
    <h1>IEP</h1>
    <h2>OPC-UA Browser</h2>
  </header>
  <router-view></router-view>
</template>

<style>
@import "@/assets/base.css";

#app {
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: white 1px solid;
  
  }

header > * {
  font-family: monospace;
  color: white;
  font-weight: 1000;
}

header h1 {
  font-size: 3rem;
}

header h2 {
  font-size: 2.5rem;
}

select {
  background: rgba(222, 222, 223, 0.212);
  cursor: pointer;
  width: 15vw;
  padding: 10px;
  border-radius: 5px;
  color: white;
  font-size: 1.05rem;
}

input {
  background: rgba(222, 222, 223, 0.212);

  width: 15vw;
  padding: 10px;
  border-radius: 5px;
  color: white;
  font-size: 1.05rem;
}

textarea {
  background: rgba(222, 222, 223, 0.212);
  height: 3.5vh;
  min-width: 15vw;
  padding: 10px;
  border-radius: 5px;
  color: white;
  font-size: 1.05rem;
}

option {
  background: rgb(62, 62, 63);
}

button {
  background: rgba(247, 247, 247, 0.719);
  width: 15vw;
  padding: 10px;
  cursor: pointer;
  font-size: 1.05rem;
}
button:active {
  transform: scale(0.95);
}

.inputClass {
  display: flex;
  flex-direction: column;
  align-content: flex-end;
 
}

.inputGroup {
  display: flex;
  flex-direction: column;
}

.inputGroup div {
  display: flex;
}

.inputGroup h4 {
  border-bottom: 1px solid white;
}

.inputGroup div > * {
  margin-right: 1vw;
}
</style>
