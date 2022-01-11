// /api/spotify/index
const crypto = require('crypto');
const client_id = process.env.CLIENT_ID;
const redirect_uri = process.env.REDIRECT_URI;

export default function handler(req, res) {
	const state = crypto.randomBytes(20).toString('hex');
	const scope = 'user-read-currently-playing';

	res.redirect(
		'https://accounts.spotify.com/authorize?' +
			new URLSearchParams({
				response_type: 'code',
				client_id: client_id,
				scope: scope,
				redirect_uri: redirect_uri,
				state: state,
			})
	);
}
