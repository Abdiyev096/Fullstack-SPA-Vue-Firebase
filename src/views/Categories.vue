<template>
    <div>
        <div class="page-title">
            <h3>{{'categories' | localize}}</h3>
        </div>
        <Loader v-if="loading"/>
        <section v-else>
            <div class="row">
            <CategoryCreate @categoryCreated="addCategory"/>
            <CategoryEdit v-if="categories.length"
                          :categories="categories"
                          :key="categories.length"/>

            <p v-else class="center">{{'noCategory' | localize}}</p>
            </div>
        </section>
    </div>
</template>

<script>
import CategoryCreate from '../components/CategoryCreate'
import CategoryEdit from '../components/CategoryEdit'

export default {

    data() {
        return {
            categories: [],
            loading: true
        }
    },

    methods: {
        addCategory(value) {
            this.categories.push(value)
        }
    },

    async mounted() {
        try {
            this.categories = await this.$store.dispatch('fetchCategories')
            this.loading = false    
        } catch(e) {}
    },
    
    components: {
        CategoryCreate, CategoryEdit
    }
}
</script>