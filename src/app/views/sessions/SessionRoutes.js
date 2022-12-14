import SignIn from "./SignIn";
import NotFound from "./NotFound";
import ForgotPassword from "./ForgotPassword";
import EnterNewPassword from "./EnterNewPassword";
import PasswordCreated from "./PasswordCreated"
import Profile from "./Profile";

const settings = {
  activeLayout: "layout1",
  layout1Settings: {
    topbar: {
      show: false
    },
    leftSidebar: {
      show: false,
      mode: "close"
    }
  },
  layout2Settings: {
    mode: "full",
    topbar: {
      show: false
    },
    navbar: { show: false }
  },
  secondarySidebar: { show: false },
  footer: { show: false }
};

const sessionRoutes = [

  {
    path: "/signin",
    component: SignIn,
    settings
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
    settings
  },
  {
    path: "/enter-new-password",
    component: EnterNewPassword,
    settings
  },
  {
    path: "/password-created",
    component: PasswordCreated,
    settings
  },
  
  {
    path: "/404",
    component: NotFound,
    settings
  }
];

export default sessionRoutes;
