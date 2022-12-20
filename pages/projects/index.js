import HeadMeta from '@/components/headTag/HeadMeta';
import PageBackground from '@/components/layouts/PageBackground';
import ProjectSidebar from '@/components/project/ProjectSidebar';
import { Flex } from '@chakra-ui/react';
import getProjects from '../../lib/getProjects';

function Projects() {
	return (
		<>
			<HeadMeta title="Projects" />
			<PageBackground />
		</>
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
		revalidate: 10,
	};
}

export default Projects;
