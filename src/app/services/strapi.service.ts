import { Injectable } from '@angular/core';
import axios from 'axios';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class StrapiService {
  private baseUrl = 'http://45.147.251.201:1337/api';

  constructor(private authService: AuthService) {}

  private async getHeaders(): Promise<{ headers: { Authorization: string } }> {
    const token = this.authService.getToken();
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  async getAllItems(categoria: string) {
    console.log(await this.getHeaders(), `${this.baseUrl}/${categoria}`);

    return axios.get(`${this.baseUrl}/${categoria}`, await this.getHeaders());
  }

  async getItemById(categoria: string, id: number) {
    return axios.get(
      `${this.baseUrl}/${categoria}/${id}`,
      await this.getHeaders(),
    );
  }

  async createItem(categoria: string, data: any) {
    return axios.post(
      `${this.baseUrl}/${categoria}`,
      data,
      await this.getHeaders(),
    );
  }

  async updateItem(categoria: string, id: number, data: any) {
    return axios.put(
      `${this.baseUrl}/${categoria}/${id}`,
      data,
      await this.getHeaders(),
    );
  }

  async deleteItem(categoria: string, id: number) {
    return axios.delete(
      `${this.baseUrl}/${categoria}/${id}`,
      await this.getHeaders(),
    );
  }

  async getPublicPhotos() {
    return axios.get(`${this.baseUrl}/galerias?populate=*`);
  }
}
