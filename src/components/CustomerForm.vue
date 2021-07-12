<template>
    <div>
         <b-modal
            id="customer-form"
            ref="customer-modal"
            title="Форма пользователя"
            @hidden="resetModal"
            @ok="handleOk"
            >
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                    label="Имя"
                    label-for="name-input"
                    invalid-feedback="Name is required"
                    :state="nameState"
                >
                    <b-form-input
                        id="name-input"
                        v-model="name"
                        placeholder="Введите имя"
                        required
                    >
                    </b-form-input>
                </b-form-group>

                <b-form-group
                    label="Фамилия"
                    label-for="lastName-input"
                    invalid-feedback="LastName is required"
                    :state="lastNameState"
                >
                    <b-form-input
                        id="lastName-input"
                        v-model="lastName"
                        placeholder="Введите фамилию"
                        required
                    >
                    </b-form-input>
                </b-form-group>
                <b-form-group
                    label="Телефон"
                    label-for="phone-input"
                    invalid-feedback="Phone is required"
                    :state="phoneState"
                >
                    <b-form-input
                        id="phone-input"
                        v-model="phone"
                        placeholder="Введите номер телефона"
                        required
                    >
                    </b-form-input>
                </b-form-group>
                <b-form-group
                    label="Скидка"
                    label-for="discount-input"
                    description="Минимальный размер скидки — 0, максимальный — 20"
                    
                >
                    <b-form-input
                        id="discount-input"
                        v-model="discount"
                        placeholder="Введите размер скидки"
                    >
                    </b-form-input>
                </b-form-group>
            </form>
        </b-modal>
    </div>
</template>
<script>
    import { mapState, mapActions } from 'vuex'
    import { createHelpers } from 'vuex-map-fields';
    const { mapFields } = createHelpers({
    getterType: 'customersM/getField',
    mutationType: 'customersM/updateField',
    });

export default{
    name:'CustomerForm',
    data() {
        return {
            nameState: null,
            lastNameState: null,
            phoneState: null,
            customer: {}
        }
    },
    computed: {
        ...mapState('customersM',{
            id: state => state.customerVX.id
        }),
        ...mapFields({
            name:'customerVX.name',
            lastName:'customerVX.lastName',
            phone:'customerVX.phone',
            discount:'customerVX.discount',
            isEdit:'isEdit'
        })
    },
    methods: {
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity()
            this.nameState = valid
            this.lastNameState = valid
            this.phoneState = valid
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

            this.customer.name = this.name;
            this.customer.lastName = this.lastName;
            this.customer.phone = this.phone;
            this.customer.discount = this.discount
            if (this.isEdit === true) {
                console.log(this.id)
                this.customer.id = this.id;
                this.editCustomerDB(this.customer)
            }
            else if (this.isEdit === false) {
                this.registrationCustomer(this.customer)
            }
            else {
                console.log("Ошибка блок Else в handleSubmit компонента customer-form")
            }

            this.$nextTick(() => {
                this.$bvModal.hide('customer-form')
            })
        },
        resetModal() {
            this.name = '';
            this.lastName = '';
            this.phone = null;
            this.discount = 0
            this.isEdit = false;
        },
        ...mapActions('customersM',[
            'registrationCustomer',
            'editCustomerDB'
        ])

    }
}
</script>