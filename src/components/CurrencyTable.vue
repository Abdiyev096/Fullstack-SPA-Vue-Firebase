<template>
    <div class="col s12 m6 l8">
        <div class="card orange darken-3 bill-card">
            <div class="card-content white-text">
                <div class="card-header">
                    <span class="card-title">Курс валют</span>
                </div>
                <table>
                    <thead>
                        <tr>
                        <th>Валюта</th>
                        <th>Курс</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="(key, value, index) in getCurrencyValue"
                            :key="index">
                        <td>{{value}}</td>
                        <td>{{key.toFixed(3)}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['currencyData'],

    computed: {
        getCurrencyValue() {
            const i = this.currencyData['KZT']
            return {
                'RUB': i / this.currencyData['RUB'],
                'USD': i / this.currencyData['USD'],
                'EUR': i / this.currencyData['EUR']
            }
        }
    },

    mounted() {
        this.getCurrencyValue
    }
}
</script>