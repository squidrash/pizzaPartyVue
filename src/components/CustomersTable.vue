<template>
    <div>
    <b-table small hover 
    :items="items"
    :fields="fields"
    >
        <template #cell(discount)='data'>
            {{data.value}} %
        </template>
        <template #cell(details)>
            <b-button variant="primary" @click="testRouter"> Подробнее</b-button>
        </template>
        
        <template #cell(actionsWithCustomer)="row">
            <b-button-group size="sm">
                <b-button variant="success" v-b-modal.customer-form @click="editData(row.item)"> <b-icon icon="pencil-square" aria-hidden="true"></b-icon> Изменить</b-button>
                <b-button variant="danger" @click="removeData(row.item.id)"> <b-icon icon="trash-fill" aria-hidden="true"></b-icon> Удалить</b-button>
            </b-button-group>
        </template>
     </b-table>
     <b-button size="sm" v-b-modal.customer-form variant="primary"><b-icon icon="clipboard-plus" aria-hidden="true"></b-icon> Добавить</b-button>
    </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default{
    name:'CustomersTable',
    data() {
        return {
            fields: [
                {
                    key: 'id',
                    label: 'Id',
                    sortable: true
                },
                {
                    key: 'name',
                    label: 'Имя',
                    sortable: true
                },
                {
                    key: 'lastName',
                    label: 'Фамилия',
                    sortable: true
                },
                {
                    key: 'phone',
                    label: 'Номер',
                    sortable: true
                },
                {
                    key: 'discount',
                    label: 'Скидка клиента',
                    sortable: true
                },
                {
                    key: 'details',
                    label: 'Детали заказа',
                },
                {
                    key: 'actionsWithCustomer',
                    label: ""
                }

            ]
        }
    },
    computed: {
        ...mapState('customersM',{
            items:'allCustomers'
        })
    },
    methods: {
        editData(item) {
            console.log("item");
            console.log(item);
            let editableCustomer = {
                customer: item,
                isEdit: true
            }
            console.log("editableCustomer");
            console.log(editableCustomer)
            this.editCustomer(editableCustomer)
        },
        removeData(id) {
            this.removeCustomer(id)
        },
        ...mapActions('customersM',[
            'editCustomer',
            'removeCustomer',
            'getAllCustomers'
        ]),
        testRouter(){
            this.$router.push('Orders')
        },
    },
    mounted(){
        this.getAllCustomers();
    }
}

</script>