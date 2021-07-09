<template>
  <div>
    <MenuTable/>
    <DishForm/>
  </div>
</template>

<script>
// @ is an alias to /src
import MenuTable from '@/components/MenuTable.vue'
import DishForm from '@/components/DishForm.vue'

export default {
  name: 'Menu',
  components: {
    MenuTable,
    DishForm
  }
}
</script>