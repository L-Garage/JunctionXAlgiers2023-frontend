import React, { useEffect, useState, useContext } from 'react';
import VehicleCard from '../components/VehicleCard';
import { api } from '../utils/api';
import { uavSocketLink } from '../utils/values';
import { VehicleContext, ViewingVehicleContext } from '../utils/context';
import VideoStream from '../components/VideoStream';
import { Vehicle } from '../utils/types';

const Home: React.FC = () => {
	const [currentVehicles, setCurrentVehicles] = useState([]);
	const [videoStreamUrl, setVideoStreamUrl] = useState('');

	const { vehicles, setVehicles } = useContext(VehicleContext);
	const { setViewingVehicle } = useContext(ViewingVehicleContext);

	useEffect(() => {
		let ws = new WebSocket(uavSocketLink);

		ws.onmessage = e => {
			const data = JSON.parse(e.data);
			setVehicles(data);
		};
		ws.onerror = error => {
			console.log(error);
		};
		ws.onopen = () => {
			ws.send(`connect:${localStorage.getItem('token')}`);
		};

		(async () => {
			try {
				const { data } = await api.get('/vehicle/list');
				if (!!data.vehicles) {
					setCurrentVehicles(data.vehicles);
				}
			} catch (error) {
				console.log((error as any).message);
			}
		})();

		return () => ws.close();
	}, []);

	useEffect(() => {
		console.log('videoStreamUrl', videoStreamUrl);
	}, [videoStreamUrl]);

	return (
		<>
			<div className="w-96 h-[calc(100%-1.5rem)] text-center overflow-y-auto bg-[var(--color-primary)] rounded-2xl py-6 px-4 absolute z-50 top-2 left-[calc(0.5rem+var(--nav-width))] ">
				<input className="w-full" type="text" placeholder="Search here" />
				<div className="flex flex-col gap-2 my-6">
					{!!currentVehicles.length ? (
						currentVehicles.map((vehicle: any, i: number) => (
							<VehicleCard
								key={i}
								click={() => {
									setVideoStreamUrl(vehicle.videoUrl ?? '');
									setViewingVehicle(vehicles.find(e => e.name == vehicle.name) ?? null);
								}}
								name={vehicle.name}
								type={vehicle.type}
								location={vehicles.find(e => e.name == vehicle.name)?.gps}
								available={!!vehicles.find(e => e.name == vehicle.name)}
								error={vehicle.error}
							/>
						))
					) : (
						<p className="text-[#969BA0]">No vehicles found</p>
					)}
				</div>
			</div>
			<VideoStream videoUrl={videoStreamUrl} />
		</>
	);
};

export default Home;
