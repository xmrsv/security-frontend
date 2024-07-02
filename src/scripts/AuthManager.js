// src/utils/AuthManager.js
class AuthManager {
	constructor() {
		this.API_URL = "http://localhost:8053/"; // Reemplaza con la URL de tu API
	}

	getTokenFromLocalStorage() {
		const token = localStorage.getItem("token");
		console.log("AuthManager: Obteniendo token del localStorage:", token);
		return token;
	}

	decodeToken(token) {
		if (!token) {
			throw new Error("AuthManager: No se proporcionó ningún token.");
		}

		console.log("AuthManager: Decodificando token:", token);
		const parts = token.split(".");
		if (parts.length !== 3) {
			throw new Error("AuthManager: Token inválido");
		}

		const payload = JSON.parse(atob(parts[1]));
		console.log("AuthManager: Carga útil del token decodificada:", payload);

		if (!payload.sub) {
			throw new Error('AuthManager: El token no contiene un "sub" (subject).');
		}

		console.log("AuthManager: Subject del token:", payload.sub);

		// Obtener los roles del usuario
		const roles = payload.roles || []; // Si no hay roles, se devuelve un array vacío
		console.log("AuthManager: Roles del usuario:", roles);

		return {
			sub: payload.sub,
			roles: roles,
		};
	}

	async getTokenFromUsernamePassword(_username, _password) {
		console.log(
			"AuthManager: Iniciando función getTokenFromUsernamePassword..."
		);
		console.log("AuthManager: URL de la API:", this.API_URL + "auth/login");
		console.log("AuthManager: Usuario:", _username);
		console.log("AuthManager: Contraseña:", _password);

		try {
			const response = await fetch(this.API_URL + "auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: _username,
					password: _password,
				}),
			});

			console.log(
				"AuthManager: Código de estado de la respuesta:",
				response.status
			);
			console.log("AuthManager: Respuesta del servidor (cruda):", response);

			const data = await response.json();
			console.log("AuthManager: Respuesta del servidor (JSON):", data);

			return data;
		} catch (error) {
			console.error("AuthManager: Error durante la solicitud fetch:", error);
			throw error;
		}
	}

	saveTokenInLocalStorage(token) {
		console.log("AuthManager: Guardando el token en localStorage:", token);
		localStorage.setItem("token", token);
	}

	async registerUser(_username, _password) {
		console.log("AuthManager: Iniciando función registerUser...");
		console.log("AuthManager: URL de la API:", this.API_URL + "auth/register");
		console.log("AuthManager: Usuario:", _username);
		console.log("AuthManager: Contraseña:", _password);

		try {
			const response = await fetch(this.API_URL + "auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: _username,
					password: _password,
				}),
			});

			console.log(
				"AuthManager: Código de estado de la respuesta:",
				response.status
			);
			console.log("AuthManager: Respuesta del servidor (cruda):", response);

			const data = await response.json();
			console.log("AuthManager: Respuesta del servidor (JSON):", data);

			return data;
		} catch (error) {
			console.error("AuthManager: Error durante la solicitud fetch:", error);
			throw error;
		}
	}

	async getUsersWithToken(token) {
		try {
			console.log("AuthManager: Iniciando función getUsersWithToken...");
			console.log("AuthManager: URL de la API:", this.API_URL + "api/alumnos");
			console.log("AuthManager: Token:", token);

			const response = await fetch(this.API_URL + "api/alumnos", {
				method: "GET",
				headers: {
					Authorization: "Bearer " + token,
					"Content-Type": "application/json",
				},
			});

			console.log(
				"AuthManager: Código de estado de la respuesta:",
				response.status
			);
			console.log("AuthManager: Respuesta del servidor (cruda):", response);

			if (!response.ok) {
				throw new Error(
					`AuthManager: Error en la solicitud: ${response.status}`
				);
			}

			const data = await response.json();
			console.log("AuthManager: Respuesta del servidor (JSON):", data);

			return data;
		} catch (error) {
			console.error("AuthManager: Error al obtener usuarios:", error);
			throw error;
		}
	}

	checkAuthentication() {
		const token = this.getTokenFromLocalStorage();

		if (token) {
			console.log("AuthManager: Usuario autenticado. Mostrando contenido.");
			return true;
		} else {
			console.log("AuthManager: Usuario no autenticado. Mostrando mensaje.");
			return false;
		}
	}

	checkExistingToken() {
		const token = this.getTokenFromLocalStorage();
		console.log("AuthManager: Token encontrado en localStorage:", token);

		if (token) {
			console.log(
				"AuthManager: Ya existe una sesión iniciada. Bloqueando el formulario."
			);
			return true;
		} else {
			console.log(
				"AuthManager: No se encontró ninguna sesión iniciada. Mostrando el formulario."
			);
			return false;
		}
	}
}

export default AuthManager;
