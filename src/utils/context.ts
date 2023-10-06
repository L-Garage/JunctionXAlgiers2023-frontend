import { createContext } from 'react';
import { UAV, Vehicle } from './types';
import { Map } from 'leaflet';

export const VehicleContext = createContext<{ vehicles: UAV[]; setVehicles: React.Dispatch<React.SetStateAction<UAV[]>> }>({
	vehicles: [],
	setVehicles: () => {},
});

export const MapContext = createContext<{ map: Map | null; setMap: React.Dispatch<React.SetStateAction<Map | null>> }>({
	map: null as any,
	setMap: () => {},
});

export const ViewingVehicleContext = createContext<{ viewingVehicle: UAV | null; setViewingVehicle: React.Dispatch<React.SetStateAction<UAV | null>> }>({
	viewingVehicle: null as any,
	setViewingVehicle: () => {},
});
