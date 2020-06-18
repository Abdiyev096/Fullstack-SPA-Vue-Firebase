<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <Loader v-if="loading" />
    <p
      v-else-if="!categories.length"
      class="center"
    >Для добавления записей, добавьте хоть 1 категорию</p>
    <form class="form" v-else @submit.prevent="submitHandler">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{cat.categoryTitle}}</option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="income" v-model="type" />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="outcome" v-model="type" />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
        />
        <label for="amount">Сумма</label>
        <span
          class="helper-text invalid"
          v-if="$v.amount.$dirty && !$v.amount.minValue"
        >Минимальная сумма 100 тенге</span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{invalid: $v.description.$dirty && !$v.description.required}"
        />
        <label for="description">Описание</label>
        <span class="helper-text invalid"
              v-if="$v.description.$dirty && !$v.description.required">Описание обязательное</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";

export default {
  name: "record",

  data() {
    return {
      categories: [],
      loading: true,
      select: null,
      category: "",
      type: "outcome",
      amount: "",
      description: ""
    };
  },

  computed: {
      canCreateRecord() {
          if(this.type === "income"){
              return true
          }

          return this.$store.getters.getUserInfo.bill >= this.amount
      }
  },

  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

          try {
              if (this.canCreateRecord) {
                const newRecord = {
                categoryID: this.category,
                type: this.type,
                amount: this.amount,
                description: this.description,
                date: new Date().toJSON()
            }
            await this.$store.dispatch('createRecord', newRecord)
            const bill = this.type === 'income' 
                        ? this.$store.getters.getUserInfo.bill + this.amount
                        : this.$store.getters.getUserInfo.bill - this.amount
            
            await this.$store.dispatch('updateInfo', {bill})
            this.$message('Запись была успешна создана')
            this.amount = this.description = ''
          } else {
          this.$message('Недостаточно средств')
        }
      } catch(e) {
        }
      
    }
  },

  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;
    if(this.categories.length) {
        this.category = this.categories[0].id;
        setTimeout(() => {
        this.select = M.FormSelect.init(this.$refs.select);
        }, 0);
    }
  },

  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },

  validations: {
    description: { required },
    amount: { minValue: minValue(100) }
  }
};
</script>