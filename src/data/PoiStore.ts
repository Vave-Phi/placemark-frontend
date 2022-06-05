import { writable } from 'svelte/store';

export interface Poi {
	_id: string;
	name: string;
	desc?: string;
	category?: string;
	lat?: number;
	lng?: number;
	visitedAmount?: number;
	img?: string;
	weather: Weather;
	creator: string;
}

export type PoiInput = Omit<Poi, '_id'>;

export type Weather = {
	//openweathermap api call response data
	coord: {
		lat: number;
		lon: number;
	};
	weather: [
		{
			id: number;
			main: string;
			description: string;
			icon: string;
		},
	];
	base: string;
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		humidity: number;
	};
	wind: {
		speed: number;
		deg: number;
	};
	clouds: {
		all: number;
	};
	dt: number;
	sys: {
		type: number;
		id: number;
		country: string;
		sunrise: number;
		sunset: number;
	};
	timezone: number;
	id: number;
	name: string;
	cod: number;
};

export const pois = writable<Poi[]>([]);

export function deletePoi(id: string) {
	pois.update((it) => it.filter((u) => u._id === id));
}

export function upsertPoi(poi: Poi) {
	deletePoi(poi._id);
	pois.update((it) => {
		it.push(poi);
		return it;
	});
}
