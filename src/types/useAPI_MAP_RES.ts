interface IContext {
  id: string;
  mapbox_id: string;
  short_code: string;
  text: string;
  wikidata: string[];
}
export default interface API_MAP_RES {
  bbox: number[];
  center: [];
  context: IContext[];
  geometry: { type: string; coordinates: [x: number, y: number] };
  id: string;
  place_name: string;
  place_type: string[];
  properties: { mapbox_id: string; wikidata: string };
  relevance: number;
  text: string;
  type: string;
}
