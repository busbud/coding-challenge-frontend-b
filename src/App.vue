<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          :src="require('./assets/busbud.png')"
          transition="scale-transition"
          width="125"
        />
      </div>

      <v-spacer></v-spacer>
      <div class="locale-changer">
        <select v-model="$i18n.locale">
          <option v-for="(lang, i) in langs"
            :key="`Lang${i}`"
            :value="lang.value">
            {{ lang.text }}
            </option>
        </select>
      </div>
      <div class="currency-changer">
        <select v-model="currency">
          <option v-for="(curr, i) in currencies" :key="`curr${i}`" :value="curr">{{ curr }}
          </option>
        </select>
      </div>
    </v-app-bar>
    <v-content>
      <Search/>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import Search from './components/Search.vue';

export default {
  name: 'App',
  components: {
    Search,
  },
  data() {
    return {
      langs: [{ text: 'English', value: 'en' }, { text: 'French', value: 'fr' }],
      currencies: ['CAD', 'USD'],
      currency: 'CAD',
    };
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
