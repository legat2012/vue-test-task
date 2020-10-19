<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Главная</router-link> |
      <router-link to="/history">История</router-link> |
      <router-link :to="`/history/${historyActionType.Select}/`"
        >История добавлений</router-link
      >
      |
      <router-link :to="`/history/${historyActionType.Remove}/`"
        >История удалений</router-link
      >
    </div>
    <router-view />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { HistoryActionType } from "@/types";

@Component({
  components: {}
})
export default class Home extends Vue {
  private historyActionType = HistoryActionType;
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
    :not(:last-child) {
      margin-right: 15px;
    }
  }
}
</style>
