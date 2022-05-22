import { currentUser, CurrentUser, RegisterUser, LoginUser } from '../data/UserStore';
import axios from 'axios';

export class AuthService {
	baseUrl = '';

	constructor(baseUrl) {
		this.baseUrl = baseUrl;
		const credentials = localStorage.placemark;
		if (credentials) {
			const savedUser: CurrentUser = JSON.parse(credentials);
			currentUser.set({
				email: savedUser.email,
				token: savedUser.token,
			});
			axios.defaults.headers.common.Authorization = 'Bearer ' + savedUser.token;
		}
	}

	async login(user: LoginUser) {
		try {
			const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, user);
			axios.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
			if (response.data.success) {
				currentUser.set({
					email: user.email,
					token: response.data.token,
				});
				localStorage.donation = JSON.stringify({
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
		currentUser.set({ email: '', token: '' });
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
}
