<template>

  <b-container fluid>
    <b-row>
      <b-col sm="5" offset-sm="1">
        <b-row class="my-1" align-h="between">
          <b-col sm="4"><label for="input-adult">Adults:</label></b-col>
          <b-col sm="8">
            <b-form-input id="input-adult" :value="parameters.adult" min="0" size="sm" type="number" placeholder="How many adults"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1" align-h="between">
          <b-col sm="4"><label for="input-child">Children:</label></b-col>
          <b-col sm="8">
            <b-form-input id="input-child" :value="parameters.child" min="0" size="sm" type="number" placeholder="How many children"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1" align-h="between">
          <b-col sm="4"><label for="input-senior">Senior:</label></b-col>
          <b-col sm="8">
            <b-form-input id="input-senior" :value="parameters.senior" min="0" size="sm" type="number" placeholder="How many seniors"></b-form-input>
          </b-col>
        </b-row>
      </b-col>
      <b-col sm="5">
        <b-row class="my-1" align-h="between">
          <b-col sm="4"><label for="input-date">Date:</label></b-col>
          <b-col sm="8">
            <datepicker id="input-date" v-model="parameters.date"/>
          </b-col>
        </b-row>
        <b-row class="my-1" align-h="between">
          <b-col sm="4"><label for="input-currency">Currency:</label></b-col>
          <b-col sm="8">
            <b-form-select id="input-currency" v-model="parameters.currency" :options="options"/>
          </b-col>
        </b-row>
        <b-row class="my-1" align-h="end" :no-gutters="true">
            <b-button id="search-button" variant="primary" v-on:click="refresh()">Search</b-button>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

import Datepicker from 'vuejs-datepicker'

export default {
  name: 'TravelSearchPanel',
  data () {
    return {
      selected: null,
      options: [
        { value: null, text: 'Please select a currency' },
        { value: 'CAD', text: 'Dollar Canadien' },
        { value: 'USD', text: 'Dollar US' }
      ]
    }
  },
  components: {
    Datepicker
  },
  props: {
    'parameters': Object,
    'refresh': Function
  }
}
</script>

<style>
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
}
</style>
