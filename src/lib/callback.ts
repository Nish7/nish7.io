// /api/spotify/callback
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
const redirect_uri = process.env.REDIRECT_URI ?? '';
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const code = req.query.code as string;
	const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

	const resp = await axios.post(
		'https://accounts.spotify.com/api/token',
		new URLSearchParams({
			code,
			redirect_uri,
			grant_type: 'authorization_code',
		}),
		{
			headers: {
				Authorization: `Basic ${basic}`,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		}
	);

	res.json(resp.data);
}
