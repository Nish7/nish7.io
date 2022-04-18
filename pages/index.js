import Education from '@/components/Home/Education';
import FeaturePost from '@/components/Home/FeaturePost';
import Work from '@/components/Home/Work';
import { Box, Flex, Text } from '@chakra-ui/react';

export default function Home() {
	return (
		<Box w="70%" py={8} mx="auto">
			<Flex mb={14} align="center">
				<Box>
					<Text
						fontWeight="bold"
						fontSize="4xl"
						mx="auto"
						w="auto"
						letterSpacing={-0.25}
					>
						Nishil Kapadia
					</Text>
					<Text fontWeight="semibold">Front-end developer</Text>
					<Text mt={7} w="80%" letterSpacing={0.5}>
						I am a Front End Developer and UI Designer with a bit of backend
						experience, primarily working with node. I am also an undergraduate
						computer science student at Ryerson University, Toronto, CA.
					</Text>
				</Box>
			</Flex>

			<FeaturePost />

			<Work />

			<Education />
		</Box>
	);
}
