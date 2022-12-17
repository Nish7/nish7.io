import { Flex, Icon, Text, Tooltip } from '@chakra-ui/react';
import { BsSpotify } from 'react-icons/bs';
import useSWR from 'swr';
import fetcher from 'lib/fetcher';

function CurrentPlaying() {
	const { data } = useSWR('/api/spotify/currentPlaying', fetcher);

	return (
		<Tooltip label="Currently Playing on Spotify">
			<Flex align="center" justify="flex-start" ml={3}>
				<Icon color="green.400" mr={2} as={BsSpotify} />
				<Text fontSize="sm" fontWeight="semibold">
					{data?.title ? `${data.title.slice(0, 20)}` : 'Not Playing'}
				</Text>
			</Flex>
		</Tooltip>
	);
}

export default CurrentPlaying;
