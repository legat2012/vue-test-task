import Vue from "vue";
import Vuex from "vuex";
import {
  ListItem,
  ServerListItem,
  PostsGetterVariables,
  HistoryItem,
  HistoryActionType,
  ListMatches
} from "@/types";
import axios from "axios";

Vue.use(Vuex);

const posts: ListItem[] = [];
const history: HistoryItem[] = [];

const searchMatchesInPost = (post: ListItem, searchTest = ""): number => {
  let a: number = post.name.match(new RegExp(searchTest, "g"))?.length || 0;
  if (post.items?.length > 0) {
    a += post.items.reduce((num: number, p) => {
      num += searchMatchesInPost(p, searchTest);
      return num;
    }, 0);
  }
  return a;
};

export default new Vuex.Store({
  state: {
    posts,
    history
  },
  mutations: {
    SET_POSTS: (state, posts: ListItem[]) => {
      state.posts = [...posts];
    },
    SELECT_POST: (
      state,
      variable: { post: ListItem; actionType: HistoryActionType }
    ) => {
      if (!variable.post) return;
      state.posts.forEach(post => {
        if (post === variable.post) {
          post.isSelected = HistoryActionType.Select === variable.actionType;
          history.push({
            id: post.id,
            name: post.name,
            actionType: variable.actionType,
            date: new Date().toString()
          });
        }
      });
    }
  },
  actions: {
    getPosts: async state => {
      axios
        .get("http://forecast-soccer.ru/test")
        .then(response => {
          const serverListItem: ServerListItem[] = [...response.data];

          state.commit(
            "SET_POSTS",
            serverListItem.map(sl => {
              const listItem: ListItem = { ...sl, isSelected: false };
              return listItem;
            })
          );
        })
        .catch(error => console.error(error));
    },
    selectPost: (state, post: ListItem) => {
      state.commit("SELECT_POST", {
        post,
        actionType: HistoryActionType.Select
      });
    },
    removePost: (state, post: ListItem) => {
      state.commit("SELECT_POST", {
        post,
        actionType: HistoryActionType.Remove
      });
    }
  },
  getters: {
    posts: state => (postsGetterVariables: PostsGetterVariables) => {
      const posts = state.posts.filter(post => !post.isSelected);
      if (!postsGetterVariables?.searchText.length) {
        return posts;
      }
      const postWithMatches = posts.reduce((arr: ListMatches[], post) => {
        const matches: number = searchMatchesInPost(
          post,
          postsGetterVariables.searchText.toLowerCase()
        );
        const l: ListMatches = {
          id: post.id,
          matches
        };
        if (matches > 0) arr.push(l);
        return arr;
      }, []);
      postWithMatches.sort(
        (a: ListMatches, b: ListMatches) => b.matches - a.matches
      );
      const filtered: ListItem[] = [];

      postWithMatches.forEach(pwm => {
        const item: ListItem | undefined = posts.find(post => post.id === pwm.id);
        if (item) filtered.push(item);
      });

      return filtered;
    },
    selectedPosts: state => () => {
      return state.posts.filter(post => post.isSelected);
    },
    history: state => (type: HistoryActionType | null) => {
      return !type
        ? [...state.history]
        : [...state.history.filter(h => h.actionType === type)];
    }
  },
  modules: {}
});

export class Store {}
