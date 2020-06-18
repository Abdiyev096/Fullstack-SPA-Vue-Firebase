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
            <div class="input-field">
            <input
                id="name"
                type="text"
                v-model="name"
                :class="{invalid: (!$v.name.required && $v.name.$dirty)}"
            >
            <label for="name">Имя</label>
            <small class="helper-text invalid"
                    v-if="!$v.name.required && $v.name.$dirty">Имя не должно быть пустым</small>
            </div>
            <div class="input-field">
            <input
                id="amount"
                type="text"
                v-model="amount"
                :class="{invalid: (!$v.name.required && $v.name.$dirty)}"
            >
            <label for="amount">Сколько денег у вас есть?</label>
            <small class="helper-text invalid"
                    v-if="!$v.name.required && $v.name.$dirty">Поле не должно быть пустым</small>
            </div>
            <div class="input-field col s12 lang-select">
                    <select ref="select" v-model="locale">
                    <option value="ru-RU">Русский</option>
                    <option value="en-US">English</option>
                    </select>
                    <label>{{`chooseLang` | localize}}</label>
            </div>
            <p>
            <label>
                <input  type="checkbox"
                        v-model="isAgree"/>
                <span>С правилами согласен</span>
            </label>
            </p>
        </div>
        <div class="card-action">
            <div>
            <button
                class="btn waves-effect waves-light auth-submit"
                type="submit"
            >
                Зарегистрироваться
                <i class="material-icons right">send</i>
            </button>
            </div>

            <p class="center">
            Уже есть аккаунт?
            <router-link to="/login">Войти!</router-link>
            </p>
        </div>
    </form>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'

export default {
    name: 'register',
    data() {
        return {
            email: '',
            password: '',
            name: '',
            amount: '',
            locale: 'ru-RU',
            isAgree: false,
            select: null
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
                password: this.password,
                name: this.name,
                bill: this.amount,
                locale: this.locale
            }
            
            try {
                await this.$store.dispatch('register', userData)
                this.$router.push('/')
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
        email: {
            email,
            required
        },
        password: {
            required, 
            minLength: minLength(6)
        },
        name: {
            required
        },
        isAgree: {
            checked: v => v
        }
    }
}
</script>