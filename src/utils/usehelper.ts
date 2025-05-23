import type ICity from "@/types/useSavedQuery";
import { useRoute } from "vue-router";

export const useHelper = () => {
  const route = useRoute();
  const isCityExist = (savedCities: ICity[]) => {
    if (localStorage.getItem("savedCities")) {
      savedCities = JSON.parse(localStorage.getItem("savedCities")) as ICity[];
    }
    return savedCities.find((item) => item?.state === route.params.state);
  };
  return {
    isCityExist,
  };
};
