import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface FullLocation {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode?: string;
}

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  private API_KEY = 'AIzaSyBVJlf7uveW3SMtwbytBoKhJluwxserCzA'; 

  constructor(private http: HttpClient) {}

  async getFullLocation(): Promise<FullLocation> {
    const coords = await this.getCurrentPosition();
    const details = await this.reverseGeocode(coords.latitude, coords.longitude);

    return {
      latitude: coords.latitude,
      longitude: coords.longitude,
      ...details
    };
  }

  private getCurrentPosition(): Promise<{ latitude: number; longitude: number }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Geolocation not supported');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          });
        },
        (err) => reject(err),
        {
          enableHighAccuracy: true
        }
      );
    });
  }

  private async reverseGeocode(lat: number, lng: number): Promise<any> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${this.API_KEY}`;

    const res: any = await firstValueFrom(this.http.get(url));

    if (!res.results || res.results.length === 0) {
      throw new Error('No address found');
    }

    const result = res.results[0];
    const components = result.address_components;

    const get = (type: string) =>
      components.find((c: any) => c.types.includes(type))?.long_name || '';

    return {
      address: result.formatted_address,
      city: get('locality') || get('administrative_area_level_2'),
      state: get('administrative_area_level_1'),
      country: get('country'),
      postalCode: get('postal_code')
    };
  }
}