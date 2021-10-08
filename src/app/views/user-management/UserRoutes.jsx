import { MatxLoadable } from "matx";

const Membership = MatxLoadable({
  loader: () => import("./Membership"),
});
const Managers = MatxLoadable({
  loader: () => import("./Managers"),
});

const User = MatxLoadable({
  loader: () => import("./Users"),
});

const Groups = MatxLoadable({
  loader: () => import("./Groups"),
});

const Followers = MatxLoadable({
  loader: () => import("./Followers"),
});

const NewUser = MatxLoadable({
  loader: () => import("./CreateUser"),
});

const EditUser = MatxLoadable({
  loader: () => import("./EditUser"),
});

const userRoutes = [
  {
    path: "/membership",
    component: Membership,
  },
  {
    path: "/managers",
    component: Managers,
  },
  {
    path: "/users/",
    component: User,
  },
  {
    path: "/groups/",
    component: Groups,
  },

  {
    path: "/followers",
    component: Followers,
  },
  {
    path: "/user/details",
    component: Followers,
  },
  {
    path: "/user/edit",
    component: EditUser,
  },
  {
    path: "/user/new",
    component: NewUser,
  },
];

export default userRoutes;
