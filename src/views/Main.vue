<template>
  <div class="home">
    <div class="home__column home__column_left">
      <input class="home__input" type="text" v-model="searchText" />
      <div class="home__post" v-for="(post, i) in posts" :key="i">
        <span class="home__postManage" @click="selectPost(post)">+</span>
        <span class="home__postName">{{ post.name }}</span>
      </div>
    </div>
    <div class="home__column home__column_right">
      <div class="home__post" v-for="(post, i) in selectedPost" :key="i">
        <span class="home__postManage" @click="removePost(post)">-</span>
        <span class="home__postName">{{ post.name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "@/store";
import { ListItem } from "@/types";

@Component({})
export default class Main extends Vue {
  private searchText = "";

  get posts() {
    return store.getters.posts({ searchText: this.searchText });
  }
  get selectedPost() {
    return store.getters.selectedPosts();
  }
  private selectPost(post: ListItem) {
    store.dispatch("selectPost", post);
  }
  private removePost(post: ListItem) {
    store.dispatch("removePost", post);
  }
  created() {
    if (!this.posts.length) store.dispatch("getPosts");
  }
}
</script>

<style lang="scss">
.home {
  display: flex;
  &__column {
    width: 200px;
    border: 1px solid #cfcfcf;
    border-radius: 4px;
    &:not(:last-child) {
      margin-right: 15px;
      padding: 20px 15px;
    }
    &_right {
      padding-top: 57px;
    }
  }
  &__input {
    margin-bottom: 15px;
  }
  &__post {
    &Manage {
      display: inline-flex;
      width: 20px;
      cursor: pointer;
    }
    &Name {
      width: 100px;
    }
  }
}
</style>
