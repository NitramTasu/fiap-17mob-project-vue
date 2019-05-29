<template>
  <div id="app">
    <offline @detected-condition="handleConnectivityChange">
      <div slot="online" class="online">
        <p>Online</p>
      </div>
      <div slot="offline" class="offline">
        <p>Offline</p>
      </div>
    </offline>
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>|
      <button v-on:click="logout" to="/login">Logout</button>
    </div>
    <router-view/>
  </div>
</template>
<script>
import firebase from "firebase";
import { Script } from "vm";
import offline from 'v-offline';

export default {
  name: "app",
  components: {
    offline
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/login");
        });
    },
    handleConnectivityChange(status) {
      console.log(status);
    }
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a,
button {
  font-weight: bold;
  color: #2c3e50;
}

button {
  background: none;
  border: none;
  padding: 0px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.online{
    background-color: green;
    color: white;
}
.offline{
    background-color: red;
    color: white;
}
</style>
