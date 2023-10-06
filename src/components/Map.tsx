import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useContext, useEffect, useRef, useState } from 'react';
import { UAV } from '../utils/types';
import { renderToString } from 'react-dom/server';
import { uavSocketLink } from '../utils/values';
import { MapContext, VehicleContext } from '../utils/context';

interface Props {}

const defaultCenter: LatLngExpression = [36.75963, 2.963334];

const Map: React.FC<Props> = (props: Props) => {
	const { vehicles } = useContext(VehicleContext);
	const { setMap } = useContext(MapContext);

	// use carto gray color map
	const tilesUrl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

	return (
		<MapContainer whenCreated={map => setMap(map)} center={defaultCenter} zoom={10} style={{ height: '100%', width: '100%', zIndex: 1 }}>
			<TileLayer url={tilesUrl} />

			{vehicles?.map((vehicle, i) => (
				<Marker
					icon={L.divIcon({
						className: '',
						html: renderToString(<img className="w-16 h-16" src={`/assets/drone-icon.png`} />),
					})}
					key={vehicle.name}
					position={[vehicle.gps.lat, vehicle.gps.lon]}
				>
					<Popup>
						<div>
							<h2>{vehicle.bat.id}</h2>
							<p>latitude: {vehicle.gps.lat}</p>
							<p>longitude: {vehicle.gps.lon}</p>
						</div>
					</Popup>
				</Marker>
			))}
		</MapContainer>
	);
};

export default Map;
