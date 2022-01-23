import { NextPage, NextPageContext } from 'next';
import * as React from 'react';
import PostPreview from '../../../client/components/post-preview';
import { BlogService } from '../../../server/blog/blog.service';
import { Post } from '../../../server/common/types';

interface Props {
  posts: Post[];
  source: string;
}

const Blog: NextPage<Props> = ({ posts, source }) => {
  return (
    <div>
      <h1>blog</h1>
      <div>
        {posts.map((post) => (
          <PostPreview key={post.slug} post={post} />
        ))}
      </div>
      <div style={{ fontStyle: 'italic', fontSize: 14 }}>
        this page was rendered on the {source}
      </div>
    </div>
  );
};

// https://nextjs.org/docs/basic-features/data-fetching#only-runs-on-server-side
export async function getServerSideProps(ctx: NextPageContext): Promise<{
  props: Props;
}> {
  const props: Props = {
    posts: ctx.query.posts as any,
    source: 'server',
  };

  if (!Array.isArray(props.posts)) {
    const service = new BlogService();
    props.posts = service.all();
    props.source = 'client';
  }

  return { props };
}

export default Blog;
