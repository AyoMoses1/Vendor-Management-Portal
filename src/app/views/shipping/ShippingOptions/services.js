import routes from './routes';
import http from '../../../services/api';

class Services {
  async getShippingOptionDetails(optionId) {
    return await http.get(`${routes.shippingOptions}/${optionId}`);
  }

  async updateShippingOption(data){
    return await http.put_new(`${routes.shippingOptions}`, data);
  }

   async createShippingOption(data){
    return await http.post(routes.shippingOptions, data);
  }
}

export default new Services();
