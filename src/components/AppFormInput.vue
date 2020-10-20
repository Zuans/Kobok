<template>
  <div class="form-input">
      <!-- If type is textarea -->
      <div v-if="formType == 'textarea'" :class="`form-type-${formType}`" >
          <label 
            :for="name" 
            class="mr-3" 
            :class="`txt-${labelColor}`" 
          >
            {{ label }} :
          </label>
          <textarea 
            v-model="textMasuk"  
            :name="name" 
            :id="name" 
            cols="30" 
            rows="10" 
            :class="`border-${borderColor} 
            bg-${bgColor} 
            txt-${txtColor}`"
          >
          </textarea>
      </div>
      <!-- If type is options -->
      <div 
        v-else-if="formType == 'options'" 
        :class="`form-type-${formType}`"
      >
        <label 
            :for="name" 
            class="mr-3" 
            :class="`txt-${labelColor}`" 
        >
            {{ label }} :
        </label>
        <select :name="name" v-model=" opsi" id="name">
            <option value="null">{{ label }}</option>
            <option 
                v-for="(opsi,index) in dataOpsi" 
                :key="index" 
                :value="opsi"
            >
                {{ opsi }}
            </option>
        </select>
      </div>
      <!-- If type is text or something similar -->
      <div v-else :class="`form-type-${formType}`">
            <label :for="name" :class="`txt-${labelColor}`">
                {{ label }}:
            </label>
            <input 
               v-model="textMasuk"   
               :type="formType" 
               :class="`border-${borderColor} bg-${bgColor} txt-${txtColor}`" 
          >
     </div>  
  </div>
</template>

<script>
import { elStyle } from '../mixins/index';

export default {
    name : 'formInput',
    props : {
        name : {
            type : String,
            default : 'No-name',
            required : true,
        },
        label : {
            type : String,
            default : 'No-name',
        },
        formType : {
            type : String,
            default : 'text',
        },
        cols : {
            type : String,
        },
        rows : {
            type : String,
        },
        dataOpsi : {
            type : Array,
        },
        value : {
            type : String,
            default : '',
        },
        defaultOpsi : {
            type : String,
        }
    },
    data() {
        return {
            textMasuk : '',
            opsi : 'null',
        }
    },
    watch : {
        textMasuk(val) {
            this.$emit('inputMasuk',val);
        },
        opsi(val) {
            this.$emit('inputMasuk',val);
        },
        value(val) {
            // if formtype is options
            if(this.formType == "options" && this.value == "" )  {
                this.opsi = "null"
                return;
            }
            this.textMasuk = val;
        }
    },
    mixins : [elStyle]
}
</script>

<style scoped>

    .form-input {
        margin-bottom: 2rem;
    }

    .form-type-textarea,
    .form-type-text,
    .form-type-number {
        display: flex;
    }

    label {
        font-weight: bold;
        font-size : 20px;
        flex : 2;
        margin-left : 0;
    }

    input[type="text"],
    input[type="number"],
    select, 
    textarea {
        border-radius : 1.4rem;
        padding : .4rem 1.2rem;
        margin-left: 1rem;
        flex : 6;
    }

     input[type="number"] {
         padding : 0rem .8rem;
     }

    select {
        padding : .4rem 2rem;
    }

    textarea {
        vertical-align: top;
        padding : .8rem 1.8rem;
        min-height : 500px;
        max-height : 1000px;
    }

    input[type="text"]:focus,
    input[type="number"]:focus,
    select:focus,
    textarea:focus {
        outline : none;
    }
</style>