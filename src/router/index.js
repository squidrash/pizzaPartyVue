import Vue from "vue";
import VueRouter from "vue-router";
import Orders from "../views/Orders.vue";
import Customers from "../views/Customers.vue";
import Menu from "../views/Menu.vue";
import SpecialOffers from "../views/SpecialOffers.vue";
import CurrentMenu from "@/components/CurrentMenu.vue";
import ArchiveMenu from "@/components/ArchiveMenu.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/menu",
    name: "Menu",
    component: Menu,
    children: [
      {
        path: "current",
        name: "CurrentMenu",
        component: CurrentMenu,
      },
      {
        path: "archive",
        name: "ArchiveMenu",
        component: ArchiveMenu,
      },
    ],
  },
  {
    path: "/offers",
    name: "SpecialOffers",
    component: SpecialOffers,
  },
  {
    path: "/orders",
    name: "Orders",
    component: Orders,
  },
  {
    path: "/orders/customer/:id",
    component: Orders,
  },
  {
    path: "/customers",
    name: "Customers",
    component: Customers,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
