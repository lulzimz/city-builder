import { create } from "zustand";

const initialHouses = [
  { id: 1, title: "House 1", floors: 3, color: "orange" },
  { id: 2, title: "House 2", floors: 3, color: "green" },
  { id: 3, title: "House 3", floors: 3, color: "red" },
];

export const housesStore = create((set) => {
  return { houses: initialHouses, setHouses: (houses) => set({ houses }) };
});
