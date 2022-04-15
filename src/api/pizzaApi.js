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
    async getArchiveMenu() {
      let request = "?IsActive=false";
      return await axios.get(url + `menu/fullmenu/${request}`);
    },
    async getFilteredMenu(filters) {
      // ?Category=Pizza&IsActive=false
      let request = "?";
      let isFirst = true;
      if (filters.isActive !== null) {
        request += `IsActive=${filters.isActive}`;
        isFirst = false;
      }
      if (isFirst !== true) {
        request += "&";
      }
      if (filters.categoryId !== null) {
        request += `Category=${filters.categoryId}`;
      }
      return await axios.get(url + `menu/fullmenu/${request}`);
    },
    async addToMenu(dish) {
      return await axios.post(url + "menu/add/", dish).catch(function(error) {
        errorHandler(error);
      });
    },
    async editMenu(dish) {
      console.log(dish);

      return await axios.put(url + "menu/edit/", dish).catch(function(error) {
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
  specialOffers: {
    async getSpecialOffers() {
      return await axios.get(url + "specialOffer/all").catch(function(error) {
        errorHandler(error);
      });
    },
    async addNewOffer(offer) {
      return await axios
        .post(url + "specialOffer/newOffer", offer)
        .catch(function(error) {
          errorHandler(error);
        });
    },
    async editOffer(offer) {
      return await axios
        .put(url + "specialOffer/edit", offer)
        .catch(function(error) {
          errorHandler(error);
        });
    },
    async removeOffer(id) {
      return await axios
        .delete(url + `specialOffer/delete/${id}`)
        .catch(function(error) {
          errorHandler(error);
        });
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
      if (filters.status != null) {
        request = `?status=${filters.status}`;
        isFirst = false;
      }
      if (filters.customers != null) {
        if (isFirst == true) {
          request = `?has_customer=${filters.customers}`;
          isFirst = false;
        } else {
          request += `&has_customer=${filters.customers}`;
        }
      }
      if (filters.address != null) {
        if (isFirst == true) {
          request = `?has_address=${filters.address}`;
          isFirst = false;
        } else {
          request += `&has_address=${filters.address}`;
        }
      }
      return await axios.get(url + `order/all/${request}`);
    },
    async postNewOrder(dishes, addressId) {
      let request = "";
      if (addressId !== 0) {
        request = `?addressId=${addressId}`;
      }
      return await axios.post(url + `order/create/${request}`, dishes);
    },
    async changeStatus(id, status) {
      return await axios
        .put(url + `order/changestatus/?orderId=${id}&orderStatus=${status}`)
        .catch(function(error) {
          errorHandler(error);
          return error;
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
  address: {
    async findAddress(address) {
      return await axios
        .post(url + `address/find/`, address)
        .catch(function(error) {
          errorHandler(error);
          return error;
        });
    },
  },
  // async images(image) {
  //   return await axios
  //     .post("https://localhost:5001/api/DishImage/addImages", image)
  //     .catch(function(error) {
  //       errorHandler(error);
  //     });
  // },
  // async getImage() {
  //   return await axios
  //     .get("https://localhost:5001/api/DishImage/getImages?name=Гиро")
  //     .catch(function(error) {
  //       errorHandler(error);
  //     });
  // },
};
