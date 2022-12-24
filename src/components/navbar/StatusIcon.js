import { Icon } from '@chakra-ui/react';
import { BsCircleFill } from 'react-icons/bs';

export default function StatusIcon({ color, ...rest }) {
	return (
		<Icon as={BsCircleFill} color={`${color}.500`} boxSize={2} {...rest} />
	);
}
