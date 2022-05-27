import { writable } from 'svelte/store';
import type { PoiCategory } from './enums/PoiCategory';

export interface Poi {
	_id: string;
	name: string;
	desc?: string;
	category?: PoiCategory;
	lat?: number;
	lng?: number;
	img?: string;
}

export type PoiInput = Omit<Poi, '_id'>;

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
