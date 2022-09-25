import { Flex, Icon, Image, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiChevronLeft } from 'react-icons/fi';

export function Header() {
	const router = useRouter();

	const isHome = router.asPath === '/';

	return (
		<Flex as="header" justify="center" h={['50px', '100px']}>
			<Flex align="center" flex="1" maxW="1160px" py="6" px={['4', '0']}>
				{!isHome && (
					<Link href="/" passHref>
						<ChakraLink>
							<Icon as={FiChevronLeft} boxSize={['4', '8']} />
						</ChakraLink>
					</Link>
				)}

				<Link href="/" passHref>
					<ChakraLink mx="auto">
						<Image src="assets/logo.png" alt="Logo" w={['81px', '184px']} />
					</ChakraLink>
				</Link>
			</Flex>
		</Flex>
	);
}
