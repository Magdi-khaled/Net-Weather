import type ICity from "@/types/useSavedQuery";
import { useRoute } from "vue-router";

export const useHelper = () => {
  const route = useRoute();

  const isCityExist = () => {
    const saved = localStorage.getItem("savedCities");
    const savedCities: ICity[] = saved ? JSON.parse(saved) : [];
    return savedCities.findIndex(
      (item) => item?.state === (route.params.state as string)
    );
  };

  return { isCityExist };
};
