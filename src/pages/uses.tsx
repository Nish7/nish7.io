import HeadMeta from '@/components/layouts/HeadMeta';
import {
    Box,
    Link,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';

interface UseItem {
    name: string;
    href: string;
    details?: string;
}

interface UseSection {
    title: string;
    items: UseItem[];
}

const useSections: UseSection[] = [
	{
		title: 'Editor & IDE',
		items: [
			{
				name: 'Neovim',
				href: 'https://neovim.io/',
				details: 'Modal editor',
			},
			{
				name: 'Zed',
				href: 'https://zed.dev/',
				details: 'GPU-accelerated editor',
			},
		],
	},
	{
		title: 'Terminal & Shell',
		items: [
			{
				name: 'Ghostty',
				href: 'https://ghostty.org/',
				details: 'Terminal emulator',
			},
			{
				name: 'Starship',
				href: 'https://starship.rs/',
				details: 'Cross-shell prompt',
			},
			{
				name: 'tmux',
				href: 'https://github.com/tmux/tmux',
				details: 'Terminal multiplexer',
			},
		],
	},
	{
		title: 'CLI Tools',
		items: [
			{
				name: 'zoxide',
				href: 'https://github.com/ajeetdsouza/zoxide',
				details: 'Smarter cd',
			},
			{
				name: 'lazygit',
				href: 'https://github.com/jesseduffield/lazygit',
				details: 'Git TUI',
			},
			{
				name: 'zsh-autosuggestions',
				href: 'https://github.com/zsh-users/zsh-autosuggestions',
				details: 'Command suggestions',
			},
		],
	},
	{
		title: 'Theme & Fonts',
		items: [
			{
				name: 'Gruvbox Hard',
				href: 'https://github.com/morhetz/gruvbox',
				details: 'Dark theme (bg #0e0e0e)',
			},
			{
				name: 'JetBrains Mono',
				href: 'https://www.jetbrains.com/lp/mono/',
				details: 'Monospaced font',
			},
			{
				name: 'Zed Mono',
				href: 'https://github.com/zed-industries/zed-fonts',
				details: 'Monospaced font',
			},
		],
	},
	{
		title: 'Coding Agents',
		items: [
			{
				name: 'Codex',
				href: 'https://openai.com/codex/',
				details: 'Coding agent',
			},
			{
				name: 'OpenCode',
				href: 'https://opencode.ai/',
				details: 'Coding agent',
			},
		],
	},
	{
		title: 'Model',
		items: [
			{
				name: 'GPT-5.4 Codex',
				href: 'https://openai.com/index/introducing-gpt-5-4/',
				details: 'Model',
			},
		],
	},
	{
		title: 'Hardware',
		items: [
			{
				name: 'MacBook Air (M2, 2022)',
				href: 'https://support.apple.com/kb/SP869?locale=en_US',
				details: 'Apple M2, 13.6-inch, MagSafe 3',
			},
			{
				name: '27 Inch Essential Monitor S3 S39C',
				href:
					'https://www.samsung.com/us/computing/monitors/curved/27-s39c-fhd-75hz-curved-monitor-ls27c392eanxgo/',
				details: 'FHD, 75Hz, curved',
			},
			{
				name: 'NuPhy Halo75',
				href: 'https://nuphy.com/products/halo75',
				details: '75% wireless keyboard',
			},
			{
				name: 'Logitech M720 Triathlon',
				href: 'https://www.logitech.com/en-us/products/mice/m720-triathlon.html',
				details: 'Multi-device mouse',
			},
		],
	},
	{
		title: 'Devices',
		items: [
			{
				name: 'iPhone 16 Pro',
				href:
					'https://www.apple.com/gw/newsroom/2024/09/apple-debuts-iphone-16-pro-iphone-16-pro-max/',
				details: 'Phone',
			},
			{
				name: 'iPad Air (M1)',
				href:
					'https://www.apple.com/newsroom/2022/03/apple-introduces-the-most-powerful-and-versatile-ipad-air-ever/',
				details: 'Tablet',
			},
		],
	},
	{
		title: 'Audio',
		items: [
			{
				name: 'Sony WH-1000XM5',
				href:
					'https://electronics.sony.com/audio/headphones/all-headphones/p/wh1000xm5-l',
				details: 'Noise-cancelling headphones',
			},
			{
				name: 'AirPods Pro',
				href: 'https://www.apple.com/airpods-pro/',
				details: 'Wireless earbuds',
			},
		],
	},
	{
		title: 'Apps & Services',
		items: [
			{
				name: 'Homebrew',
				href: 'https://brew.sh/',
				details: 'Package manager (migrating to Nix)',
			},
			{
				name: 'Nix',
				href: 'https://nixos.org/',
				details: 'Declarative package manager',
			},
			{
				name: 'Zen Browser',
				href: 'https://zen-browser.app/',
				details: 'Browser',
			},
			{
				name: 'Obsidian',
				href: 'https://obsidian.md/',
				details: 'Markdown notes',
			},
			{
				name: '1Password',
				href: 'https://1password.com/',
				details: 'Password manager',
			},
			{
				name: 'Things',
				href: 'https://culturedcode.com/things/',
				details: 'Daily todo app',
			},
			{
				name: 'YouTube Music',
				href: 'https://music.youtube.com',
				details: 'Music streaming',
			},
			{
				name: 'Mullvad VPN',
				href: 'https://mullvad.net/',
				details: 'VPN',
			},
			{
				name: 'Surfshark VPN',
				href: 'https://surfshark.com/',
				details: 'VPN',
			},
		],
	},
];

const UsesPage = () => {
	const linkColor = useColorModeValue('blue.600', 'blue.300');
	const mutedColor = useColorModeValue('gray.600', 'gray.400');

	return (
		<>
			<HeadMeta title={'Uses'} />
			<Box
				w={['100%', '100%', '70%']}
				mt={[10, 10, 0]}
				p={[4, 4, 8]}
				mx="auto"
				h="auto"
			>
				<Text fontWeight="bold" fontSize="2xl">
					Uses
				</Text>
				<Text mt={2} fontSize="sm" color={mutedColor}>
					You can see a more complete config in my{' '}
					<Link
						as={NextLink}
						href="https://github.com/nish7/dotfiles"
						isExternal
						color={linkColor}
						fontWeight="semibold"
					>
						dotfiles repo
					</Link>
					.
				</Text>

				<Stack spacing={8} mt={6}>
					{useSections.map((section) => (
						<Box key={section.title}>
							<Text fontWeight="semibold" fontSize="lg" mb={3}>
								{section.title}
							</Text>
							<Stack spacing={3}>
								{section.items.map((item) => (
									<Box key={item.name}>
										<Link
											as={NextLink}
											href={item.href}
											isExternal
											color={linkColor}
											fontWeight="semibold"
										>
											{item.name}
										</Link>
										{item.details && (
											<Text fontSize="sm" color={mutedColor} mt={1}>
												{item.details}
											</Text>
										)}
									</Box>
								))}
							</Stack>
						</Box>
					))}
				</Stack>
			</Box>
		</>
	);
};

export default UsesPage;
