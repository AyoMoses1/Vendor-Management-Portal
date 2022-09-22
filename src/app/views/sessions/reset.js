import route from './Passwordroute';
import http from '../../services/api';

class Reset {
  async resetUserPassword(data) {
    console.log({ data })
    return await http.post(route.passwordReset, data);
  }

  async userChangePassword(payload){
    console.log(payload);
    return await http.put_new(`${route.passwordConfirm(payload?.otp)}`, payload.data);
  }

}

export default new Reset();