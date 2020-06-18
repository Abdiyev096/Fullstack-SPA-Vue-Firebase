<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option
              v-for="category in getCategories"
              :key="category.id"
              :value="category.id"
            >{{category.categoryTitle}}</option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
          />
          <label for="limit">Лимит</label>
          <span
            class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue"
          >Минимальная сумма 100 тенге</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
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
        limit: '',
        current: null,
        select: null
    };
  },

  props: {
    categories: Array,
    required: true
  },

  computed: {
      getCategories() {
          return this.categories
      }
  },

  watch: {
      current(categoryID) {
          this.current = categoryID
          const {categoryTitle} = this.categories.find(el => el.id == categoryID)
          this.title = categoryTitle
      }
  },

  methods: {
      async submitHandler() {
          if(this.$v.$invalid) {
              this.$v.$touch()
              return
          }

          try {
              const categoryData = {
                  categoryLimit: this.limit,
                  categoryTitle: this.title,
                  id: this.current
              }
              await this.$store.dispatch('updateCategory', categoryData)
              this.$message('Категория была успешна обновлена')
          } catch(e) {}
      }
  },

  created() {
      this.current = this.categories[0].id
  },

  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
  },

  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },

  validations: {
        limit: {minValue: minValue(100)}
    }
};
</script>