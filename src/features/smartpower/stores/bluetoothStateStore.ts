import {create} from 'zustand';

type State = {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
};

export const useBluetoothState = create<State>(set => ({
  enabled: false,
  setEnabled: (enabled: boolean) => set({enabled}),
}));
