import { Octokit } from 'octokit';
import { Endpoints } from '@octokit/types';
import { unwantedRepos } from './consts';
import { ProjectProp } from './types/interface';

export type listUserReposResp =
	Endpoints['GET /users/{username}/repos']['response'];

export default async function getProjects() {
	const octokit = new Octokit({
		auth: process.env.GITHUB_ACCESS_TOKEN,
	});

	const data = (await octokit.request(
		'GET /users/{username}/repos?sort=created&direction=desc',
		{
			username: 'Nish7',
		}
	)) as listUserReposResp;

	const repos: listUserReposResp['data'] = data.data;

	const noPublic = repos.filter((r) => r.visibility === 'public');

	// Filtering unwanted repos;
	const noRepos = noPublic.filter(({ name }) => !unwantedRepos.includes(name));

	const extractData = noRepos.map(
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

	return extractData;
}
