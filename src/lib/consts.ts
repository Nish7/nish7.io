export const tags_colors: Record<string, string> = {
	JavaScript: 'yellow',
	Java: 'orange',
	C: 'pink',
	'C++': 'teal',
	CPP: 'teal',
	cpp: 'teal',
	Go: 'green',
	Elixir: 'purple',
	Lua: 'purple',
	TypeScript: 'blue',
	HTML: 'purple',
	Shell: 'green',
	Zig: 'orange',
	Website: 'red',
	Portfolio: 'blue',
	Reading: 'purple',
	Default: 'gray',
};

export const unwantedRepos = ['Nish7'];

export const manualProjects = [
	{
		name: 'Zag-Smalltalk',
		html_url: 'https://github.com/Zag-Research/Zag-Smalltalk',
		description: 'Smalltalk VM Written in Zig with methods stored as type-annotated ASTs',
		created_at: '2021-02-25T07:40:57Z',
		language: 'Zig',
		topics: ['compiler', 'interpreter', 'smalltalk', 'zig'],
		homepage: null,
	},
];

export const colorSchemes: Record<
	string,
	{ bg: string; borderColor: string; color: string }
> = {
	red: {
		bg: 'rgba(228, 62, 62, 0.1)',
		borderColor: 'rgba(171, 119, 119,0.1)',
		color: 'red.500',
	},
	blue: {
		bg: 'rgba(0, 67, 255,0.1)',
		borderColor: 'rgba(0, 67, 255,0.1)',
		color: 'blue.500',
	},
	gray: {
		bg: 'rgb(91, 91, 91,0.15)',
		borderColor: 'rgba(91, 91, 91,0.1)',
		color: 'gray.500',
	},
	purple: {
		bg: 'rgba(140, 0, 255,0.1)',
		borderColor: 'rgba(140, 0, 255,0.1)',
		color: 'purple.500',
	},
	green: {
		bg: 'rgba(63, 255, 85,0.2)',
		borderColor: 'rgba(63, 255, 85,0.1)',
		color: 'green.500',
	},
	yellow: {
		bg: 'rgb(243, 255, 76, 0.2)',
		borderColor: 'rgb(243, 255, 76,0.1)',
		color: 'yellow.500',
	},
	orange: {
		bg: 'rgba(255, 93, 0,0.2)',
		borderColor: 'rgba(255, 93, 0,0.2)',
		color: 'orange.500',
	},
	pink: {
		bg: 'rgba(255, 0, 234,0.2)',
		borderColor: 'rgba(255, 0, 234,0.2)',
		color: 'pink.500',
	},
	teal: {
		bg: 'rgba(56, 178, 172, 0.2)',
		borderColor: 'rgba(56, 178, 172, 0.2)',
		color: 'teal.500',
	}
};
