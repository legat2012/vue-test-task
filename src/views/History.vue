<template>
  <div class="history">
    <div class="history__row" v-if="history.length">
      <div
        class="history__itemWrap"
        v-for="(item, index) in history"
        :key="index"
      >
        <div class="history__item">
          <p>id: {{ item.id }}</p>
          <p>Имя: {{ item.name }}</p>
          <p>
            Тип перемещения:
            {{
              item.actionType === historyActionType.Select
                ? "Добавлен"
                : "Удален"
            }}
          </p>
          <p>Дата: {{ item.date | dateConvert }}</p>
        </div>
      </div>
    </div>
    <div v-else>Ничего не найдено</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "@/store";
import { HistoryActionType, HistoryItem } from "@/types";

@Component({
  filters: {
    dateConvert: (dateString: string) => {
      const date = new Date(dateString);
      if (!date.getDate()) return "неверный формат даты";

      const day = `0${date.getDate()}`;
      const month = `0${date.getMonth()}`;
      const year = `${date.getFullYear()}`;
      const hours = `0${date.getHours()}`;
      const min = `0${date.getMinutes()}`;
      const time = `${hours.slice(-2)}:${min.slice(-2)}`;
      return `${day.slice(-2)}.${month.slice(-2)}.${year} ${time}`;
    }
  }
})
export default class History extends Vue {
  private historyActionType = HistoryActionType;
  get history() {
    const historyItems: HistoryItem[] =
      store.getters.history(this.$route.params.type) || [];
    return historyItems;
  }
}
</script>

<style lang="scss">
.history {
  &__row {
    display: flex;
    flex-wrap: wrap;
  }
  &__itemWrap {
    flex: 0 0 200px;
    padding: 15px;
    border: 1px solid #cfcfcf;
    margin: 0 15px 15px 0;
  }
  &__item {
    display: inline-block;
    padding: 15px 10px;
    flex: 0 0 264px;
  }
}
</style>
