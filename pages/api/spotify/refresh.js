// api/spotify/refresh
import axios from 'axios';
const refresh_token = process.env.REFRESH_TOKEN;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

export default async function handler(req, res) {
	const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

	const response = await axios.post(
		'https://accounts.spotify.com/api/token',
		new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token,
		}),
		{
			headers: {
				Authorization: `Basic ${basic}`,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		}
	);

	res.json(response.data);
}
