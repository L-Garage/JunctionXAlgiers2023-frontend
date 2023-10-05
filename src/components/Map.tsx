import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Props {}

const defaultCenter: LatLngExpression = [36.75963, 2.963334];

const Map: React.FC<Props> = (props: Props) => {
	return (
		<MapContainer center={defaultCenter} zoom={10} style={{ height: '100vh', width: '100vw', zIndex: 1 }}>
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
		</MapContainer>
	);
};

export default Map;
