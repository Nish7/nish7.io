import { Octokit } from 'octokit';

export default async function getProjects() {
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

	data = data.filter((p) => p.name != 'Nish7');

	data = data.map(
		({
			name,
			description,
			created_at,
			language,
			topics,
			homepage,
			html_url,
		}) => ({
			name,
			html_url,
			description,
			created_at,
			language,
			topics,
			homepage,
		})
	);

	return data;
}
