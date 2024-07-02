class AuthManager {
	API_URL: string;

	constructor(apiUrl = "http://localhost:8053/") {
		this.API_URL = apiUrl;
	}

	getTokenFromLocalStorage(): string | null {
		const token = localStorage.getItem("token");
		console.log("AuthManager: Obteniendo token del localStorage:", token);
		return token;
	}

	async decodeToken(token: string): Promise<any | null> {
		try {
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
				throw new Error(
					'AuthManager: El token no contiene un "sub" (subject).'
				);
			}

			return payload;
		} catch (error) {
			console.error("AuthManager: Error al decodificar el token:", error);
			return null;
		}
	}

	getUserRole(decodedToken: any): string | null {
		if (!decodedToken || !decodedToken.role) {
			return null;
		}

		const role = decodedToken.role[0].authority;
		console.log("AuthManager: Rol del usuario:", role);
		return role;
	}

	redirectToRolePage(role: string) {
		switch (role) {
			case "ADMIN":
				window.location.href = "/admin";
				break;
			case "USER":
				window.location.href = "/user";
				break;
			default:
				window.location.href = "/";
				break;
		}
	}

	logout() {
		localStorage.removeItem("token");
		location.reload();
	}

	async getTokenFromUsernamePassword(
		_username: string,
		_password: string
	): Promise<any> {
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

	saveTokenInLocalStorage(token: string) {
		console.log("AuthManager: Guardando el token en localStorage:", token);
		localStorage.setItem("token", token);
	}

	async registerUser(_username: string, _password: string): Promise<any> {
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

	async getUsersWithToken(token: string): Promise<any> {
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

	checkAuthentication(): boolean {
		const token = this.getTokenFromLocalStorage();

		if (token) {
			console.log("AuthManager: Usuario autenticado. Mostrando contenido.");
			return true;
		} else {
			console.log("AuthManager: Usuario no autenticado. Mostrando mensaje.");
			return false;
		}
	}

	checkExistingToken(): boolean {
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

	checkAuthenticationAndReplaceContent(element: HTMLElement) {
		if (!this.checkAuthentication()) {
			element.innerHTML =
				"<p>Necesitas autenticarte para acceder a esta página.</p>";
		}
	}
}

export default AuthManager;
