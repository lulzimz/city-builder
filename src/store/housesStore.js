import { create } from "zustand";

const initialHouses = [
  { id: 1, title: "House 1", floors: 3, color: "orange" },
  { id: 2, title: "House 2", floors: 3, color: "green" },
  { id: 3, title: "House 3", floors: 3, color: "red" },
];

export const housesStore = create((set, get) => {
  return {
    houses: initialHouses,
    setHouses: (houses) => set({ houses }),
    addHouse: (house) => set({ houses: [...get().houses, house] }),
    deleteHouse: (id) =>
      set({ houses: get().houses.filter((item) => item.id !== id) }),
    editHouse: (id, key, value) =>
      set({
        houses: get().houses.map((house) =>
          house.id === id ? { ...house, [key]: value } : house
        ),
      }),
  };
});
