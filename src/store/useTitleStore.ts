import { create } from "zustand";

interface TitleStore {
    title: string
    setTitle: (title: string) => void;
}

const useTitleStore = create<TitleStore>(set => ({
    title: 'PokéDex',
    setTitle: (title) => set(() => ({ title }))
}))

export default useTitleStore