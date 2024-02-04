export interface ProfileInterface {
  profile_pictury?: string;
  brand_name?: string;
  phone_number?: string;
  country?: string;
  city?: string;
  address?: string;
  website?: string;
  type_slider?: TypeSlider;
  user_id?: string;
  brand_color?: string;
  whatsapp_message?: string;
}

// Define el enum
export enum TypeSlider {
  Simple = 'Simple',
  Double = 'Double',
  Landing = 'Landing',
}

export interface ClientInterface {
  name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  document: string;
  country: string;
}
