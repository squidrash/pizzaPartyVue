<template>
 <div>
  <b-table small hover :items='items' :fields='fields'>
   <template #cell(kek)='row'>
    <b-button-group size="sm">
     <b-button variant='success' v-b-modal.dish-form @click='editData(row.item)'> <b-icon icon='pencil-square' aria-hidden='true'> </b-icon> Изменить</b-button>
     <b-button variant='danger' @click='remove(row.item)'> <b-icon icon="trash-fill" aria-hidden="true"> </b-icon> Удалить</b-button>
    </b-button-group>
   </template>
  </b-table>
  <b-button size="sm" v-b-modal.dish-form variant="primary"> <b-icon icon="clipboard-plus" aria-hidden="true"> </b-icon> Добавить</b-button> 
 </div>
</template>

<script> 


import { mapState, mapActions } from 'vuex'

export default {
  name: 'MenuTable',
  data() {
        return {
            fields: [
                {
                    key: 'productName',
                    label: 'Наименование',
                    sortable: true
                },
                {
                    key: 'price',
                    label: 'Цена',
                    sortable: true
                },
                {
                    key: 'kek',
                    label: ''
                }
            ]
        }
    },
    computed: {
        ...mapState('menuM', {
        //items: state => state.menu
        items: 'menu'
        })
    },
    methods: {
        editData(item) {

            console.log(item);
            let editableDish = {
                id: item.id,
                name: item.productName,
                price: item.price,
                isEdit: true
            }
            this.editDish(editableDish)
            
        },
        remove(item) {
            console.log(item);
            this.removeDish(item.id)

        },
        ...mapActions('menuM',[ 
            'getFullMenu',
            'removeDish',
            'editDish' 
        ])
    },
    mounted() {
        this.getFullMenu()
    },

}
</script>