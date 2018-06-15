<template>
  <b-container fluid>
    <b-row>
      <b-col sm="5" offset-sm="1">
        <b-row class="my-1" align-h="between">
          <b-col sm="4"><label for="input-adult">{{$t('search.adult.label')}}:</label></b-col>
          <b-col sm="8">
            <b-form-input id="input-adult" :value="parameters.adult" min="0" size="sm" type="number"
                          placeholder="How many adults" @change="updateAdult"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1" align-h="between">
          <b-col sm="4"><label for="input-child">{{$t('search.child.label')}}:</label></b-col>
          <b-col sm="8">
            <b-form-input id="input-child" :value="parameters.child" min="0" size="sm" type="number"
                          placeholder="How many children" @change="updateChild"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1" align-h="between">
          <b-col sm="4"><label for="input-senior">{{$t('search.senior.label')}}:</label></b-col>
          <b-col sm="8">
            <b-form-input id="input-senior" :value="parameters.senior" min="0" size="sm" type="number"
                          placeholder="How many seniors" @change="updateSenior"></b-form-input>
          </b-col>
        </b-row>
      </b-col>
      <b-col sm="5">
        <b-row class="my-1" align-h="between">
          <b-col sm="4"><label for="input-date">{{$t('search.date.label')}}:</label></b-col>
          <b-col sm="8">
            <datepicker id="input-date" v-model="parameters.date" @selected="updateDate"/>
          </b-col>
        </b-row>
        <b-row class="my-1" align-h="between">
          <b-col sm="4"><label for="input-currency">{{$t('search.currency.label')}}:</label></b-col>
          <b-col sm="8">
            <b-form-select id="input-currency" v-model="parameters.currency" :options="options"  @change="updateCurrency"/>
          </b-col>
        </b-row>
        <b-row class="my-1" align-h="end" :no-gutters="true">
            <b-button id="search-button" variant="primary" v-on:click="refresh()">{{$t('search.button.label')}}</b-button>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Vue from 'vue'
import Datepicker from 'vuejs-datepicker'

export default {
  name: 'TravelSearchPanel',
  methods: {
    updateAdult (val) {
      this.$store.commit('updateAdult', parseInt(val))
    },
    updateSenior (val) {
      this.$store.commit('updateSenior', parseInt(val))
    },
    updateChild (val) {
      this.$store.commit('updateChild', parseInt(val))
    },
    updateCurrency (val) {
      this.$store.commit('updateCurrency', val)
    },
    updateDate (val) {
      this.$store.commit('updateDate', val)
    }
  },
  components: {
    Datepicker
  },
  computed: {
    parameters () {
      return this.$store.state.search.parameters
    },
    options () {
      return [
        { value: 'CAD', text: Vue.i18n.translate('currencies.CAD') },
        { value: 'USD', text: Vue.i18n.translate('currencies.USD') }
      ]
    },
    currentLang () {
      return Vue.i18n.locale()
    }
  },
  props: {
    /**
     * method called when the user wants to refresh the results based on the search criterion
     */
    'refresh': Function
  }
}
</script>

<style lang="scss">
  #input-date {
    border: 1px solid #ced4da;
    width: 100%;
    color: #495057;
    text-align: center;
    border-radius: 0.2rem;
    padding-top: 4px;
    padding-bottom: 4px;
  }
  input[type="number"] {
    text-align: right;
  }
  #search-button {
    float: right;
    margin-top:5px;
    margin-bottom:5px;
  }
</style>
