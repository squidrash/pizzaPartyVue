import axios from "axios";

const url = "https://localhost:5001/api/";

const errorHandler = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
  }
  console.log(error.config);
};

export default {
  menu: {
    async getMenu() {
      let request = "?IsActive=true";
      return await axios.get(url + `menu/fullmenu/${request}`);
    },
    async getFilteredMenu(filters) {
      // ?Category=Pizza&IsActive=false
      let request = "?";
      let isFirst = true;
      if (filters.isActive.value !== null) {
        request += `IsActive=${filters.isActive.value}`;
        isFirst = false;
      }
      if (isFirst !== true) {
        request += "&";
      }
      if (filters.category !== null) {
        request += `Category=${filters.category}`;
      }
      return await axios.get(url + `menu/fullmenu/${request}`);
    },
    async addToMenu(dish) {
      return await axios.post(url + "menu/add/", dish).catch(function(error) {
        // if (error.response) {
        //   // The request was made and the server responded with a status code
        //   // that falls out of the range of 2xx
        //   console.log(error.response.data);
        //   console.log(error.response.status);
        //   console.log(error.response.headers);
        // } else if (error.request) {
        //   // The request was made but no response was received
        //   // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        //   // http.ClientRequest in node.js
        //   console.log(error.request);
        // } else {
        //   // Something happened in setting up the request that triggered an Error
        //   console.log("Error", error.message);
        // }
        // console.log(error.config);
        errorHandler(error);
      });
    },
    async editMenu(dish) {
      console.log(dish);

      return await axios.put(url + "menu/edit/", dish).catch(function(error) {
        // if (error.response) {
        //   // The request was made and the server responded with a status code
        //   // that falls out of the range of 2xx
        //   console.log(error.response.data);
        //   console.log(error.response.status);
        //   console.log(error.response.headers);
        // } else if (error.request) {
        //   // The request was made but no response was received
        //   // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        //   // http.ClientRequest in node.js
        //   console.log(error.request);
        // } else {
        //   // Something happened in setting up the request that triggered an Error
        //   console.log("Error", error.message);
        // }
        // console.log(error.config);
        errorHandler(error);
      });
    },
    async removeDish(id) {
      return await axios.delete(url + `menu/delete/${id}`);
    },
  },
  categories: {
    async getCategories() {
      return await axios.get(url + "dishcategory/getCategories");
    },
  },
  orders: {
    async getAllOrders() {
      return await axios.get(url + `order/all/`);
    },
    async getCustomerOrders(id) {
      return await axios.get(url + `order/customer/${id}`);
    },
    async getFilteredOrders(filters) {
      // ?status=New&has_customer=false&has_address=false
      let request = "";
      let isFirst = true;
      if (filters.status.value != null) {
        request = `?status=${filters.status.value}`;
        isFirst = false;
      }
      if (filters.customers.value != null) {
        if (isFirst == true) {
          request = `?has_customer=${filters.customers.value}`;
          isFirst = false;
        } else {
          request += `&has_customer=${filters.customers.value}`;
        }
      }
      if (filters.address.value != null) {
        if (isFirst == true) {
          request = `?has_address=${filters.address.value}`;
          isFirst = false;
        } else {
          request += `&has_address=${filters.address.value}`;
        }
      }
      return await axios.get(url + `order/all/${request}`);
    },
    async changeStatus(id, status) {
      return await axios
        .put(url + `order/changestatus/?orderId=${id}&orderStatus=${status}`)
        .catch((err) => {
          console.log(err);
          alert("Нельзя изменить статус на выбранный");
        });
    },
  },
  customers: {
    async getAllCustomers() {
      return await axios.get(url + "customer/getall");
    },
    async getOneCustomer(id) {
      return await axios.get(url + `customer/getOneWithInfo/${id}`);
    },
    async registrationCustomer(customer) {
      return await axios.post(url + "customer/registration/", customer);
    },
    async editCustomer(customer) {
      return await axios.put(url + `customer/edit/`, customer);
    },
    async removeCustomer(id) {
      return await axios.delete(url + `customer/delete/${id}`);
    },
  },
};
