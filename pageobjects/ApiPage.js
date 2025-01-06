import { expect } from '@playwright/test';
import { devConfig } from '../config/dev-config';
import { apiEndPoint } from '../config/constant-config';

class ApiPage {
  constructor(page) {
    this.page = page;
  }

  // API URL
  apiUrl = devConfig.apiUrl;

  //create a new user
  async createUser(userData) {
    const response = await this.page.request.post(`${this.apiUrl+apiEndPoint.REGISTER}`, {
      data: userData
    });
    const responseBody = await response.json();
    expect(response.status()).toBe(200); //user created
    return responseBody;
  }

  // get users
  async getUsers() {
    const response = await this.page.request.get(`${this.apiUrl+apiEndPoint.USERS}`);
    const responseBody = await response.json();
    expect(response.status()).toBe(200); //request successful
    return responseBody.data;
  }

  // get user by id
  async getUserById(userId) {
    const response = await this.page.request.get(`${this.apiUrl+apiEndPoint.USERS}/${userId}`);
    const responseBody = await response.json();
    expect(response.status()).toBe(200); //request successful
    return responseBody.data;
  }
}

export default ApiPage;
