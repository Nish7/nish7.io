// api/spotify/currentPlaying
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
	const {
		data: { access_token },
	} = await axios.get('http://nish7.xyz/api/spotify/refresh');

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
