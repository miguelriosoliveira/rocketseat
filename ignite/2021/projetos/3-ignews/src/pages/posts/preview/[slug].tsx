import { GetStaticPaths, GetStaticProps } from 'next';
import { useSession } from 'next-auth/client';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-dom';
import { useEffect } from 'react';

import { getPrismicClient } from '../../../services/prismic';
import { formatDate } from '../../../utils/formatter';
import styles from '../post.module.scss';

interface Post {
	slug: string;
	updatedAt: string;
	title: string;
	content: string;
}

interface Props {
	post: Post;
}

type Params = {
	slug: string;
};

export default function PostPreview({ post }: Props) {
	const [session] = useSession();
	const router = useRouter();

	useEffect(() => {
		if (session?.activeSubscription) {
			router.push(`/posts/${post.slug}`);
		}
	}, [post.slug, router, session?.activeSubscription]);

	return (
		<>
			<Head>
				<title>{post.title} | Ig.news</title>
			</Head>

			<main className={styles.container}>
				<article className={styles.post}>
					<h1>{post.title}</h1>
					<time>{post.updatedAt}</time>
					<div
						className={`${styles.postContent} ${styles.previewContent}`}
						// eslint-disable-next-line react/no-danger
						dangerouslySetInnerHTML={{ __html: post.content }}
					/>

					<div className={styles.continueReading}>
						Wanna continue reading?
						<Link href="/">Subscribe now 🤗</Link>
					</div>
				</article>
			</main>
		</>
	);
}

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
	const { slug } = params;

	const prismic = getPrismicClient();
	const response = await prismic.getByUID('post', slug, {});
	const post = {
		slug,
		title: RichText.asText(response.data.title),
		content: RichText.asHtml(response.data.content.slice(0, 3)),
		updatedAt: formatDate(new Date(response.last_publication_date)),
	};

	return {
		props: {
			post,
		},
	};
};
