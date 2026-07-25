import { storeToRefs } from "pinia";
import { useThemeStore } from "../../stores/theme";

export function useTheme() {
  const store = useThemeStore();

  const { dark } = storeToRefs(store);

  return {
    dark,
    toggleTheme: store.toggle,
  };
}