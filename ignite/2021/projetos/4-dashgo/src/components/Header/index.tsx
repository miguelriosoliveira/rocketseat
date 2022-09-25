import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { RiMenuLine } from 'react-icons/ri';

import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';

import { Logo, NotificationsNav, Profile, SearchBar } from './components';

export function Header() {
	const isWideScreen = useBreakpointValue({ base: false, lg: true });
	const { onOpen } = useSidebarDrawer();

	return (
		<Flex as="header" w="100%" maxW={1480} h="20" mx="auto" mt="4" px="6" align="center">
			{!isWideScreen && (
				<IconButton
					icon={<Icon as={RiMenuLine} />}
					aria-label="Open navigation"
					fontSize="24"
					variant="unstyled"
					onClick={onOpen}
					mr="2"
				/>
			)}
			<Logo />
			{isWideScreen && <SearchBar />}

			<Flex align="center" ml="auto">
				<NotificationsNav />
				<Profile hideProfileData={!isWideScreen} />
			</Flex>
		</Flex>
	);
}
