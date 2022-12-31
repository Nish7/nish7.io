import { Box, Flex, Text } from '@chakra-ui/react';
import HeadMeta from '@/components/layouts/HeadMeta';
import Education from '@/components/home/Education';
import Work from '@/components/home/Work';
import { supabase } from '@/lib/supabase';
import { GetStaticProps } from 'next';
import { EducationProp, WorkProp } from '@/lib/types/interface';

export default function Home({
	workData,
	educationData,
}: {
	workData: WorkProp[];
	educationData: EducationProp[];
}) {
	return (
		<>
			<HeadMeta title="Nishil Kapadia | Home" />

			<Box w={['90%', '90%', '70%']} py={8} mx="auto" my={[16, 16, 0]}>
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
					<Text fontWeight="semibold">Software Developer</Text>
					<Text
						mt={7}
						w={['full', 'full', '80%']}
						letterSpacing={0.5}
						textAlign={['center', 'center', 'left']}
					>
						Software Developer with full-stack experience, primarily working
						with Java(Type)Script. I am also an undergraduate computer science
						student at Toronto Metropolitan University. Right now I&apos;m
						building modern web applications and software at The Eyeopener.
					</Text>
				</Flex>

				{/* <FeaturePost /> */}

				<Work data={workData} />

				<Education data={educationData} />
			</Box>
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	let { data: workData } = await supabase
		.from<WorkProp>('Work')
		.select('*')
		.order('start_date', { ascending: false });

	let { data: educationData } = await supabase
		.from<EducationProp>('Education')
		.select('*');

	return {
		props: {
			workData,
			educationData,
		},
		revalidate: 10,
	};
};