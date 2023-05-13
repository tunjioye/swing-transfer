import { entity, persistence } from "simpler-state";

export type ColorScheme = "light" | "dark";

export type PageStoreState = {
  colorScheme: ColorScheme;
};

// initial state
const initialState: PageStoreState = {
  colorScheme: "light",
};

// entity
export const page = entity(initialState, [persistence("st_page")]);

// entity updaters
export const setColorScheme = (colorScheme: ColorScheme = "light") => {
  return page.set((value) => ({
    ...value,
    colorScheme,
  }));
};

// entity actions
export const toggleColorScheme = () => {
  const { colorScheme } = page.get();
  setColorScheme(colorScheme === "dark" ? "light" : "dark");
};
