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

export async function authFromUser(user: User): Promise<string> {
	const response = await fetch("http://localhost:8053/auth/login", {
		headers: {
			"Content-Type": "application/json",
		},
		method: "POST",
		body: JSON.stringify(user),
	});
	const data = await response.json();
	return data.token;
}

export async function getAlumnos(jwt: string): Promise<any> {
	const response = await fetch("http://localhost:8053/apispring/alumnos", {
		method: "GET",
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});
	const data = await response.json();
	return data;
}
