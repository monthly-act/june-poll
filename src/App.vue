<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
};
</script>
<style lang="scss">

$main-color: #1e1e2d;

* {
  margin: 0;
  padding: 0;
  scrollbar-color: dark;
}
body {
  overscroll-behavior: contain;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: $main-color;
  color: #2c3e50;
  padding: 0;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
