import route from './route';
import http from '../../../services/api';

class Reset {
  async resetUserPassword(data) {
    return await http.post(route.passwordReset, data);
  }

  async userChangePassword(data){
    return await http.put_new(`${route.passwordReset}`, data);
  }

   async confirmPasswordReset(data){
    return await http.put_new(`${route.passwordReset}`, data);
  }
}

export default new Reset();