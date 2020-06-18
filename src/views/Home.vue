<template>
    <div>
        <div class="page-title">
            <h3>{{'bill' | localize}}</h3>

            <button class="btn waves-effect waves-light btn-small" @click="refresh">
            <i class="material-icons">refresh</i>
            </button>
        </div>
        <Loader v-if="loading"/>
        <div class="row" v-else>
            <HomeBill :currencyData="currency.rates"/>
            <CurrencyTable :currencyData="currency.rates" />
        </div>
    </div>
</template>

<script>
import HomeBill from '../components/HomeBill'
import CurrencyTable from '../components/CurrencyTable'

export default {

    data() {
        return {
            loading: true,
            currency: null
        }
    },

    methods: {
        async refresh() {
            this.loading = true
            this.currency = await this.$store.dispatch('fetchCurrency')
            this.loading = false
        }
    },

    async mounted() {
        this.currency = await this.$store.dispatch('fetchCurrency')
        this.loading = false
    },
    
    components: {
        HomeBill,
        CurrencyTable
    }
}
</script>