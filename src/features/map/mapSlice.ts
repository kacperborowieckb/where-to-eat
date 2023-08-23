import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

type PositionType = {
  lat: number;
  lng: number;
};

type BoundsType = {
  ne: PositionType;
  sw: PositionType;
};

type MapState = {
  currentPosition: PositionType;
  bounds: BoundsType;
};

const initialState: MapState = {
  currentPosition: { lat: 0, lng: 0 },
  bounds: { ne: { lat: 0, lng: 0 }, sw: { lat: 0, lng: 0 } },
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
  },
});

export const { setCurrentPosition, setBounds } = mapSlice.actions;

export const getCurrentPosition = (state: RootState) => state.map.currentPosition;

export default mapSlice.reducer;
