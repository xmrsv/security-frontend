export interface User {
	username: string;
	password: string;
}

export interface Alumno {
	dni: string;
	nombres: string;
	pellidoPaterno: string;
	apellidoMaterno: string;
	correo: string;
	fechaNacimiento: Date;
	telefono: string;
}

export interface JWT {}

export async function authFromUser(user: User): Promise<Response> {
	return await fetch("http://localhost:8053/auth/login", {
		headers: {
			"Content-Type": "application/json",
		},
		method: "POST",
		body: JSON.stringify(user),
	});
}

export async function getAlumnos(jwt: string) {
	const response = await fetch("http://localhost:8053/api/alumnos", {
		method: "GET",
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});
	const data = await response.json();
	return data;
}

export function getSubjectFromLocalToken() {
	const tokenSplitted = localStorage.getItem("token").split(".");
	const payloadFromToken = JSON.parse(atob(tokenSplitted[1]));
	return payloadFromToken.sub;
}

export function getSubjectFromToken(token: string) {
	const tokenSplitted = token.split(".");
	const payloadFromToken = JSON.parse(atob(tokenSplitted[1]));
	return payloadFromToken;
}

export function decodeToken(token: string) {
	const tokenSplitted = token.split(".");

	const header = JSON.parse(atob(tokenSplitted[0]));
	const payload = JSON.parse(atob(tokenSplitted[1]));
	const signature = JSON.parse(atob(tokenSplitted[2]));

	return {
		header,
		payload,
		signature,
	};
}

export function logoutLocally() {
	localStorage.removeItem("token");
}
