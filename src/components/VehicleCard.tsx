import React, { useContext } from 'react';
import { UAV } from '../utils/types';
import { MapContext } from '../utils/context';

interface Props {
	type: 0 | 1;
	available: boolean;
	error: boolean;
	name: string;
	location?: UAV['gps'];
	click?: () => void;
}

const VehicleCard: React.FC<Props> = props => {
	const { map } = useContext(MapContext);
	const click = () => {
		if (!map) return;
		const currentMapLocation = map.getCenter();
		props.available && map?.flyTo([props.location?.lat || currentMapLocation.lat, props.location?.lon || currentMapLocation.lng], 18);
		!!props.click &&
			setTimeout(() => {
				!!props.click && props.click();
			}, 3000);
	};

	return (
		<div onClick={click} className="vehicle-card">
			<img src={`/assets/${props.type == 1 ? 'car' : 'drone'}.png`} alt="" />
			<div>
				<div className={`flex items-center gap-1 font-bold ${props.available ? 'text-[#1AB07A]' : 'text-red-600'}`}>
					<span className="text-lg pb-1">&bull;</span>
					<p className="text-sm">{props.available ? 'Available' : 'Unavailable'}</p>
				</div>
				<h2 className="font-bold text-[#EAEAEA] ml-1">{props.name}</h2>
			</div>
		</div>
	);
};

export default VehicleCard;
