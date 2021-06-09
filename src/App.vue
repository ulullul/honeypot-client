<template>
  <div id="app">
    <div id="nav">
      <div class="nav-items" :style="{ 'margin-right': token && 'auto' }">
        <router-link to="/">All todos</router-link>
        <router-link v-if="token" to="/my-todos"> | My todos</router-link>
        |
        <router-link to="/add">Add todo</router-link>
        <router-link v-if="!token" to="/sign-in"> | Sign in</router-link>
        <router-link v-if="!token" to="/sign-up"> | Sign up</router-link>
      </div>
      <md-button class="md-accent md-raised" v-if="token" @click="logOut"
        >Sign out</md-button
      >
    </div>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters('Auth', ['token']),
  },
  methods: {
    ...mapActions('Auth', ['logout']),
    logOut() {
      this.logout();
      if (this.$route.name !== 'AllTodos')
        this.$router.replace({ name: 'AllTodos' });
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.container {
  max-width: 1300px;
  margin: 0 auto;
}

.grid-row {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}

.grid-item {
  flex-basis: calc(20% - 20px);
  position: relative;
  margin: 10px;
  box-sizing: border-box;

  @media (max-width: 1333px) {
    flex-basis: 33.33%;
  }

  @media (max-width: 1073px) {
    flex-basis: 33.33%;
  }

  @media (max-width: 815px) {
    flex-basis: 50%;
  }
  @media (max-width: 555px) {
    flex-basis: 100%;
  }
}
</style>
