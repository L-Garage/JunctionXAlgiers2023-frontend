import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { UAV } from '../utils/types';

interface Props {}

const defaultCenter: LatLngExpression = [36.75963, 2.963334];

const Map: React.FC<Props> = (props: Props) => {
	const [uav, setUav] = useState<UAV[]>();

	const uavSocketLink = 'ws://127.0.0.1:4000/ws';

	useEffect(() => {
		const ws = new WebSocket(uavSocketLink);

		ws.onmessage = e => {
			const data = JSON.parse(e.data);
			setUav(data);
		};

		ws.onerror = error => {
			console.log(error);
		};

		return () => ws.close();
	}, []);

	return (
		<MapContainer center={defaultCenter} zoom={10} style={{ height: '100vh', width: '100vw', zIndex: 1 }}>
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

			{uav?.map((uav, i) => (
				<Marker key={i} position={[uav.gps.lat, uav.gps.lon]}>
					<Popup>
						<div>
							<h2>{uav.bat.id}</h2>
							<p>latitude: {uav.gps.lat}</p>
							<p>longitude: {uav.gps.lon}</p>
						</div>
					</Popup>
				</Marker>
			))}
		</MapContainer>
	);
};

export default Map;
