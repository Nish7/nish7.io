import ProjectSidebar from '@/components/project/ProjectSidebar';
import TagLabel from '@/components/tag/TagLabel';
import { Flex, Text, Box, Icon, Button } from '@chakra-ui/react';
import { FiLink } from 'react-icons/fi';
import { tags_colors } from '@/lib/consts';
import getProjects from '@/lib/getProjects';
import HeadMeta from '@/components/layouts/HeadMeta';
import Link from 'next/link';
import { ReactElement } from 'react';
import { IParams, PostProp } from '@/lib/types/interface';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { getAllPostIds, getPostData } from '@/lib/getPosts';
import rehypeHighlight from 'rehype-highlight';
import ReactMarkdown from 'react-markdown';

const BlogPage = ({ post }: { post: PostProp }) => {
	const {
		title,
		date,
		content,
	} = post;

	return (
		<>
			<HeadMeta title={title} />

			<Box
				w={['100%', '100%', '70%']}
				mt={[10, 10, 0]}
				p={[4, 4, 8]}
				mx="auto"
				h="auto"
			>
				<h1>{title}</h1>
				<p>{date}</p>
				<ReactMarkdown rehypePlugins={[rehypeHighlight]}>
					{content}
				</ReactMarkdown>
			</Box>
		</>
	);
};

// ProjectPage.getLayout = function getLayout(page: ReactElement) {
// 	const { props } = page;

// 	return (
// 		<Flex>
// 			<ProjectSidebar projects={props.allProjects} isPage />
// 			{page}
// 		</Flex>
// 	);
// };

export const getStaticPaths: GetStaticPaths = async () => {
	return { paths: getAllPostIds(), fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async (
	context: GetStaticPropsContext
) => {
	const { id } = context.params as IParams;
	const post = getPostData(id);

	if (!post) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			post,
		},
		revalidate: 10,
	};
};

export default BlogPage;
