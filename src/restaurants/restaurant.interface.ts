export interface IRestaurant {
  restaurant_name: string;
  id: number;
  cuisine_name: string;
  location: ILocation;
  address: string;
  average_rating: number | null;
  review: string | null;
}

export interface ILocation {
  x: number;
  y: number;
}

export interface ICuisine {
  id: number;
  cuisine_name: string;
  description: string;
}
