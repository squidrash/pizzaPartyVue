import axios from 'axios'

const url = "https://localhost:5001/api/"

export default {
    menu: {
        async getMenu() {

            return await axios
                .get(url + "menu/fullmenu/")

        },
        async addToMenu(dish) {
            return await axios
                .post(url + "menu/add/", dish)
        },
        async editMenu(dish) {
            console.log(dish);

            return await axios
                .put(url + "menu/edit/", dish)

        },
        async removeDish(id) {
            return await axios
                .delete(url + `menu/delete/${id}`)
        }
    },
    orders: {
        async getAllOrders() {
            return await axios
                .get(url + `order/all/`)
        },
        async getCustomerOrders(id) {
            return await axios
                .get(url + `order/customer/${id}`)
        },
        async getFilteredOrders(filters) {
            // ?status=New&has_customer=false&has_address=false
            let request = "";
            let isFirst = true;
            if (filters.status.value != null) {
                request = `?status=${filters.status.value}`
                isFirst = false;
            }
            if (filters.customers.value != null) {
                if (isFirst == true) {
                    request = `?has_customer=${filters.customers.value}`
                    isFirst = false;
                }
                else {
                    request += `&has_customer=${filters.customers.value}`
                }
            }
            if (filters.address.value != null) {
                if (isFirst == true) {
                    request = `?has_address=${filters.address.value}`
                    isFirst = false;
                }
                else {
                    request += `&has_address=${filters.address.value}`
                }
            }
            return await axios
                .get(url + `order/all/${request}`)
        },
        async changeStatus(id, status) {
            return await axios
                .put(url + `order/changestatus/?orderId=${id}&orderStatus=${status}`)
                .catch(err => {
                    console.log(err)
                    alert("Нельзя изменить статус на выбранный")
                })
        }
    },
    customers: {
        async getAllCustomers() {
            return await axios
                .get(url + 'customer/getall')
        },
        async getOneCustomer(id) {
            return await axios
                .get(url + `customer/getOneWithInfo/${id}`)
        },
        async registrationCustomer(customer) {
            return await axios
                .post(url + 'customer/registration/', customer)
        },
        async editCustomer(customer) {
            return await axios
                .put(url + `customer/edit/`, customer)
        },
        async removeCustomer(id) {
            return await axios
                .delete(url + `customer/delete/${id}`)
        }
    }
}