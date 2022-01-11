// api/spotify/currentPlaying

import axios from 'axios';

export default async function handler(req, res) {
	// TODO: Change the link in production
	const {
		data: { access_token },
	} = await axios.get('http://localhost:3000/api/spotify/refresh');

	const { data } = await axios.get(
		'https://api.spotify.com/v1/me/player/currently-playing',
		{
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}
	);

	const item = data?.item;
	const song = { title: item?.name, artist_name: item?.artists[0]?.name };

	res.status(200).json(data ? song : '');
}
