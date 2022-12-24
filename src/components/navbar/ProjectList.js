import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import NavLink from './NavLink';
import SectionTitle from './SectionTitle';
import StatusIcon from './StatusIcon';
import { tags_colors } from '@/lib/enums';
import getProjects from '@/lib/getProjects';

function ProjectList() {
	const [projectsData, setProjectData] = useState([]);

	useEffect(() => {
		getProjects().then((data) => setProjectData(data));
	}, []);

	return (
		<Box mt={10}>
			<SectionTitle p_href="/projects">Recent Projects</SectionTitle>

			{projectsData
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
