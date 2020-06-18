<template>
    <form class="card auth-card" @submit.prevent="submitHandler">
        <div class="card-content">
            <span class="card-title">Домашняя бухгалтерия</span>
            <div class="input-field">
            <input
                id="email"
                type="text"
                v-model.trim="email"
                :class="{invalid: (!$v.email.required && $v.email.$dirty) || ($v.email.$dirty && !$v.email.email)}"
            >
            <label for="email">Email</label>
            <small 
                class="helper-text invalid"
                v-if="!$v.email.required && $v.email.$dirty">
                Email не должен быть пустым</small>
            <small 
                class="helper-text invalid"
                v-else-if="$v.email.$dirty && !$v.email.email">
                Введите корректный email</small>
            </div>
            <div class="input-field">
            <input
                id="password"
                type="password"
                v-model="password"
                :class="{invalid: (!$v.password.required && $v.password.$dirty) || ($v.password.$dirty && !$v.password.minLength)}"
            >
            <label for="password">Пароль</label>
            <small  v-if="!$v.password.required && $v.password.$dirty" 
                    class="helper-text invalid
                    ">Пароль не должен быть пустым</small>
            <small  v-else-if="$v.password.$dirty && !$v.password.minLength" 
                    class="helper-text invalid
                    ">Пароль должен быть больше 6 символов</small>
            </div>
        </div>
        <div class="card-action">
            <div>
            <button
                class="btn waves-effect waves-light auth-submit"
                type="submit"
            >
                Войти
                <i class="material-icons right">send</i>
            </button>
            </div>

            <p class="center">
            Нет аккаунта?
            <router-link to="/register">Зарегистрироваться</router-link>
            </p>
        </div>
    </form>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'

export default {
    name: 'login',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    mounted() {
        if(this.$route.query.message == 'logout') {
            this.$message("Вы вышли из системы")
        }
    },
    methods: {
        async submitHandler() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }

            const userData = {
                email: this.email,
                password: this.password
            }

            try {
                await this.$store.dispatch('login', userData)
                this.$router.push('/')
            } catch(e) {}
        }
    },
    validations: {
        email: {
            email,
            required
        },
        password: {
            required, 
            minLength: minLength(6)
        }
    }
}
</script>