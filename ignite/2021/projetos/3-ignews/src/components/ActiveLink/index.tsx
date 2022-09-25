import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { cloneElement, ReactElement } from 'react';

interface Props extends LinkProps {
	children: ReactElement;
	activeClassName: string;
}

export function ActiveLink({ children, activeClassName, ...linkProps }: Props) {
	const { asPath } = useRouter();

	const className = linkProps.href === asPath ? activeClassName : '';
	const clonedChildren = cloneElement(children, { className });

	return <Link {...linkProps}>{clonedChildren}</Link>;
}
