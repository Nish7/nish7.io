import { Box } from '@chakra-ui/react';
import { memo, useEffect, useState } from 'react';
import NavLink from './NavLink';
import SectionTitle from './SectionTitle';
import StatusIcon from './StatusIcon';
import { tags_colors } from '@/lib/consts';
import getProjects from '@/lib/getProjects';
import { ProjectProp } from '@/lib/types/interface';

function ProjectList() {
	const [projectsData, setProjectData] = useState<ProjectProp[]>();

	useEffect(() => {
		getProjects().then((data) => setProjectData(data as ProjectProp[]));
	}, []);

	return (
		<Box mt={8}>
			<SectionTitle p_href="/projects">Recent Projects</SectionTitle>

			{projectsData &&
				projectsData
					.map(({ name, language }) => (
						<NavLink
							key={name}
							noActive
							href={'/projects/' + name.toLowerCase().split(' ').join('-')}
							icon={<StatusIcon color={tags_colors[language ?? 'Default']} />}
						>
							{name}
						</NavLink>
					))
					.slice(0, 4)}
		</Box>
	);
}

export default memo(ProjectList);
