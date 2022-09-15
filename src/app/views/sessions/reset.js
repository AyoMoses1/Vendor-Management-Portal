import route from './Passwordroute';
import http from '../../services/api';

class Reset {
  async resetUserPassword(data) {
    console.log({ data })
    return await http.post(route.passwordReset, data);
  }

  async userChangePassword(data){
    return await http.put_new(`${route.passwordConfirm}`, data);
  }

}

export default new Reset();