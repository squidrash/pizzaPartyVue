<template>
  <div>
    <OrdersFilter/>
    <OrdersTable/>
    <OrderStatusForm/>
    
  </div>
</template>

<script>
import OrdersTable from '@/components/OrdersTable.vue'
import OrderStatusForm from '@/components/OrderStatusForm.vue'
import OrdersFilter from '@/components/OrdersFilter.vue'


export default {
  name: 'Orders',
  components: {
    OrdersTable,
    OrderStatusForm,
    OrdersFilter
  }
}

</script>