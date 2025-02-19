import HeadMeta from '@/components/layouts/HeadMeta';
import { GetStaticProps } from 'next';
import { getSortedPostsData } from '@/lib/getPosts';
import BlogSidebar from '@/components/blog/BlogSidebar';
import { ReactElement } from 'react';
import { Flex } from '@chakra-ui/react';
import PageBackground from '@/components/layouts/PageBackground';
function Blog() {
	return (
		<>
			<HeadMeta title="Blog" />
			<PageBackground />
		</>
	);
}

Blog.getLayout = function getLayout(page: ReactElement) {
	const { props } = page;

	return (
		<Flex>
			<BlogSidebar posts={props.postsData} />
			{page}
		</Flex>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const postsData = getSortedPostsData();

	return {
		props: {
			postsData,
		},
		revalidate: 10,
	};
};

export default Blog;
