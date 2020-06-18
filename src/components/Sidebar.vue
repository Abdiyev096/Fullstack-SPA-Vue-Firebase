<template>
    <ul class="sidenav app-sidenav" :class="{open: value}">
            <router-link
                        v-for="({title, url}, index) in links"
                        :key="index" 
                        :to="url"
                        tag="li"
                        active-class="active"
                        exact>
                <a href="#" class="waves-effect waves-orange pointer">{{title | localize}}</a>
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
                {title: 'bill', url: '/'},
                {title: 'history', url: '/history'},
                {title: 'planning', url: '/planning'},
                {title: 'new-record', url: '/record'},
                {title: 'categories', url: '/categories'}
            ]
        }
    }
}
</script>