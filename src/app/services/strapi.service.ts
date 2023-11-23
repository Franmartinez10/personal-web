import { Injectable } from '@angular/core';
import axios from 'axios';
import { AuthService } from './auth.service';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class StrapiService {
  // private baseUrl = 'http://45.147.251.201:1337/api';
  private baseUrl = environment.apiUrl;

  private axiosConf = axios.create({
    baseURL: this.baseUrl, // Reemplaza con la URL de tu API
    timeout: 5000, // Tiempo de espera para la solicitud (opcional)
    httpsAgent: {
      rejectUnauthorized: false, // Deshabilita la verificación SSL
    },
  });

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

    return this.axiosConf.get(
      `${this.baseUrl}/${categoria}`,
      await this.getHeaders(),
    );
  }

  async getItemById(categoria: string, id: number) {
    return this.axiosConf.get(
      `${this.baseUrl}/${categoria}/${id}`,
      await this.getHeaders(),
    );
  }

  async createItem(categoria: string, data: any) {
    return this.axiosConf.post(
      `${this.baseUrl}/${categoria}`,
      data,
      await this.getHeaders(),
    );
  }

  async updateItem(categoria: string, id: number, data: any) {
    return this.axiosConf.put(
      `${this.baseUrl}/${categoria}/${id}`,
      data,
      await this.getHeaders(),
    );
  }

  async deleteItem(categoria: string, id: number) {
    return this.axiosConf.delete(
      `${this.baseUrl}/${categoria}/${id}`,
      await this.getHeaders(),
    );
  }

  async getPublicPhotos() {
    console.log(this.baseUrl);

    return this.axiosConf.get(`${this.baseUrl}/galerias?populate=*`);
  }
}
