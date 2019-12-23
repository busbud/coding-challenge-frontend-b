<template>
  <v-app-bar
    app
    color="primary"
    dark>
    <div>
      <v-img
        :src="require('../assets/busbud.png')"
        width="125"/>
    </div>
    <v-spacer></v-spacer>
    <div class="locale-changer">
      <select v-model="$i18n.locale">
        <option v-for="(lang, i) in languages"
          :key="`Lang${i}`"
          :value="lang.value">
          {{ lang.text }}
          </option>
      </select>
    </div>
    <div class="currency-changer">
      <select v-model="currency">
        <option v-for="(curr, i) in currencies" :key="`curr${i}`" :value="curr">
          {{ curr }}
        </option>
      </select>
    </div>
  </v-app-bar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'nav-bar',
  data() {
    return {
      currency: 'CAD',
    };
  },
  computed: {
    ...mapGetters({
      currencies: 'currencies',
      languages: 'languages',
    }),
  },
  methods: {
    ...mapActions({
      updateCurrency: 'UPDATE_CURRENCY',
    }),
  },
  watch: {
    currency() {
      this.updateCurrency(this.currency);
    },
  },
};
</script>
<style scoped>
.locale-changer {
  margin-right: 20px;
}

.currency-changer {
  margin-right: 20px;
}
</style>
