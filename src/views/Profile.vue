<template>
    <div>
        <div class="page-title">
            <h3>Профиль</h3>
        </div>

        <form class="form" @submit.prevent="submitHandler">
            <div class="input-field">
            <input
                id="description"
                type="text"
                v-model="name"
                :class="{invalid: $v.name.$dirty && !$v.name.required}"
            >
            <label for="description">Имя</label>
            <span
                    class="helper-text invalid"
                    v-if="$v.name.$dirty && !$v.name.required">Для изменения имени, напишите новое имя</span>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
            Обновить
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
            name: ''
        }
    },

    methods: {
        async submitHandler() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }

            try{
                await this.$store.dispatch('updateInfo', {name: this.name})
                this.$message('Имя успешно изменено')
            } catch(e) {}
        }
    },

    validations: {
        name: {required}
    }
}
</script>