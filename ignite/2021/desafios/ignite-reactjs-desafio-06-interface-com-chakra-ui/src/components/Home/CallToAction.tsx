import { Heading, HeadingProps } from '@chakra-ui/react';

type CallToActionProps = HeadingProps;

export function CallToAction(props: CallToActionProps) {
	return (
		<Heading {...props} textAlign="center" fontWeight="500" lineHeight="1.5">
			Let&apos;s go?
			<br />
			So chose your continent
		</Heading>
	);
}
