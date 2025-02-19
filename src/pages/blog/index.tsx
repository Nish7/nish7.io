import HeadMeta from '@/components/layouts/HeadMeta';
import { GetStaticProps } from 'next';
import { getSortedPostsData } from '@/lib/getPosts';
import Link from 'next/link';

function Blog({ postsData }: { postsData: {id: string, title: string, date: string}[] }) {
	console.log(postsData)
	return (
		<>
			<HeadMeta title="Blog" />
			<div>
				<h1>My Blog</h1>
					{postsData && postsData.map(({ id, title, date }) => (
						<div>
							<Link href={`/blog/${id}`}>
								Title: {title}
							</Link>
							<br />
							<small>{date}</small>
						</div>
					))}
			</div>
			
		</>
	);
}

// Blog.getLayout = function getLayout(page: ReactElement) {
// 	const { props } = page;

// 	return (
// 		<Flex>
// 			<ProjectSidebar projects={props.projectsData} />
// 			{page}
// 		</Flex>
// 	);
// };

export const getStaticProps: GetStaticProps = async () => {
	const postsData = getSortedPostsData();
	console.log(postsData)

	return {
		props: {
			postsData,
		},
		revalidate: 10,
	};
};

export default Blog;
