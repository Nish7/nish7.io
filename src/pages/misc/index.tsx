import HeadMeta from '@/components/layouts/HeadMeta';
import PageBackground from '@/components/layouts/PageBackground';
import MiscSidebar from '@/components/misc/MiscSidebar';
import { Flex } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { ReactElement } from 'react';

function Misc() {
	return (
		<>
			<HeadMeta title="Misc" />
			<PageBackground />
		</>
	);
}

Misc.getLayout = function getLayout(page: ReactElement) {
	const { props } = page;

	return (
		<Flex>
			<MiscSidebar miscItems={props.miscItems} />
			{page}
		</Flex>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	// refactor this.
	const miscItems = ['Spotify'];

	return {
		props: {
			miscItems,
		},
		revalidate: 10,
	};
};

export default Misc;
