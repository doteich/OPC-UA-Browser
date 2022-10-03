<script setup>
</script>

<template>
  <header>
    <img src="./assets/iep-logo-transparent.png">
    <h2>IEP OPC-UA Logging Tools</h2>
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
  align-items: center;
  box-shadow: 0px 6px 10px 1px #000000;
  }

header h2{
  font-family:monospace;
  color: white;
  font-weight: 1000;
  font-size: 3em;
  margin-left: 5vw;
}
header img{
  width: 200px;
  margin-left: 2vw;
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

.error {
  border-radius: 5px;
  border: 1px solid white;
  width: 50%;
  margin-left: 1%;
  background: rgba(139, 8, 8, 0.76);
  color: white;
}

.warning {
  border-radius: 5px;
  border: 1px solid white;
  width: 50%;
  margin-left: 1%;
  border: 2px solid rgb(248, 182, 0);
  color: white;
}

.info {
  border-radius: 5px;
  border: 1px solid white;
  width: 50%;
  margin-left: 1%;
  border: 2px solid rgb(1, 174, 255);
  color: white;
}

</style>
