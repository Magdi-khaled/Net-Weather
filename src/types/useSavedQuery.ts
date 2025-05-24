export default interface ICity {
  id: string;
  city: string;
  state: string;
  coords: {
    lat: any;
    lng: any;
  };
}
