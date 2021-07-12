<template> 
    <div>
    <b-modal
    id="dish-form"
    ref="modal"
    title="Форма блюда"
    @hidden="resetModal"
    @ok="handleOk"
    >
        <form ref="form" @submit.stop.prevent="handleSubmit">
            <b-form-group
                label="Название блюда"
                label-for="name-input"
                invalid-feedback="Name is required"
                :state="nameState"
            >
                <b-form-input
                    id="name-input"
                    v-model="name"
                    placeholder="Введите название блюда"
                    required
                >
                </b-form-input>
            </b-form-group>

            <b-form-group
                label="Цена блюда"
                label-for="price-input"
                invalid-feedback="Price is required"
                :state="priceState"
            >
                <b-form-input
                    id="price-input"
                    v-model.number="price"
                    placeholder="Введите цену блюда"
                    required
                >
                </b-form-input>
            </b-form-group>
        </form>
    </b-modal>
    </div>
</template>

<script>

import { createHelpers } from 'vuex-map-fields';
const { mapFields } = createHelpers({
  getterType: 'menuM/getField',
  mutationType: 'menuM/updateField',
});

import { mapState, mapActions } from 'vuex'

export default {
    name: 'DishForm',
    data() {
        return {
            nameState: null,
            priceState: null,
            dish: {
                id: 0,
                productName: '',
                price: 0
            },
        }
    },
    computed: {
        ...mapState('menuM',{
            id: state => state.dishVX.id
        }),
        ...mapFields({
            name:'dishVX.name',
            price:'dishVX.price',
            isEdit:'isEdit'
        })
    },
    methods: {
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity()
            this.nameState = valid
            this.priceState = valid
            return valid
        },
        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.handleSubmit()
        },
        handleSubmit() {

            if (!this.checkFormValidity()) {
                return
            }
            this.dish.productName = this.name
            this.dish.price = this.price
            if (this.isEdit === true) {
                this.dish.id = this.id
                this.editMenu(this.dish)
            }
            else if (this.isEdit === false) {
                this.addToMenu(this.dish)
            }
            else {
                console.log("Ошибка блок Else в handleSubmit компонента dish-form")
            }
            this.isEdit = false
            this.$nextTick(() => {
                this.$bvModal.hide('dish-form')
            })
        },
        resetModal() {
            this.name = ''
            this.price = null
            this.isEdit = false
        },
        ...mapActions('menuM',[
        'addToMenu',
        'editMenu'
        ])

    },
}
</script>