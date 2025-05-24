export default interface ICity {
  id: string;
  city: string;
  state: string;
  coords: {
    lat: string;
    lng: string;
  };
}
