class StudentManager {
	API_URL: string;

	constructor(apiUrl = "http://localhost:8054/") {
		this.API_URL = apiUrl;
	}

	/**
	 * Obtiene una lista de todos los estudiantes.
	 *
	 * @param {string} token - El token de autenticación.
	 * @returns {Promise<Alumno[]>} Una promesa que se resuelve con una lista de estudiantes.
	 * @throws {Error} Si ocurre un error durante la solicitud fetch o si la solicitud no es exitosa.
	 */
	async getStudents(token: string): Promise<Alumno[]> {
		try {
			console.log("StudentManager: Iniciando función getStudents...");
			console.log(
				"StudentManager: URL de la API:",
				this.API_URL + "api/v2/alumnos"
			);
			console.log("StudentManager: Token:", token);

			const response = await fetch(this.API_URL + "api/v2/alumnos", {
				method: "GET",
				headers: {
					Authorization: "Bearer " + token,
					"Content-Type": "application/json",
				},
			});

			console.log(
				"StudentManager: Código de estado de la respuesta:",
				response.status
			);
			console.log("StudentManager: Respuesta del servidor (cruda):", response);

			if (response.status === 204) {
				// No hay contenido, devolver un array vacío
				console.log("StudentManager: No hay alumnos disponibles.");
				return [];
			}

			if (!response.ok) {
				throw new Error(
					`StudentManager: Error en la solicitud: ${response.status}`
				);
			}

			const data = await response.json();
			console.log("StudentManager: Respuesta del servidor (JSON):", data);

			return data;
		} catch (error) {
			console.error("StudentManager: Error al obtener estudiantes:", error);
			throw error;
		}
	}

	/**
	 * Crea un nuevo estudiante.
	 *
	 * @param {string} token - El token de autenticación.
	 * @param {Alumno} student - El objeto del estudiante a crear.
	 * @returns {Promise<Alumno>} Una promesa que se resuelve con el objeto del estudiante creado.
	 * @throws {Error} Si ocurre un error durante la solicitud fetch o si la solicitud no es exitosa.
	 */
	async createStudent(token: string, student: Alumno): Promise<Alumno> {
		try {
			console.log("StudentManager: Iniciando función createStudent...");
			console.log(
				"StudentManager: URL de la API:",
				this.API_URL + "api/v2/alumnos"
			);
			console.log("StudentManager: Token:", token);
			console.log("StudentManager: Estudiante:", student);

			const response = await fetch(this.API_URL + "api/v2/alumnos", {
				method: "POST",
				headers: {
					Authorization: "Bearer " + token,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(student),
			});

			console.log(
				"StudentManager: Código de estado de la respuesta:",
				response.status
			);
			console.log("StudentManager: Respuesta del servidor (cruda):", response);

			if (!response.ok) {
				throw new Error(
					`StudentManager: Error en la solicitud: ${response.status}`
				);
			}

			const data = await response.json();
			console.log("StudentManager: Respuesta del servidor (JSON):", data);

			return data;
		} catch (error) {
			console.error("StudentManager: Error al crear estudiante:", error);
			throw error;
		}
	}

	/**
	 * Actualiza un estudiante existente.
	 *
	 * @param {string} token - El token de autenticación.
	 * @param {Alumno} student - El objeto del estudiante a actualizar.
	 * @returns {Promise<Alumno>} Una promesa que se resuelve con el objeto del estudiante actualizado.
	 * @throws {Error} Si ocurre un error durante la solicitud fetch o si la solicitud no es exitosa.
	 */
	async updateStudent(token: string, student: Alumno): Promise<Alumno> {
		try {
			console.log("StudentManager: Iniciando función updateStudent...");
			console.log(
				"StudentManager: URL de la API:",
				this.API_URL + "api/v2/alumnos/" + student.id
			);
			console.log("StudentManager: Token:", token);
			console.log("StudentManager: Estudiante:", student);

			const response = await fetch(
				this.API_URL + "api/v2/alumnos/" + student.id,
				{
					method: "PUT",
					headers: {
						Authorization: "Bearer " + token,
						"Content-Type": "application/json",
					},
					body: JSON.stringify(student),
				}
			);

			console.log(
				"StudentManager: Código de estado de la respuesta:",
				response.status
			);
			console.log("StudentManager: Respuesta del servidor (cruda):", response);

			if (!response.ok) {
				throw new Error(
					`StudentManager: Error en la solicitud: ${response.status}`
				);
			}

			const data = await response.json();
			console.log("StudentManager: Respuesta del servidor (JSON):", data);

			return data;
		} catch (error) {
			console.error("StudentManager: Error al actualizar estudiante:", error);
			throw error;
		}
	}

	/**
	 * Elimina un estudiante.
	 *
	 * @param {string} token - El token de autenticación.
	 * @param {number} id - El ID del estudiante a eliminar.
	 * @returns {Promise<void>} Una promesa que se resuelve cuando el estudiante se elimina correctamente.
	 * @throws {Error} Si ocurre un error durante la solicitud fetch o si la solicitud no es exitosa.
	 */
	async deleteStudent(token: string, id: number): Promise<void> {
		try {
			console.log("StudentManager: Iniciando función deleteStudent...");
			console.log(
				"StudentManager: URL de la API:",
				this.API_URL + "api/v2/alumnos/" + id
			);
			console.log("StudentManager: Token:", token);

			const response = await fetch(this.API_URL + "api/v2/alumnos/" + id, {
				method: "DELETE",
				headers: {
					Authorization: "Bearer " + token,
					"Content-Type": "application/json",
				},
			});

			console.log(
				"StudentManager: Código de estado de la respuesta:",
				response.status
			);
			console.log("StudentManager: Respuesta del servidor (cruda):", response);

			if (!response.ok) {
				throw new Error(
					`StudentManager: Error en la solicitud: ${response.status}`
				);
			}
		} catch (error) {
			console.error("StudentManager: Error al eliminar estudiante:", error);
			throw error;
		}
	}
}

interface Alumno {
	id: number;
	dni: string;
	nombres: string;
	apellidoPaterno: string;
	apellidoMaterno: string;
	correo: string;
	fechaNacimiento: string;
	telefono: string;
}

export default StudentManager;
