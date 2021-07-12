<template>
    <div>
    <label>Фильтры</label>

    <b-button variant="primary" size="sm" @click="visible=!visible">{{visible?'Скрыть':'Отобразить'}}</b-button>
    <b-form-group v-show="visible" label-cols-lg="2" >
        Статус<br>
        <b-form-select v-model="filters.status.value" :options="filters.status.options" ></b-form-select><br>
        Адрес<br>
        <b-form-select  v-model="filters.address.value" :options="filters.address.options" ></b-form-select><br>
        Клиент<br>
        <b-form-select  v-model="filters.customers.value" :options="filters.customers.options" ></b-form-select><br><br>
        
        <b-button variant="success" size="sm" @click="filterOut">Применить</b-button>
        <b-button variant="danger" size="sm" @click="resetFilters">Сбросить</b-button>

    </b-form-group>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default{
    name:'OrdersFilter',
    data() {
        return {
            visible: false,
            filters: {
                status: {
                    value: null,
                    options: [
                        {
                            value: null, text: "Выберите статус"
                        },
                        {
                            value: 'New', text: 'Новый'
                        },
                        {
                            value: 'Confirmed', text: 'Подтвержден'
                        },
                        {
                            value: 'Preparing', text: 'Готовится'
                        },
                        {
                            value: "OnTheWay", text: 'В пути'
                        },
                        {
                            value: "Delivered", text: 'Доставлен'
                        },
                        {
                            value: "Cancelled", text: 'Отменен'
                        }
                    ]
                },
                address: {
                    value: null,
                    options: [
                        {
                            value: null, text: "------"
                        },
                        {
                            value: true, text: "C адресом"
                        },
                        {
                            value: false, text: "Без адреса"
                        },
                    ]
                },
                customers: {
                    value: null,
                    options: [
                        {
                            value: null, text: "------"
                        },
                        {
                            value: true, text: "C клиентом"
                        },
                        {
                            value: false, text: "Без клиента"
                        },
                    ]
                }
            }
        }
    },
    methods: {
        filterOut() {
            this.getFilteredOrders(this.filters)
        },
        resetFilters() {
            this.filters.status.value = null
            this.filters.address.value = null
            this.filters.customers.value = null
            this.getAllOrders()

        },
        ...mapActions('ordersM',[
            'getAllOrders',
            'getFilteredOrders'
        ])
    }
}

</script>