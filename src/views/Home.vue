<template>
  <div class="home">
    <city-banner
      city-name="Montreal, Canada"
      city-image-url="https://busbud.imgix.net/city-hires/1474307214311-Montreal,Quebec,Canada.jpg?h=1920&w=1080&auto=format,compress"
    ></city-banner>
    <div class="form">
      <div class="form__input-container">
        <label
          class="form__label"
          for="departing-city"
        >Get to</label>
        <input
          id="departing-city"
          class="form__input"
          type="text"
          disabled
          aria-disabled="true"
          value="Montreal, Canada"
        >
      </div>
      <div class="form__input-container">
        <label
          class="form__label"
          for="destination-city"
        >from</label>
        <input
          id="destination-city"
          class="form__input"
          type="text"
          disabled
          aria-disabled="true"
          value="New York, USA"
        >
      </div>
      <div class="form__input-container">
        <label
          class="form__label"
          for="departure-date"
        >on the</label>
        <input
          id="departure-date"
          class="form__input"
          type="date"
          disabled
          aria-disabled="true"
          value="02/08/2019"
        >
      </div>
      <router-link
        class="form__button"
        to="/new-york-to-montreal"
      >Search</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CityBanner from "@/components/CityBanner.vue";

@Component({
  components: {
    CityBanner,
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.home {
  text-align: center;

  &__title {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 48px;
    font-weight: 900;
  }

  &__sub-title {
    font-size: 32px;
  }

  &__landscape {
    background-image: url("https://busbud.imgix.net/city-hires/1474307214311-Montreal,Quebec,Canada.jpg?h=1600&w=1200&auto=format,compress");
    background-position-x: 50%;
    background-size: 100%;
    background-repeat: no-repeat;
    z-index: -1;
  }
}

.form {
  margin: 50px 16px;

  &__input-container {
    margin-bottom: 16px;
    
    @media screen and (min-width: 960px) {
      padding: 12px 16px;
      display: inline;
      width: auto;
      margin-bottom: 0;
    }
  }

  &__label {
    display: block;
    text-align: left;

    @media screen and (min-width: 960px) {
      display: inline;
      text-align: inherit;
    }
  }
  
  &__input {
    display: block;
    box-sizing: border-box;
    padding: 12px 8px 12px 8px;
    border-radius: 5px;
    border: 1px solid #c9c9c9;
    color: #f19020;
    font-size: 16px;
    background-color: #ddd;
    width: 100%;

    @media screen and (min-width: 960px) {
      padding: 12px 16px;
      display: inline;
      width: auto;
      margin-left: 8px;
      margin-right: 8px;
    }
  }

  &__button {
    text-decoration: none;
    color: #fff;
    background-color: #f19020;
    border-color: #f19020;
    padding: 12px 0;
    border-radius: 5px;
    display: block;
    text-align: center;
    margin-top: 16px;
    width: 100%;

    @media screen and (min-width: 1068px) {
      padding: 12px 16px;
      display: inline;
      width: auto;
    }
  }
}
</style>

