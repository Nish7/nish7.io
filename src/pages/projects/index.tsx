import { Flex } from '@chakra-ui/react';
import HeadMeta from '@/components/layouts/HeadMeta';
import PageBackground from '@/components/layouts/PageBackground';
import ProjectSidebar from '@/components/project/ProjectSidebar';
import getProjects from '@/lib/getProjects';
import { ReactElement } from 'react';
import { GetStaticProps } from 'next';

function Projects() {
	return (
		<>
			<HeadMeta title="Projects" />
			<PageBackground />
		</>
	);
}

Projects.getLayout = function getLayout(page: ReactElement) {
	const { props } = page;

	return (
		<Flex>
			<ProjectSidebar projects={props.projectsData} />
			{page}
		</Flex>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const projectsData = await getProjects();

	return {
		props: {
			projectsData,
		},
		revalidate: 10,
	};
};

export default Projects;
