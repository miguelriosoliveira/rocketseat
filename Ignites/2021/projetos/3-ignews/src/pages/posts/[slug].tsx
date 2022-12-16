import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import { RichText } from 'prismic-dom';

import { getPrismicClient } from '../../services/prismic';
import { formatDate } from '../../utils/formatter';

import styles from './post.module.scss';

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

export default function Post({ post }: Props) {
	return (
		<>
			<Head>
				<title>{post.title} | Ig.news</title>
			</Head>

			<main className={styles.container}>
				<article className={styles.post}>
					<h1>{post.title}</h1>
					<time>{post.updatedAt}</time>
					{/* eslint-disable-next-line react/no-danger */}
					<div className={styles.postContent} dangerouslySetInnerHTML={{ __html: post.content }} />
				</article>
			</main>
		</>
	);
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({ req, params }) => {
	const session = await getSession({ req });
	const { slug } = params;

	if (!session?.activeSubscription) {
		return {
			redirect: {
				destination: `/posts/preview/${slug}`,
				permanent: false,
			},
		};
	}

	const prismic = getPrismicClient(req);
	const response = await prismic.getByUID('post', slug, {});
	const post = {
		slug,
		title: RichText.asText(response.data.title),
		content: RichText.asHtml(response.data.content),
		updatedAt: formatDate(new Date(response.last_publication_date)),
	};

	return {
		props: {
			post,
		},
	};
};
