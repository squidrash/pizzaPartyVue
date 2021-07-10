<template>
 <div>
    <b-modal
        id="order-status-form"
        ref="order-modal"
        title="Изменить статус"
        @hidden="resetModal"
        @ok="handleOk"
    >
        <b-form-select v-model="selected" :options="options"></b-form-select>
        <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
    </b-modal>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import { createHelpers } from 'vuex-map-fields';
const { mapFields } = createHelpers({
  getterType: 'ordersM/getField',
  mutationType: 'ordersM/updateField',
});

export default{
    data() {
        return {
            options: [
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
        }
    },
    computed: {
        ...mapState('ordersM',[
        'orderId',
        'orderStatus'
        ]),
        ...mapFields({
            selected:'orderStatus'
        })
        
    },
    methods: {
        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.handleSubmit()
        },
        handleSubmit() {
            const order = {
                id: this.orderId,
                newStatus: this.orderStatus,
            }
            this.changeStatus(order)

            this.$nextTick(() => {
                this.$bvModal.hide('order-status-form')
            })
        },
        resetModal() {
            this.changeOrderStatus(null)
            this.setOrderId(null)
        },
        ...mapActions('ordersM',[
            'changeOrderStatus',
            'setOrderId',
            'changeStatus'
        ])
    }
}

</script>