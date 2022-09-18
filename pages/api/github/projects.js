import { Octokit, App } from 'octokit';

export default async function handler(req, res) {
	const octokit = new Octokit({
		auth: process.env.GITHUB_ACCESS_TOKEN,
	});

	let data = await octokit.request(
		'GET /users/{username}/repos?sort=created&direction=desc',
		{
			username: 'Nish7',
		}
	);

	data = data.data.filter((r) => r.visibility === 'public');

	data = data.map(
		({ name, url, description, created_at, language, topics, homepage }) => ({
			name,
			url,
			description,
			created_at,
			language,
			topics,
			homepage,
		})
	);

	res.status(200).json(data);
}
