import { Icon, Link, LinkProps, Text } from '@chakra-ui/react';
import { ElementType } from 'react';

import { ActiveLink } from '../../ActiveLink';

export interface NavLinkProps extends LinkProps {
	icon: ElementType;
	href: string;
	children: string;
}

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
	return (
		<ActiveLink href={href} passHref>
			<Link display="flex" alignItems="center" {...rest}>
				<Icon as={icon} fontSize="20" />
				<Text ml="4" fontWeight="medium">
					{children}
				</Text>
			</Link>
		</ActiveLink>
	);
}
