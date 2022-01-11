import { Flex, Icon, Text } from '@chakra-ui/react';
import { BsSpotify } from 'react-icons/bs';
import useSWR from 'swr';
import fetcher from 'lib/fetcher';

function CurrentPlaying() {
	const { data, error } = useSWR('/api/spotify/currentPlaying', fetcher);
	console.log(data);

	return (
		<Flex mt="auto" align="center" justify="center">
			<Icon color="green.400" mr={2} as={BsSpotify} />

			<Text fontSize="sm" fontWeight="semibold">
				{data?.title ? `${data.title} - ${data.artist_name}` : 'Not Playing'}
			</Text>
		</Flex>
	);
}

export default CurrentPlaying;
