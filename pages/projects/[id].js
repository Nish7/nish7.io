import ProjectSidebar from '@/components/project/ProjectSidebar';
import TagLabel from '../../components/tag/TagLabel';
import { Flex, Text, Box, Icon, Button, Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FiLink } from 'react-icons/fi';
import { tags_colors } from '../../lib/enums';
import getProjects from '../../lib/getProjects';
import HeadMeta from '@/components/HeadTag/HeadMeta';

const ProjectPage = ({ projectsData }) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const router = useRouter();
	const { id } = router.query;

	const {
		name,
		html_url,
		description,
		created_at,
		language,
		topics,
		homepage: homepage_link,
	} = projectsData.find(
		(b) => b.name.toLowerCase().split(' ').join('-').trim() === id
	);

	return (
		<>
			<HeadMeta title={name} />
			<Box w="70%" py={8} mx="auto" h="auto" px={10}>
				<TagLabel color={tags_colors?.[language]}>{language}</TagLabel>

				<Link
					style={{ textDecoration: 'none' }}
					href={homepage_link?.length != 0 ? homepage_link : '#'}
				>
					<Text fontWeight="bold" fontSize="2xl" _hover={{ color: 'blue.300' }}>
						{name.split('-').join(' ')}
					</Text>
				</Link>

				<Text my={2} fontWeight="light" color="light-grey" fontSize="md">
					{topics.map((l) => (
						<TagLabel key={l}>{l}</TagLabel>
					))}
				</Text>

				<Text fontWeight="light" fontStyle="italic" color="grey" fontSize="md">
					{description}
				</Text>

				<Link
					style={{ textDecoration: 'none' }}
					target="_blank"
					href={html_url}
				>
					<Button colorScheme="blue" size="md" w="90%" mx="auto" my={10}>
						<Icon boxSize={3} as={FiLink} mr={1} />
						<Text>Github</Text>
					</Button>
				</Link>
			</Box>
		</>
	);
};

ProjectPage.getLayout = function getLayout(page) {
	const { props } = page;

	return (
		<Flex>
			<ProjectSidebar projects={props.projectsData} />
			{page}
		</Flex>
	);
};

export async function getStaticPaths() {
	const projectsData = await getProjects();

	console.log(projectsData);

	const paths = projectsData.map((p) => ({
		params: { id: p.name.toLowerCase().split(' ').join('-').trim() },
	}));

	return { paths, fallback: 'blocking' };
}

export async function getStaticProps() {
	const projectsData = await getProjects();

	return {
		props: {
			projectsData,
		},
		revalidate: 10,
	};
}

export default ProjectPage;
