<template>
    <div class="spinner">
        <div class="spinner__bounce spinner__bounce1"></div>
        <div class="spinner__bounce spinner__bounce2"></div>
        <div class="spinner__bounce spinner__bounce3"></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";

@Component
export default class Loader extends Vue {
}
</script>

<style lang="scss" scoped>
.spinner {
  margin: 100px auto 0;
  width: 70px;
  text-align: center;

  &__bounce {
    width: 18px;
    height: 18px;
    background-color: #f19020;

    border-radius: 100%;
    display: inline-block;
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  }

  &__bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }
  
  &__bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }
}

@-webkit-keyframes sk-bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0) }
  40% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bouncedelay {
  0%, 80%, 100% { 
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% { 
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
}
</style>
