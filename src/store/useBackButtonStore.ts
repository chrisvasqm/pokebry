import { create } from "zustand";

interface BackButtonStore {
    isVisible: boolean
    display: () => void;
    hide: () => void;
}

const useBackButtonStore = create<BackButtonStore>(set => ({
    isVisible: false,
    display: () => set(() => ({ isVisible: true })),
    hide: () => set(() => ({ isVisible: false }))
}))

export default useBackButtonStore