import TagLabel from '@/components/tag/TagLabel';
import {  Text, Box } from '@chakra-ui/react';
import HeadMeta from '@/components/layouts/HeadMeta';
import { IParams, PostProp } from '@/lib/types/interface';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { getAllPostIds, getPostData } from '@/lib/getPosts';
import rehypeHighlight from 'rehype-highlight';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'

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
				w={['100%', '100%', '60%']}
				mt={[10, 10, 10]}
				p={[4, 4, 8]}
				mx="auto"
				minH="90vh"
			>
				<Text fontWeight="bold" fontSize="4xl">
					{title.split('-').join(' ')}
				</Text>

				<Box mt={2} mb={10} fontWeight="light" color="light-grey" fontSize="md">
					<TagLabel>{date}</TagLabel>
				</Box>

				<Box color="grey.300" fontSize="md">
					<ReactMarkdown rehypePlugins={[remarkGfm, rehypeHighlight]}
							components={{
								p: ({ node, ...props }) => <p style={{ marginBottom: "1em" }} {...props} />,
							  }}	>
						{content}
					</ReactMarkdown>
				</Box>
			</Box>
		</>
	);
};

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
