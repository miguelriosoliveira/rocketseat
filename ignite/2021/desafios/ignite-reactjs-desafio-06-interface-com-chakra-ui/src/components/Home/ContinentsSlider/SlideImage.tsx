import { Flex, Heading, Text, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';

interface SlideImageProps {
	imageSrc: string;
	title: string;
	subtitle: string;
	href: string;
}
export function SlideImage({ imageSrc, title, subtitle, href }: SlideImageProps) {
	return (
		<Flex
			direction="column"
			bgImage={`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${imageSrc}')`}
			bgPos="center"
			justify="center"
			align="center"
			h="100%"
		>
			<Link href={href} passHref>
				<ChakraLink textAlign="center" _hover={{ textDecor: 'none' }}>
					<Heading as="h1" fontSize="48px" color="light.headingsAndText" mb="4">
						{title}
					</Heading>
					<Text fontWeight="700" color="light.info">
						{subtitle}
					</Text>
				</ChakraLink>
			</Link>
		</Flex>
	);
}
