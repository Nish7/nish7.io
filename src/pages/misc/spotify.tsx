import { Flex, Text, Box, Icon, Button, Tooltip } from '@chakra-ui/react';
import { FiLink } from 'react-icons/fi';
import TagLabel from '@/components/tag/TagLabel';
import HeadMeta from '@/components/layouts/HeadMeta';
import { tags_colors } from '@/lib/consts';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { ReactElement } from 'react';
import MiscSidebar from '@/components/misc/MiscSidebar';
import { BsSpotify } from 'react-icons/bs';
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const MiscPage = () => {
	const { data } = useSWR('/api/spotify/currentPlaying', fetcher);

	return (
		<>
			<HeadMeta title={'music'} />
			<Box
				w={['100%', '100%', '70%']}
				mt={[10, 10, 0]}
				p={[4, 4, 8]}
				mx="auto"
				h="auto"
			>
				<TagLabel color={tags_colors['Shell']}>Spotify</TagLabel>

				<Text fontWeight="bold" fontSize="2xl">
					Currently Playing On Spotify
				</Text>

				<Flex align="center" justify="flex-start" mt={5}>
					<Icon color="green.400" mr={2} as={BsSpotify} />
					<Text fontSize="md" fontWeight="semibold">
						{data?.title
							? `${data.artist_name} - ${data.title}`
							: 'Not Playing'}
					</Text>
				</Flex>

				<Link
					style={{ textDecoration: 'none' }}
					href={'https://open.spotify.com/user/t0vni93c94zfwbi5iv7nul95a'}
					target="_blank"
					passHref
				>
					<Button colorScheme="blue" size="md" w="100%" mx="auto" my={10}>
						<Icon boxSize={3} as={FiLink} mr={1} />
						<Text>Open Spotify</Text>
					</Button>
				</Link>
			</Box>
		</>
	);
};

MiscPage.getLayout = function getLayout(page: ReactElement) {
	const { props } = page;

	return (
		<Flex>
			<MiscSidebar miscItems={props.miscItems} isPage={true} />
			{page}
		</Flex>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const miscItems = ['Spotify'];

	return {
		props: {
			miscItems,
		},
		revalidate: 10,
	};
};

export default MiscPage;
