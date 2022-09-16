import ProjectSidebar from '@/components/project/ProjectSidebar';
import TagLabel from '../../components/tag/TagLabel';
import { Flex, Text, Box, Icon, Button, Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { supabase } from 'lib/supabase';
import { FiLink } from 'react-icons/fi';

const tagColors = {
	frontend: 'red',
	backend: 'blue',
	fullStack: 'purple',
};

const ProjectPage = ({ projectsData }) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const router = useRouter();
	const { id } = router.query;

	const {
		created_at,
		name,
		description,
		tags,
		languages,
		website_link,
		github_link,
	} = projectsData.find(
		(b) => b.name.toLowerCase().split(' ').join('-').trim() === id
	);

	return (
		<Box w="70%" py={8} mx="auto" h="auto" px={10}>
			<TagLabel color={tagColors?.[tags]}>{tags}</TagLabel>

			<Text fontWeight="bold" fontSize="2xl">
				{name.split('-').join(' ')}
			</Text>

			<Text my={2} fontWeight="light" color="light-grey" fontSize="md">
				{languages.split(',').map((l) => (
					<TagLabel key={l}>{l}</TagLabel>
				))}
			</Text>

			<Text fontWeight="light" fontStyle="italic" color="grey" fontSize="md">
				{description}
			</Text>

			<Link
				style={{ textDecoration: 'none' }}
				href={website_link}
				target="_blank"
			>
				<Button colorScheme="blue" size="md" w="90%" mx="auto" my={10}>
					<Icon boxSize={3} as={FiLink} mr={1} />
					<Text>Visit</Text>
				</Button>
			</Link>
		</Box>
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
	let { data: projectsData } = await supabase.from('Project').select('*');

	const paths = projectsData.map((p) => ({
		params: { id: p.name.toLowerCase().split(' ').join('-').trim() },
	}));

	return { paths, fallback: false };
}

export async function getStaticProps() {
	let { data: projectsData } = await supabase.from('Project').select('*');

	return {
		props: {
			projectsData,
		},
	};
}

export default ProjectPage;
