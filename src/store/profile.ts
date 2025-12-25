import { type StateCreator } from "zustand";

export interface UserProfile {
  id: string;
  name: string;
  phoneNumber?: string;
  email?: string;
  avatar?: string;
  roles: string[];
  systemRoles?: string[];
  [key: string]: any;
}

export type ProfileEntry = {
  profile: UserProfile | null;
  isLoading: boolean;
  setProfile: (profile: UserProfile | null) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  clearProfile: () => void;
  initializeProfile: () => void;
  // setRoles: (roles: string[]) => void;
  setSystemRoles: (systemRoles: string[]) => void;
};

export const initState = {
  profile: {} as UserProfile | null,
  isLoading: true,
};

export const ProfileCreator: StateCreator<ProfileEntry> = (set, get) => ({
  ...initState,

  setProfile: (profile: UserProfile | null) =>
    set(() => ({ profile, isLoading: false })),

  updateProfile: (updates: Partial<UserProfile>) => {
    const currentProfile = get().profile;
    if (currentProfile) {
      set(() => ({ profile: { ...currentProfile, ...updates } }));
    }
  },

  clearProfile: () =>
    set(() => ({ profile: {} as UserProfile | null, isLoading: false })),

  initializeProfile: () => set(() => ({ ...initState })),

  setSystemRoles: (systemRoles: string[]) => {
    const currentProfile = get().profile;
    if (currentProfile) {
      set(() => ({ profile: { ...currentProfile, systemRoles } }));
    }
  },
});
