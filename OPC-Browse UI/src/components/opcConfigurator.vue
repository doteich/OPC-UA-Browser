<template>
  <div>
    <h3>OPC UA Endpunkt Konfiguration</h3>
    <form>
      <div class="inputClass">
        <label>OPC Endpunkt</label>
        <input placeholder="opc.tcp://IP:port" v-model="url" />
      </div>
      <div class="inputClass">
        <label>Sicherheitsrichtlinie</label>
        <select v-model="securityPolicy">
          <option>None</option>
          <option>Basic256Sha256</option>
          <option>Basic256</option>
          <option>Basic128Rsa15</option>
        </select>
      </div>
      <div class="inputClass">
        <label>Sicherheitsmodus</label>
        <select v-model="securityMode">
          <option>None</option>
          <option>Sign</option>
          <option>SignAndEncrypt</option>
        </select>
      </div>
      <div class="inputGroup">
        <h4 v-if="authType === 'User & Password'">Auth</h4>
        <div>
          <div class="inputClass">
            <label>Authentifizierung</label>
            <select v-model="authType">
              <option>Anonymous</option>
              <option>User & Password</option>
            </select>
          </div>
          <div class="inputClass" v-if="authType === 'User & Password'">
            <label>Username</label>
            <input v-model="username" />
          </div>

          <div class="inputClass" v-if="authType === 'User & Password'">
            <label>Passwort</label>
            <input type="password" v-model="password" />
          </div>
        </div>
      </div>

      <button @click.prevent="connectToOPC()">Verbinden</button>
    </form>
    <p class="error" v-if="error">
      <i class="bi bi-exclamation-diamond"></i>{{ error }}
    </p>
    <p
      class="warning"
      v-if="securityPolicy != 'None' || securityMode != 'None'"
    >
      <i class="bi bi-exclamation-triangle"></i>Die gewählte Richtlinie oder
      Modus erfordern ein Zertifikat und Private Key
    </p>
    <div
      class="verticalInput"
      v-if="securityPolicy != 'None' || securityMode != 'None'"
    >
      <label>Autogen Zertifikat & Private Key</label>
      <input
        type="checkbox"
        value="checked"
        class="checkbox"
        v-model="autoGenCert"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: null,
      securityPolicy: "None",
      securityMode: "None",
      authType: "Anonymous",
      username: null,
      password: null,
      autoGenCert: false,
      node: "RootFolder",
    };
  },
  computed: {
    error() {
      return this.$store.getters.getConfigError;
    },
  },
  methods: {
    connectToOPC() {
      let payload = {
        url: this.url,
        securityPolicy: this.securityPolicy,
        securityMode: this.securityMode,
        autoGenCert: this.autoGenCert,
        authType: this.authType,
        username: this.username,
        password: this.password,
        node: this.node,
      };

      this.$store.dispatch("browse", payload);
    },
  },
};
</script>


<style scoped>

.verticalInput {
  display: flex;
  align-items: center;
}

.checkbox {
  height: 20px;
  width: 20px;
}
</style>