import ProjectSidebar from '@/components/project/ProjectSidebar';
import TagLabel from '@/components/tag/TagLabel';
import { Flex, Text, Box, Icon, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FiLink } from 'react-icons/fi';
import { tags_colors } from '@/lib/consts';
import getProjects from '@/lib/getProjects';
import HeadMeta from '@/components/layouts/HeadMeta';
import Link from 'next/link';
import { ReactElement } from 'react';
import { ProjectProp } from '@/lib/types/interface';
import { GetStaticPaths, GetStaticProps } from 'next';

const ProjectPage = ({ projectsData }: { projectsData: ProjectProp[] }) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const router = useRouter();
	const { id } = router.query;

	const project = projectsData.find(
		(b) => b.name.toLowerCase().split(' ').join('-').trim() === id
	);

	if (project) {
		const {
			name,
			html_url,
			description,
			language,
			topics,
			homepage: homepage_link,
		} = project;

		return (
			<>
				<HeadMeta title={name} />

				<Box
					w={['100%', '100%', '70%']}
					mt={[10, 10, 0]}
					p={[4, 4, 8]}
					mx="auto"
					h="auto"
				>
					<TagLabel color={tags_colors?.[language ?? 'Default']}>
						{language ?? ''}
					</TagLabel>

					<Link
						style={{ textDecoration: 'none' }}
						href={homepage_link ?? '#'}
						passHref
					>
						<Text
							fontWeight="bold"
							fontSize="2xl"
							_hover={{ color: 'blue.300' }}
						>
							{name.split('-').join(' ')}
						</Text>
					</Link>

					<Text my={2} fontWeight="light" color="light-grey" fontSize="md">
						{(topics ?? []).map((l) => (
							<TagLabel key={l}>{l}</TagLabel>
						))}
					</Text>

					<Text
						fontWeight="light"
						fontStyle="italic"
						color="grey"
						fontSize="md"
					>
						{description}
					</Text>

					<Link
						passHref
						style={{ textDecoration: 'none' }}
						target="_blank"
						href={html_url}
					>
						<Button colorScheme="blue" size="md" w="100%" mx="auto" my={10}>
							<Icon boxSize={3} as={FiLink} mr={1} />
							<Text>Github</Text>
						</Button>
					</Link>
				</Box>
			</>
		);
	}
};

ProjectPage.getLayout = function getLayout(page: ReactElement) {
	const { props } = page;

	return (
		<Flex>
			<ProjectSidebar projects={props.projectsData} isPage />
			{page}
		</Flex>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const projectsData = await getProjects();

	const paths = projectsData.map((p) => ({
		params: { id: p.name.toLowerCase().split(' ').join('-').trim() },
	}));

	return { paths, fallback: false };
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

export default ProjectPage;
