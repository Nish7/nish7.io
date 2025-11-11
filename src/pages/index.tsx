import { Box, Flex, Text } from '@chakra-ui/react';
import HeadMeta from '@/components/layouts/HeadMeta';
import Education from '@/components/home/Education';
import Work from '@/components/home/Work';

import { GetStaticProps } from 'next';
import { EducationProp, WorkProp } from '@/lib/types/interface';
import supabase from '@/lib/supabase';
import FeaturePost from '@/components/home/FeaturePost';

export default function Home({
	workData,
	educationData,
}: {
	workData: WorkProp[];
	educationData: EducationProp[];
}) {
	return (
		<Box alignContent="center" minH="100vh">
			<HeadMeta title="Nishil Kapadia | Home" />

			<Box w={['90%', '90%', '65%']} py={8} mx="auto" my={[16, 16, 0]}>
				<Flex mb={14} align="center" flexDir={'column'}>
					<Text
						fontWeight="bold"
						fontSize="4xl"
						mx="auto"
						w="auto"
						letterSpacing={-0.25}
					>
						Nishil Kapadia
					</Text>
					<Box
						mt={7}
						w={"full"}
						letterSpacing={0.5}
						textAlign={'center'}
					>
						I&apos;m a developer living in Toronto, Ontario. <br/>
						Today, I spend most of time working on compilers, backend and distrubuted systems.
					</Box>
				</Flex>

				<Work data={workData} />

				<Education data={educationData} />
				
			 {/*<FeaturePost /> */}
			</Box>
		</Box>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const workData = await supabase.fetchWork();
	const educationData = await supabase.fetchEducation();

	return {
		props: {
			workData,
			educationData,
		},
		revalidate: 10,
	};
};
