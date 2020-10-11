<template>
  <div :class="`btn-${nama}`">
      <button 
        @click="$emit('btn-click')" 
        :disabled="disabled"
        :class="`bg-${bgColor} txt-${txtColor} border-${borderColor} `"
       >
          <slot class="btn-el" ></slot>
      </button>
  </div>
</template>

<script>
import { elStyle } from '../mixins/index';
export default {
    name  : 'appTombol',
    props : {
        nama : {
            type : String,
            default : 'app'
        },
        disabled : {
            type : Boolean,
            default : false,
        }
    },
    mixins : [elStyle]
}
</script>

<style lang="scss" scoped>

button {
    display : flex;
    line-height: 2rem;
    font-size : 19px;
    padding : .8rem .8rem .2rem;
    border : none;
    border-radius : 3px;
}


</style>