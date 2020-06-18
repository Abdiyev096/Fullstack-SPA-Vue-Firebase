<template>
    <nav class="navbar orange lighten-1">
            <div class="nav-wrapper">
                <div class="navbar-left">
                    <a href="#" @click.prevent="$emit('toggleHamburger')">
                        <i class="material-icons black-text">dehaze</i>
                    </a>
                    <span class="black-text">{{currentDate | dateFilter}}</span>
                </div>

                <ul class="right ">
                    <li>
                        <a
                            class="dropdown-trigger black-text"
                            href="#"
                            data-target="dropdown"
                            ref="dropdown"
                        >
                        {{getUserName}}
                            <i class="material-icons right">arrow_drop_down</i>
                        </a>

                        <ul id='dropdown' class='dropdown-content'>
                            <li>
                                <router-link class="black-text" to="/profile">
                                <i class="material-icons">account_circle</i>{{`profileTitle` | localize}}
                                </router-link>
                            </li>
                            <li class="divider" tabindex="-1"></li>
                            <li>
                                <a @click.prevent="logout" href="#" class="black-text">
                                <i class="material-icons">assignment_return</i>{{`quit` | localize}}
                                </a>
                            </li>
                        </ul>
                    </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'navbar',

    data() {
        return {
            currentDate: new Date(),
            interval: null,
            dropdown: null
        }
    },

    computed: {
        getUserName() {
            return this.$store.getters.getUserInfo.name
        }
    },

    methods: {
        async logout() {
            await this.$store.dispatch('logout')
            this.$router.push('/login?message=logout')
        }
    },

    mounted() {
        this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
            constrainWidth: false,
            coverTrigger: false,
            closeOnClick: true
        })

        this.interval = setInterval(() => {
            this.currentDate = new Date()
        }, 1000)
    },

    beforeDestroy() {
        clearInterval(this.interval)
        
        if(this.dropdown && this.dropdown.destroy) {
            this.dropdown.destroy()
            console.log('done')
        }
    }
}
</script>