export const getAPIs = {
  login_user: {
    name: "login_user",
    path: "/api/auth/login_user",
    method: "POST",
  },
  create_item: {
    name: "create_item",
    path: "/api/items/create_item",
    method: "POST",
  },
  get_all_items: {
    name: "get_all_items",
    path: "/api/items/get_all_items",
    method: "GET",
  },
  update_user: {
    name: "update_user",
    path: "/api/users/update_user",
    method: "PUT",
  },
  create_order: {
    name: "create_order",
    path: "/api/orders/create_order",
    method: "POST",
  },
};
