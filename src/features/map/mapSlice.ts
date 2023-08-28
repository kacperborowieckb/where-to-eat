import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type PositionType = {
  lat: number;
  lng: number;
};

export type BoundsType = {
  ne: PositionType;
  sw: PositionType;
};

type MapState = {
  currentPosition: PositionType;
  bounds: BoundsType;
  selectedRestaurant: number | undefined;
};

const initialState: MapState = {
  currentPosition: { lat: 0, lng: 0 },
  bounds: { ne: { lat: 0, lng: 0 }, sw: { lat: 0, lng: 0 } },
  selectedRestaurant: undefined,
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setCurrentPosition: (state, action: PayloadAction<PositionType>) => {
      state.currentPosition = action.payload;
    },
    setBounds: (state, action: PayloadAction<BoundsType>) => {
      state.bounds = action.payload;
    },
    setSelectedRestaurant: (state, action: PayloadAction<number>) => {
      state.selectedRestaurant = action.payload;
    },
  },
});

export const { setCurrentPosition, setBounds, setSelectedRestaurant } = mapSlice.actions;

export const getCurrentPosition = (state: RootState) => state.map.currentPosition;
export const getBounds = (state: RootState) => state.map.bounds;
export const getSelectedRestaurant = (state: RootState) => state.map.selectedRestaurant;

export default mapSlice.reducer;
