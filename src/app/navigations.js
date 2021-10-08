export const navigations = [
  {
    name: "Dashboard",
    path: "/dashboard/analytics",
    icon: "dashboard"
  },
  {
    name: "Orders",
    icon: "description",
    children : [
        {
          name: "Orders",
          path: "/orders/",
          iconText: "O"
        },
        {
          name: "Abadoned Orders",
          path: "/abadoned-orders/",
          iconText: "A"
        }
    ]
  },
  {
    name: "Product",
    icon: "local_grocery_store",
    children : [
     {  
       name: "Products",
        path: "/products",
        iconText: "P"
      },
      {
        name: "Tags",
        path: "/tags",
        iconText: "T"
      },
      {
        name: "Brands",
        path: "/brands",
        iconText: "B"
      },
      {
        name: "Categories",
        path: "/product-categories",
        iconText: "C"
      },
      {
        name: "Features",
        path: "/features",
        iconText: "F"
      }
   ]
  },
  // {
  //   name: "Withdrawal",
  //   icon: "credit_card",
  //   path: "/withdrawal"
  // },
  {
    name: "Coupons",
    icon: "card_giftcard",
    path: "/coupons"
  },
  {
    name: "Vendors",
    icon: "wc",
    path: '/vendors'
  },
  {
    name: "Customers",
    icon: "group",
    path: "/customers"
  },
  {
    name: "User Management",
    icon: "group_add",
    children: [
      {
        name: "Users",
        path: "/users",
        iconText: "B"
      },
      // {
      //   name: "Manager",
      //   path: "/managers",
      //   iconText: "E"
      // },
      // {
      //   name: "Group",
      //   path: "/groups",
      //   iconText: "E"
      // },
      // {
      //   name: "Membership",
      //   path: "/membership",
      //   iconText: "E"
      // },
      // {
      //   name: "Followers",
      //   path: "/followers",
      //   iconText: "E"
      // }
    ]
  },
  // {
  //   name: "Refund",
  //   icon: "cached",
  //   path: '/refund_requests'
  // },


  // {
  //   name: "Tags",
  //   icon: "local_offer",
  //   children: [
  //     {
  //       name: "Tags List",
  //       path: "/forms/basic",
  //       iconText: "B"
  //     },
  //     {
  //       name: "New Tags",
  //       path: "/forms/editor",
  //       iconText: "E"
  //     }
  //   ]
  // },
  // {
  //   name: "Inventory Management",
  //   icon: "store",
  //   path: "/others/drag-and-drop"
  // },  

  // {
  //   name: "Shipping",
  //   icon: "local_shipping",
  //   children: [
  //     {
  //       name: "Users List",
  //       path: "/forms/basic",
  //       iconText: "B"
  //     },
  //     {
  //       name: "New User",
  //       path: "/forms/editor",
  //       iconText: "E"
  //     }
  //   ]
  // },

  //  {
  //   name: "Draft Orders",
  //   icon: "border_color",
  //   children: [
  //     {
  //       name: "Users List",
  //       path: "/forms/basic",
  //       iconText: "B"
  //     },
  //     {
  //       name: "New User",
  //       path: "/forms/editor",
  //       iconText: "E"
  //     }
  //   ]
  // },
    
  {
    name: "Reviews",
    icon: "border_color",
    children: [
      {
        name: "Product Review",
        path: "/product-reviews",
        iconText: "B"
      },
      {
        name: "Store Review",
        path: "/store-reviews",
        iconText: "E"
      }
    ]
  },

  // {
  //   name: "Reports",
  //   icon: "border_color",
  //   children: [
  //     {
  //       name: "Users List",
  //       path: "/forms/basic",
  //       iconText: "B"
  //     },
  //     {
  //       name: "New User",
  //       path: "/forms/editor",
  //       iconText: "E"
  //     }
  //   ]
  // },

  // {
  //   name: "Support",
  //   icon: "border_color",
  //   children: [
  //     {
  //       name: "Users List",
  //       path: "/forms/basic",
  //       iconText: "B"
  //     },
  //     {
  //       name: "New User",
  //       path: "/forms/editor",
  //       iconText: "E"
  //     }
  //   ]
  // },
  
];
