<template>

  <b-container fluid style="background-image: url('assets/osheaga.png')">
    <b-row>
      <b-col sm="6" offset-md="3">
        <b-row class="my-1">
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
        <b-row class="my-1" align-h="between">
          <b-col sm="4"><label for="input-currency">Currency:</label></b-col>
          <b-col sm="8">
            <b-form-select id="input-currency" v-model="parameters.currency" :options="options" class="mb-3" />
          </b-col>
        </b-row>
        <b-row class="my-1" align-h="between">
          <b-col sm="6" offset-md="3">
            <b-button variant="primary">Search</b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
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
  props: {
    'parameters': Object
  }
}
</script>

<style>
</style>
