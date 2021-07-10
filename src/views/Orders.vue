<template>
  <div>
    <OrdersTable/>
  </div>
</template>

<script>
import OrdersTable from '@/components/OrdersTable.vue'

export default {
  name: 'Orders',
  components: {
    OrdersTable
  }
}

</script>