import { Box, Link } from '@chakra-ui/react';
import React from 'react';
import NavLink from './NavLink';
import SectionTitle from './SectionTitle';
import StatusIcon from './StatusIcon';
import { tags_colors } from '../../lib/enums';

function ProjectList({ projectsData }) {
	return (
		<Box mt={10}>
			<SectionTitle>
				<Link href="/projects">Recent Projects</Link>
			</SectionTitle>

			{projectsData &&
				projectsData
					.map(({ name, language }) => (
						<NavLink
							key={name}
							noActive
							href={'/projects/' + name.toLowerCase().split(' ').join('-')}
							icon={<StatusIcon color={tags_colors[language]} />}
						>
							{name}
						</NavLink>
					))
					.slice(0, 4)}
		</Box>
	);
}

export default ProjectList;
