export function enumKeys(Enum: any, keyType = 'number') {
	return Object.keys(Enum).filter((k) => typeof Enum[k as any] === keyType);
}

export function enumValues(Enum: any, keyType = 'number') {
	const keys = enumKeys(Enum, keyType);
	return keys.map((k) => Enum[k as any]);
}
