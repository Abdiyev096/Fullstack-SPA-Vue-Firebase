<template>
    <div>
        <div class="page-title">
            <h3>{{'recordHistory' | localize}}</h3>
        </div>

        <div class="history-chart">
            <canvas ref="canvas"></canvas>
        </div>

        <Loader v-if="loading" />

        <p class="center" v-else-if="!records.length">{{'noRecord' | localize}}</p>

        <section v-else>
            <HistoryTable :records="records"/>
        </section>
    </div>
</template>

<script>
import HistoryTable from '../components/HistoryTable'
import {Pie} from 'vue-chartjs'

export default {
    name: 'history',

    data() {
        return {
            loading: true,
            records: []
        }
    },

    async mounted() {
        const records = await this.$store.dispatch('fetchRecords')
        const categories = await this.$store.dispatch('fetchCategories')

        this.setup(records, categories)
        this.loading = false
    },

    methods: {
        setup(records, categories) {
            this.records = records.map(record => {
            return {
                ...record,
                categoryName: categories.find(c => c.id === record.categoryID).categoryTitle,
                typeClass: record.type === 'income' ? 'green' : 'red',
                typeName: record.type === 'income' ? 'Доход' : 'Расход'
            }
        })
        
            this.renderChart({
                labels: categories.map(c => c.categoryTitle),
                datasets: [{
                    label: 'Расходы по категориям',
                    data:  categories.map(c => {
                        return records.reduce((total, r) => {
                            if(c.id === r.categoryID && r.type === 'outcome') {
                                total += +r.amount
                            }
                            return total 
                        }, 0)
                    }),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            })
        }
    },

    extends: Pie,

    components: {
        HistoryTable
    }
}
</script>