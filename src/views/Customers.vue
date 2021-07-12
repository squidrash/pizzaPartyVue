<template>
  <div>
    <CustomersTable/>
    <CustomerForm/>
  </div>
</template>
<script>
import CustomersTable from '@/components/CustomersTable.vue'
import CustomerForm from '@/components/CustomerForm.vue'

export default {
  name: 'Menu',
  components: {
    CustomersTable,
    CustomerForm
  }
}
</script>