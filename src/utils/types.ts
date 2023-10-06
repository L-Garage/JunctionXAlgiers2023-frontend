export type UAV = {
	name: string;
	bat: {
		id: number;
		vl: number;
		pt: number;
	};
	gps: {
		fx: number;
		ns: number;
		lat: number;
		lon: number;
		abs: number;
		rel: number;
	};
	state: {
		in_air: boolean;
		armed: boolean;
		state: number;
		mav_msg: string;
		health: number;
		fm: number;
	};
};
export type Vehicle = {
	id: number;
	name: string;
	dataSourceId: number;
};
