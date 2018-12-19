<template>
  <div class="main">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/new-york-to-montreal">How to get to Montreal</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
  background-image: url("https://busbud.imgix.net/city-hires/1474307214311-Montreal,Quebec,Canada.jpg?h={height}&w={width}&auto=format,compress");
  background-size: cover;
  background-repeat: no-repeat;
  opacity: .9;
}
.main {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
