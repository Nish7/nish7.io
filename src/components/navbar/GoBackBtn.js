import { Icon, Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FaArrowLeft } from 'react-icons/fa';

function GoBackBtn() {
	const { pathname } = useRouter();

	return (
		<Link href={`/${pathname.split('/')[1]}`} passHref>
			<Icon
				zIndex={2}
				display={['inline', 'inline', 'none']}
				position="absolute"
				cursor="pointer"
				top="5"
				left="5"
				as={FaArrowLeft}
			/>
		</Link>
	);
}

export default GoBackBtn;
