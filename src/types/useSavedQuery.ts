export default interface ICity {
  city: string;
  state: string;
  coords: {
    lat: number;
    lng: number;
  };
}
