import { GetStaticProps } from 'next';
import Prismic from '@prismicio/client';
import Head from 'next/head';
import Link from 'next/link';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { useState } from 'react';

import { getPrismicClient } from '../services/prismic';
import { formatDate } from '../utils/formatter';
import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import ExitPreviewButton from '../components/ExitPreviewButton';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
  isPreview: boolean;
}

export default function Home({ postsPagination, isPreview }: HomeProps) {
  const [posts, setPosts] = useState(postsPagination.results);
  const [nextPage, setNextPage] = useState(postsPagination.next_page);
  const [loadingMore, setLoadingMore] = useState(false);

  async function loadMore() {
    setLoadingMore(true);

    const response = await fetch(nextPage);
    const data = await response.json();
    setPosts(prevState => [...prevState, ...data.results]);
    setNextPage(data.next_page);

    setLoadingMore(false);
  }

  return (
    <>
      <Head>
        <title>Posts | SpaceTraveling</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <Link key={post.uid} href={`/post/${post.uid}`}>
              <a>
                <strong>{post.data.title}</strong>
                <p>{post.data.subtitle}</p>

                <div className={styles.timeAndAuthor}>
                  <time>
                    <FiCalendar />{' '}
                    {formatDate(new Date(post.first_publication_date))}
                  </time>
                  <span>
                    <FiUser /> {post.data.author}
                  </span>
                </div>
              </a>
            </Link>
          ))}
        </div>

        {nextPage && (
          <button
            type="button"
            className={styles.loadMore}
            onClick={loadMore}
            disabled={loadingMore}
          >
            Carregar mais posts
          </button>
        )}

        {isPreview && <ExitPreviewButton />}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async ({
  preview = false,
  previewData,
}) => {
  const prismic = getPrismicClient();

  const { results, next_page } = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    {
      fetch: ['post.title', 'post.subtitle', 'post.author'],
      pageSize: 3,
      ref: previewData?.ref ?? null,
    }
  );

  const posts = results.map(post => ({
    uid: post.uid,
    first_publication_date: post.first_publication_date,
    data: {
      title: post.data.title,
      subtitle: post.data.subtitle || '',
      author: post.data.author,
    },
  }));

  return {
    props: {
      postsPagination: {
        next_page,
        results: posts,
      },
      isPreview: preview,
    },
    revalidate: 60 * 60, // 60 minutes
  };
};
