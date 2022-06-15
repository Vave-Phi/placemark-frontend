import axios from 'axios';
import type { Poi, PoiInput } from '../data/PoiStore';
import { deletePoi, pois, upsertPoi } from '../data/PoiStore';

export class PoiService {
	baseUrl = '';

	constructor(baseUrl) {
		this.baseUrl = baseUrl + '/api/pois';
	}

	async find(filter?: { name: string; category: string }): Promise<Poi[]> {
		try {
			const response = await axios.get<Poi[]>(this.baseUrl, { params: filter });
			if (response.data) {
				pois.set(response.data);
				return response.data;
			}
			return [];
		} catch (error) {
			return [];
		}
	}

	async findOne(id: string): Promise<Poi | null> {
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

	async create(poi: PoiInput): Promise<Poi | null> {
		try {
			const response = await axios.post<Poi>(`${this.baseUrl}`, poi);
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

	async update(id: string, poi: Partial<PoiInput>) {
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

	async updateVisited(id: string) {
		try {
			await axios.put<Poi>(`${this.baseUrl}/${id}/visited`, {});
		} catch (error) {
			return;
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

	async uploadImage(id: string, image: FileList) {
		try {
			const formData = new FormData();
			formData.append('image', image.item(0));
			const response = await axios.post(`${this.baseUrl}/${id}/image`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			if (response.status === 200) {
				return response.data;
			}
			return null;
		} catch (error) {
			return null;
		}
	}

	async deleteImage(id: string, url: string) {
		try {
			const response = await axios.delete(`${this.baseUrl}/${id}/image`, { params: { url } });
			return response.status === 204;
		} catch (error) {
			return false;
		}
	}
}
