<template>
    <div>
        <div class="page-title">
            <h3>{{`profileTitle` | localize}}</h3>
        </div>

        <form class="form" @submit.prevent="submitHandler">
            <div class="input-field">
            <input
                id="description"
                type="text"
                v-model="name"
                :class="{invalid: $v.name.$dirty && !$v.name.required}"
            >
            <label for="description">{{`name` | localize}}</label>
            <span
                    class="helper-text invalid"
                    v-if="$v.name.$dirty && !$v.name.required">Для изменения имени, напишите новое имя</span>
            </div>

                <div class="input-field col s12 lang-select">
                    <select ref="select" v-model="locale">
                    <option value="ru-RU">Русский</option>
                    <option value="en-US">English</option>
                    </select>
                    <label>{{`chooseLang` | localize}}</label>
                </div>

            <button class="btn waves-effect waves-light" type="submit">
            {{`update` | localize}}
            <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators'

export default {
    name: 'profile',

    data() {
        return {
            name: '',
            locale: 'ru-RU',
            select: null
        }
    },

    methods: {
        async submitHandler() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }

            try{
                await this.$store.dispatch('updateInfo', {name: this.name, locale: this.locale})
                this.$message('Имя успешно изменено')
            } catch(e) {}
        }
    },

    mounted() {
        this.select = M.FormSelect.init(this.$refs.select)
    },

    beforeDestroy() {
        if(this.select && this.select.destroy) {
            this.select.destroy()
        }
    },

    validations: {
        name: {required}
    }
}
</script>

<style>
    .lang-select {
        margin: 25px 0;
    }
</style>