<template>
    <div>
        <div>
            <div class="breadcrumb-wrap">
            <router-link to="/history" class="breadcrumb">{{'history' | localize}}</router-link>
            <a class="breadcrumb" @click.prevent>
                {{record.type === 'income' ? 'Доход' : 'Расход'}}
            </a>
            </div>
            <Loader v-if="loading" />
            <p class="center" v-else-if="!record">{{'noRecord' | localize}}</p>
            <div class="row" v-else>
            <div class="col s12 m6">
                <div class="card" 
                        :class="{
                            'red': record.type === 'outcome',
                            'green': record.type === 'income'
                        }">
                <div class="card-content white-text">
                    <p>{{'description' | localize}}: {{record.description}}</p>
                    <p>{{'sum' | localize}}: {{record.amount | currencyFilter('KZT')}}</p>
                    <p>{{'category' | localize}}: {{record.name}}</p>

                    <small>{{new Date(record.date) | dateFilter('datetime')}}</small>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'detail-record',

    data() {
        return {
            record: null, 
            loading: true
        }
    },

    async mounted() {
        const id = this.$route.params.id
        const record = await this.$store.dispatch('fetchRecordById', id)
        const category = await this.$store.dispatch('fetchCategoryById', record.categoryID)
        this.loading = false

        this.record = {
            ...record,
            name: category.categoryTitle
        }
    }
}
</script>