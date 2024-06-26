import type { APIRoute } from "astro";
import { decodeToken, getSubjectFromLocalToken, getSubjectFromToken, type User } from "../../../scripts/InteractionAPI";

export const POST: APIRoute = async ({ request, cookies }) => {
	const data = await request.formData();

	const response = await fetch("http://localhost:8053/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username: data.get("username"),
			password: data.get("password"),
		}),
	});

	if (!(response.status === 200)) {
		return new Response("something wrong happened!", {
			status: response.status,
		});
	}

	const responseData = await response.json();
	console.log(responseData)
    const token = getSubjectFromToken(responseData.token)
	const day = token.exp / 1000 / 60 / 24
	console.log(day)
	console.log(token)
	cookies.set("token", responseData.token, { path: "/", httpOnly: true });
	return new Response("", { status: 200 });
};
