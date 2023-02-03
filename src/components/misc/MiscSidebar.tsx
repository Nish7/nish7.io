import { memo } from 'react';
import SidebarLayout from '../layouts/SidebarLayout';
import MiscItem from './MiscItem';
import { useRouter } from 'next/router';

const MiscSidebar = ({
	miscItems = [],
	isPage = false,
}: {
	miscItems: string[];
	isPage?: boolean;
}) => {
	const { pathname } = useRouter();

	return (
		<SidebarLayout title="Misc" isPage={isPage}>
			{miscItems.map((s) => (
				<MiscItem
					active={
						pathname.split('/')[2] == s.toLowerCase().split(' ').join('-')
					}
					title={s}
					key={s}
				/>
			))}
		</SidebarLayout>
	);
};

export default memo(MiscSidebar);
