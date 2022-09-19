import ProjectSidebar from '@/components/project/ProjectSidebar';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import getProjects from '../../lib/getProjects';

function Projects() {
	const color = useColorModeValue('rgba(0,0,0,0.7)', 'rgba(255,255,255,0.5)');

	return (
		<Box
			w="70%"
			pl={5}
			sx={{
				backgroundColor: 'rgba(0,0,0,0)',
				opacity: 0.8,
				backgroundImage: `radial-gradient(${color} 1px, transparent 1px), radial-gradient(${color} 1px, rgba(0,0,0,0) 1px)`,
				backgroundSize: '40px 40px',
				backgroundPosition: '0 0,20px 20px',
			}}
		></Box>
	);
}

Projects.getLayout = function getLayout(page) {
	const { props } = page;

	return (
		<Flex>
			<ProjectSidebar projects={props.projectsData} />
			{page}
		</Flex>
	);
};

export async function getStaticProps() {
	let projectsData = await getProjects();

	return {
		props: {
			projectsData,
		},
	};
}

export default Projects;
