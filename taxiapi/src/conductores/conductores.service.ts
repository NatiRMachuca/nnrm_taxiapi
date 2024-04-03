import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ConductoresService {
    async getConductores() {
        const uri = "http://localhost:8080/conductores/";
        console.log(uri);
        try {
          const response = await axios.get(uri);
          return response.data;
        } catch (error) {
          console.error(error);
        }
    }

    async conductoresCercanos() {
      const uri = "http://localhost:8080/conductores/cercanos";
      console.log(uri);
      try {
        const response = await axios.post(uri);
        return response.data;
      } catch (error) {
        console.error(error);
      }
  }

}
