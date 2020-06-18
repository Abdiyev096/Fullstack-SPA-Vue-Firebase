<template>
    <ul class="sidenav app-sidenav" :class="{open: value}">
            <router-link
                        v-for="({title, url}, index) in links"
                        :key="index" 
                        :to="url"
                        tag="li"
                        active-class="active"
                        exact>
                <a href="#" class="waves-effect waves-orange pointer">{{title}}</a>
            </router-link>
    </ul>
</template>

<script>
export default {
    name: 'sidebar',

    props: ['value'],

    data() {
        return {
            links: [
                {title: 'Счёт', url: '/'},
                {title: 'История', url: '/history'},
                {title: 'Планирование', url: '/planning'},
                {title: 'Новая запись', url: '/record'},
                {title: 'Категории', url: '/categories'}
            ]
        }
    }
}
</script>