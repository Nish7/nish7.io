import avatar from '../public/avatar.jpg';
import Image from 'next/image';

function Navbar() {
	return (
		<div>
			<Image src={avatar} alt="avatar" width={30} height={40} />
		</div>
	);
}

export default Navbar;
