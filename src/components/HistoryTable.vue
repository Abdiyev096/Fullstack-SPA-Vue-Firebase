<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{'sum' | localize}}</th>
        <th>{{'date' | localize}}</th>
        <th>{{'category' | localize}}</th>
        <th>{{'type' | localize}}</th>
        <th>{{'open' | localize}}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, idx) in records"
            :key="record.id">
        <td>{{idx + 1}}</td>
        <td>{{record.amount | currencyFilter('KZT') }}</td>
        <td>{{new Date(record.date) | dateFilter('datetime')}}</td>
        <td>{{record.categoryName}}</td>
        <td>
          <span class="white-text badge" :class="record.typeClass">{{record.typeName}}</span>
        </td>
        <td>
          <button class="btn-small btn" @click="$router.push(`/detail-record/${record.id}`)">
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>

export default {
    props: {
        records: {
            type: Array,
            required: true
        }
    }
}

</script>