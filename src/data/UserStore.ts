import { writable } from 'svelte/store';

export interface CurrentUser {
	email: string;
	token: string;
	isAdmin: boolean;
}

export interface RegisterUser {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	isAdmin: boolean;
}

export type LoginUser = Omit<RegisterUser, 'firstName' | 'lastName' | 'isAdmin'>;

export type User = Omit<RegisterUser, 'password' | 'isAdmin'> & { _id: string };

export const currentUser = writable<CurrentUser>({
	email: '',
	token: '',
	isAdmin: false,
});

export const users = writable<User[]>([]);

export function deleteUser(id: string) {
	users.update((it) => it.filter((u) => u._id === id));
}

export function upsertUser(user: User) {
	deleteUser(user._id);
	users.update((it) => {
		it.push(user);
		return it;
	});
}
