import { currentUser, CurrentUser, LoginUser, RegisterUser } from '../data/UserStore';
import axios from 'axios';

export class AuthService {
	baseUrl = '';

	constructor(baseUrl) {
		this.baseUrl = baseUrl;
		const credentials = localStorage.placemark;
		if (credentials) {
			const savedUser: CurrentUser = JSON.parse(credentials);
			axios.defaults.headers.common.Authorization = 'Bearer ' + savedUser.token;
			currentUser.set({
				email: savedUser.email,
				token: savedUser.token,
				isAdmin: false,
			});
		}
	}

	async login(user: LoginUser) {
		try {
			const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, user);
			const isAdmin = await this.isAdmin();
			axios.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
			if (response.data.success) {
				currentUser.set({
					email: user.email,
					token: response.data.token,
					isAdmin,
				});
				localStorage.placemark = JSON.stringify({
					email: user.email,
					token: response.data.token,
				});
				return true;
			}
			return false;
		} catch (error) {
			return false;
		}
	}

	async logout() {
		currentUser.set({
			email: '',
			token: '',
			isAdmin: false,
		});
		axios.defaults.headers.common.Authorization = '';
		localStorage.removeItem('placemark');
	}

	async signup(newUser: RegisterUser) {
		try {
			await axios.post(this.baseUrl + '/api/users', newUser);
			return true;
		} catch (error) {
			return false;
		}
	}

	async isAdmin(): Promise<boolean> {
		try {
			const response = await axios.get<boolean>(this.baseUrl + '/api/users/isadmin');
			console.log(response.data);
			return response.data;
		} catch (error) {
			return null;
		}
	}
}
