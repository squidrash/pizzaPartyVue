<template>
  <div id="app">
    <div id="nav">
      <NavBar />
    </div>
    <div class="wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
export default {
  components: {
    NavBar,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav {
  position: sticky;
  top: 0;
  background-color: #fff;
}

#nav a.router-link-active {
  color: #fff;
  background-color: #28a745;
  text-decoration: none;
  font-weight: bold;
}
</style>
