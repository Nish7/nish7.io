import { PostProp } from '@/lib/types/interface';
import { useRouter } from 'next/router';
import { memo } from 'react';
import SidebarLayout from '../layouts/SidebarLayout';
import BlogItem from './BlogItem';

interface BlogSidebarProp {
	posts: PostProp[];
	isPage?: boolean;
}

const BlogSidebar = ({ posts, isPage = false }: BlogSidebarProp) => {
	const {
		query: { id },
	} = useRouter();

	return (
		<SidebarLayout title="Blog" isPage={isPage}>
			{posts.map(({ title, date, slug }, idx) => (
				<BlogItem
					active={id?.includes(title)}
					title={title}
					slug={slug}
					date={date}
					key={idx}
				/>
			))}
		</SidebarLayout>
	);
};

export default memo(BlogSidebar);
