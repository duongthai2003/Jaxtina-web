import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type ProfileEntry, ProfileCreator } from "./profile";

export const useProfileStore = create<ProfileEntry>()(
  persist(ProfileCreator, {
    name: "profile-storage",
    partialize: (state) => ({
      profile: state.profile,
    }),
  })
);
