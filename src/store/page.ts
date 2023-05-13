import { entity, persistence } from "simpler-state";

export type ColorSchemeType = "light" | "dark";

export type PageStoreStateType = {
  colorScheme: ColorSchemeType;
};

// initial state
const initialState: PageStoreStateType = {
  colorScheme: "light",
};

// entity
export const page = entity(initialState, [persistence("st_page")]);

// entity updaters
export const setColorScheme = (colorScheme: ColorSchemeType = "light") => {
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
