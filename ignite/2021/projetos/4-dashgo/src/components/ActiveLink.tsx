import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { cloneElement, ReactElement } from 'react';

interface ActiveLinkProps extends LinkProps {
	children: ReactElement;
	exact?: boolean;
}

export function ActiveLink({ children, exact = false, ...rest }: ActiveLinkProps) {
	const { asPath } = useRouter();

	let isActive = false;

	if (exact) {
		isActive = [rest.href, rest.as].includes(asPath);
	} else {
		isActive = asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as));
	}

	return (
		<Link {...rest}>
			{cloneElement(children, {
				color: isActive ? 'pink.400' : 'gray.50',
			})}
		</Link>
	);
}
