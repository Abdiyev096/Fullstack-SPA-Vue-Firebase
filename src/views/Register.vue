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
            isAgree: false
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
            }
            
            try {
                await this.$store.dispatch('register', userData)
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