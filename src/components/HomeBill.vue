<template>
    <div class="col s12 m6 l4">
        <div class="card light-blue bill-card">
            <div class="card-content white-text">
                <span class="card-title">{{'billCurrency' | localize}}</span>
                <p  class="currency-line"
                    v-if="!isNaN(getCurrency('KZT'))">
                    <span>{{getCurrency('KZT') | currencyFilter('KZT')}}</span>
                </p>
                <p  class="currency-line"
                    v-else>
                    <Loader />
                </p>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: ['currencyData'],

    computed: {
        getBase() {
            return this.$store.getters.getUserInfo.bill / (this.currencyData['KZT'])
        }
    },

    methods: {
        getCurrency(currency) {
            return Math.floor(this.getBase * this.currencyData[currency])
        }
    }
}
</script>