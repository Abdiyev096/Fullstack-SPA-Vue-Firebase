<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'create' | localize}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input 
                id="name" 
                type="text" 
                v-model="title"
                :class="{invalid: $v.title.$dirty && !$v.title.required}"/>
          <label for="name">{{'name' | localize}}</label>
          <span 
                class="helper-text invalid"
                v-if="$v.title.$dirty && !$v.title.required">{{'requiredField' | localize}}</span>
        </div>

        <div class="input-field">
          <input 
                id="limit" 
                type="number" 
                v-model.number="limit"
                :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"/>
          <label for="limit">{{'limit' | localize}}</label>
          <span class="helper-text invalid"
                v-if="$v.limit.$dirty && !$v.limit.minValue">{{'minimalSum' | localize}}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{'create' | localize}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'

export default {
    data() {
        return {
            title: '',
            limit: ''
        }
    },

    methods: {
        async submitHandler() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }

            try {
                const category = await this.$store.dispatch('createCategory', {
                    categoryTitle: this.title,
                    categoryLimit: this.limit
                })
                this.title = this.limit = ''
                this.$v.$reset()
                this.$emit('categoryCreated', category)
                this.$message('Категория была успешна создана')
            } catch(e) {}
        }
    },

    validations: {
        title: {required},
        limit: {minValue: minValue(100)}
    }
}
</script>