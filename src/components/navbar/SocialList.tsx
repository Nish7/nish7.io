import { Box } from '@chakra-ui/react';
import React, { memo } from 'react';
import { AiFillFile } from 'react-icons/ai';
import { BsGithub, BsLinkedin, BsTwitter } from 'react-icons/bs';
import NavLink from './NavLink';
import SectionTitle from './SectionTitle';

function SocialList() {
	return (
		<Box mt={8}>
			<SectionTitle>Social</SectionTitle>

			<NavLink
				newTab
				noActive
				icon={<BsTwitter />}
				href="https://twitter.com/nishilkapadia"
			>
				Twitter
			</NavLink>

			<NavLink
				newTab
				noActive
				icon={<BsGithub />}
				href="https://github.com/Nish7"
			>
				Github
			</NavLink>

			<NavLink
				newTab
				noActive
				icon={<BsLinkedin />}
				href="https://www.linkedin.com/in/nishil-kapadia/"
			>
				LinkedIn
			</NavLink>
		</Box>
	);
}

export default memo(SocialList);
