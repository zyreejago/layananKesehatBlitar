export interface HealthcareFacility {
  id: number;
  name: string;
  address: string;
  phone: string;
  type: string;
  latitude: number;
  longitude: number;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}