import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { RichText } from 'prismic-dom';
import Prismic from '@prismicio/client';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { getPrismicClient } from '../../services/prismic';
import { formatDate, formatDateTime } from '../../utils/formatter';
import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import { Comments } from '../../components/Comments';
import ExitPreviewButton from '../../components/ExitPreviewButton';

interface Post {
  first_publication_date: string | null;
  last_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface NeighborPost {
  slug: string;
  title: string;
}

interface PostProps {
  post: Post;
  previousPost: NeighborPost | null;
  nextPost: NeighborPost | null;
  isPreview: boolean;
}

type GetStaticPropsParams = {
  slug: string;
};

const WORDS_PER_MINUTE = 200;

export default function Post({
  post,
  previousPost,
  nextPost,
  isPreview,
}: PostProps) {
  const router = useRouter();

  function calculateReadingTime() {
    if (router.isFallback) {
      return 0;
    }

    const nWords = post.data.content.reduce((acc, content) => {
      const hasHeading = !!content.heading;
      const bodyCount = content.body.reduce((count, body) => {
        return count + body.text.split(' ').length;
      }, 0);
      return acc + Number(hasHeading) + bodyCount;
    }, 0);

    return Math.ceil(nWords / WORDS_PER_MINUTE);
  }

  return (
    <>
      <Head>
        <title>
          {router.isFallback ? 'Carregando...' : post.data.title} |
          SpaceTraveling
        </title>
      </Head>

      {router.isFallback ? (
        'Carregando...'
      ) : (
        <main className={styles.container}>
          {post.data.banner.url && (
            <img src={post.data.banner.url} alt="Banner" />
          )}

          <div className={styles.postContainer}>
            <article className={styles.post}>
              <h1>{post.data.title}</h1>

              <div className={styles.timeAndAuthor}>
                <time>
                  <FiCalendar />{' '}
                  {formatDate(new Date(post.first_publication_date))}
                </time>
                <span>
                  <FiUser /> {post.data.author}
                </span>
                <time>
                  <FiClock /> {calculateReadingTime()} min
                </time>
              </div>

              {isPreview && <ExitPreviewButton />}

              {post.last_publication_date &&
                post.last_publication_date !== post.first_publication_date && (
                  <i>
                    * editado em{' '}
                    {formatDateTime(new Date(post.last_publication_date))}
                  </i>
                )}

              {post.data.content.map(contentGroup => (
                <div key={contentGroup.heading}>
                  <h2>{contentGroup.heading}</h2>
                  <div
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                      __html: RichText.asHtml(contentGroup.body),
                    }}
                  />
                </div>
              ))}
            </article>

            <footer className={styles.neighborPosts}>
              {previousPost ? (
                <Link href={`/post/${previousPost.slug}`}>
                  <a>
                    {previousPost.title}
                    <p>Post anterior</p>
                  </a>
                </Link>
              ) : (
                <div />
              )}

              {nextPost ? (
                <Link href={`/post/${nextPost.slug}`}>
                  <a className={styles.nextPost}>
                    {nextPost.title}
                    <p>Próximo post</p>
                  </a>
                </Link>
              ) : (
                <div />
              )}
            </footer>

            {isPreview && <ExitPreviewButton />}
          </div>

          <Comments />
        </main>
      )}
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const { results } = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    {
      fetch: ['post.uid'],
      pageSize: 1,
    }
  );

  return {
    paths: results.map(result => ({
      params: {
        slug: result.uid,
      },
    })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<PostProps, GetStaticPropsParams> =
  async ({ params, preview = false, previewData }) => {
    const { slug } = params;

    const prismic = getPrismicClient();
    const postResponse = await prismic.getByUID('post', slug, {
      ref: previewData?.ref ?? null,
    });
    const previousPostResponse = await prismic.queryFirst(
      [Prismic.predicates.at('document.type', 'post')],
      {
        fetch: ['post.title'],
        pageSize: 1,
        after: postResponse.id,
        orderings: '[document.first_publication_date desc]',
      }
    );
    const nextPostResponse = await prismic.queryFirst(
      [Prismic.predicates.at('document.type', 'post')],
      {
        fetch: ['post.title'],
        pageSize: 1,
        after: postResponse.id,
        orderings: '[document.first_publication_date]',
      }
    );

    const post = {
      uid: postResponse.uid,
      first_publication_date: postResponse.first_publication_date,
      last_publication_date: postResponse.last_publication_date,
      data: {
        title: postResponse.data.title,
        subtitle: postResponse.data.subtitle,
        banner: postResponse.data.banner,
        author: postResponse.data.author,
        content: postResponse.data.content,
      },
    };
    const previousPost = previousPostResponse
      ? {
          slug: previousPostResponse.uid,
          title: previousPostResponse.data.title,
        }
      : null;
    const nextPost = nextPostResponse
      ? {
          slug: nextPostResponse.uid,
          title: nextPostResponse.data.title,
        }
      : null;

    return {
      props: {
        post,
        previousPost,
        nextPost,
        isPreview: preview,
      },
      revalidate: 60 * 60, // 60 minutes
    };
  };
