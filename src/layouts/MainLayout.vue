<template>
    <div class="app-main-layout">
        <Navbar @toggleHamburger="isOpen = !isOpen"/>
        <Sidebar v-model="isOpen"/>

        <main class="app-content" :class="{full: !isOpen}">
            <div class="app-page">
                <router-view></router-view>
            </div>
        </main>

        <div class="fixed-action-btn">
            <router-link to="/record" class="btn-floating btn-large blue">
                <i class="large material-icons">add</i>
            </router-link>
        </div>
    </div>
</template>

<script>
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export default {
    name: 'main-layout',

    data() {
        return {
            isOpen: true
        }
    },

    computed: {
        error() {
            return this.$store.getters.getError
        }
    },

    watch: {
        error(e) {
            this.$message('Что-то пошло не так')
        }
    },

    async mounted() {
        if(!Object.keys(this.$store.getters.getUserInfo).length) {
            await this.$store.dispatch('fetchUserInfo') 
        }
    },

    components: {
        Navbar,
        Sidebar
    }
}
</script>