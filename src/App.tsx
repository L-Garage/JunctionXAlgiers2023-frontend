import { useState, useMemo } from 'react';
import Map from './components/Map';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import { MapContext, VehicleContext, ViewingVehicleContext } from './utils/context';
import { UAV } from './utils/types';
import { Map as LeafletMap } from 'leaflet';

function App() {
	const [map, setMap] = useState<LeafletMap | null>(null);
	const [vehicles, setVehicles] = useState<UAV[]>([]);
	const [viewingVehicle, setViewingVehicle] = useState<UAV | null>(null);

	const vehicleContextValue = useMemo(() => ({ vehicles, setVehicles }), [vehicles, setVehicles]);
	const mapContextValue = useMemo(() => ({ map, setMap }), [map, setMap]);
	const viewingVehicleContextValue = useMemo(() => ({ viewingVehicle, setViewingVehicle }), [viewingVehicle, setViewingVehicle]);

	return (
		<MapContext.Provider value={mapContextValue}>
			<ViewingVehicleContext.Provider value={viewingVehicleContextValue}>
				<VehicleContext.Provider value={vehicleContextValue}>
					<main>
						<Map />
						<Outlet />
						{!!viewingVehicle && (
							<div className="absolute z-[100] rounded-xl right-2 left-auto bottom-4 bg-[#141414] p-4 w-[calc(100vw-var(--nav-width)-26rem)] h-[42%]">
								<h1 className="text-lg font-bold">{viewingVehicle.name}</h1>
								<p>
									GPS: {viewingVehicle.gps.lat}, {viewingVehicle.gps.lon}
								</p>
								<p>Battery Voltage: {viewingVehicle.bat.vl}</p>
								<p>Battery Power Supply Status: {viewingVehicle.bat.pt}%</p>
								<p>Sattelites: {viewingVehicle.gps.ns}</p>
								<p>In Air: {viewingVehicle.state.in_air ? 'Yes' : 'No'}</p>
							</div>
						)}
					</main>
					<Navbar />
				</VehicleContext.Provider>
			</ViewingVehicleContext.Provider>
		</MapContext.Provider>
	);
}

export default App;
