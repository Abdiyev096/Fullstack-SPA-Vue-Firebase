<template>
    <div>
        <div class="page-title">
            <h3>{{'planning' | localize}}</h3>
            <h4>{{currentBill | currencyFilter('KZT')}}</h4>
        </div>

        <Loader v-if="loading" />

        <p 
            v-else-if="!categories.length" 
            class="center">{{'noCategory' | localize}}</p>

        <section v-else>
            <div v-for="c in categories"
                    :key="c.id">
                <p>
                    <strong>{{c.categoryTitle}}:</strong>
                    {{c.spend | currencyFilter('KZT')}} из {{c.categoryLimit | currencyFilter('KZT')}}
                </p>
                <div class="progress" >
                    <div
                        class="determinate"
                        :class="c.progressColor"
                        :style="{width: c.progressPercent + '%'}"
                    ></div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'planning',

    data: () => ({
        loading: false,
        categories: []
    }),

    computed: {
        currentBill() {
            return this.$store.getters.getUserInfo.bill
        }
    },

    async mounted() {
        const records = await this.$store.dispatch('fetchRecords')
        const categories = await this.$store.dispatch('fetchCategories')
        this.loading = false

        this.categories = categories.map(cat => {
            const spend = records.filter(r => r.categoryID === cat.id)
                                    .filter(r => r.type === 'outcome')
                                    .reduce((total, record) => {
                                        return total += +record.amount
                                    }, 0)

            const percent = spend * 100 / cat.categoryLimit
            const progressPercent = percent > 100 ? 100 : percent
            const progressColor = percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red'
            
            return {
                ...cat,
                progressPercent,
                progressColor,
                spend
            }                        
        })
    }
}
</script>