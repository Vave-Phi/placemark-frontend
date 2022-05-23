import axios from 'axios';
import { deleteUser, upsertUser, User, users } from '../data/UserStore';

export class UserService {
	baseUrl = '';

	constructor(baseUrl) {
		this.baseUrl = baseUrl + '/api/users';
	}

	async find(): Promise<User[]> {
		try {
			const response = await axios.get<User[]>(this.baseUrl);
			if (response.data) {
				users.set(response.data);
				return response.data;
			}
			return [];
		} catch (error) {
			return [];
		}
	}

	async findOne(id: string) {
		try {
			const response = await axios.get<User>(`${this.baseUrl}/${id}`);
			const user = response.data;
			if (user) {
				upsertUser(user);
				return user;
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
				deleteUser(id);
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
				users.set([]);
				return true;
			}
			return false;
		} catch (error) {
			return false;
		}
	}
}
