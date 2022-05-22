import axios from 'axios';
import type { Poi, PoiInput } from '../data/PoiStore';
import { upsertPoi, pois, deletePoi } from '../data/PoiStore';

export class PoiService {
	baseUrl = '';

	constructor(baseUrl) {
		this.baseUrl = baseUrl + '/api/pois';
	}

	async find() {
		try {
			const response = await axios.get<Poi[]>(this.baseUrl);
			if (response.data) {
				pois.set(response.data);
				return response.data;
			}
			return null;
		} catch (error) {
			return null;
		}
	}

	async findOne(id: string) {
		try {
			const response = await axios.get<Poi>(`${this.baseUrl}/${id}`);
			const poi = response.data;
			if (poi) {
				upsertPoi(poi);
				return poi;
			}
			return null;
		} catch (error) {
			return null;
		}
	}

	async create(poi: PoiInput) {
		try {
			const response = await axios.post<Poi>(`${this.baseUrl}/`, poi);
			const newPoi = response.data;
			if (newPoi) {
				upsertPoi(newPoi);
				return newPoi;
			}
			return null;
		} catch (error) {
			return null;
		}
	}

	async update(id: string, poi: PoiInput) {
		try {
			const response = await axios.put<Poi>(`${this.baseUrl}/${id}`, poi);
			const newPoi = response.data;
			if (newPoi) {
				upsertPoi(newPoi);
				return newPoi;
			}
			return null;
		} catch (error) {
			return null;
		}
	}

	async delete(id: string) {
		try {
			const response = await axios.delete(`${this.baseUrl}/${id}`);
			if (response.status === 204) {
				deletePoi(id);
				return true;
			}
			return false;
		} catch (error) {
			return false;
		}
	}

	async deleteAll() {
		try {
			const response = await axios.delete(`${this.baseUrl}`);
			if (response.status === 204) {
				pois.set([]);
				return true;
			}
			return false;
		} catch (error) {
			return false;
		}
	}
}