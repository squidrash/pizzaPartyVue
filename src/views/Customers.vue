<template>
  <div>
    <CustomersTable />
  </div>
</template>
<script>
import CustomersTable from "@/components/CustomersTable/CustomersTable.vue";

export default {
  name: "Menu",
  components: {
    CustomersTable,
  },
};
</script>
