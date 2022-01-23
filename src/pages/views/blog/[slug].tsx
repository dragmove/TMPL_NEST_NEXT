import { NextPage, NextPageContext } from 'next';
import { Post } from '../../../server/common/types';
import { BlogService } from '../../../server/blog/blog.service';

interface Props {
  post: Post | null;
  source: string;
}

const Post: NextPage<Props> = ({ post: { title, content }, source }) => {
  return (
    <div>
      <h1>{title}</h1>
      <div>
        {content.map((block, index) => (
          <p key={`block-${index}`}>{block}</p>
        ))}
      </div>
      <div style={{ fontStyle: 'italic', fontSize: 14 }}>
        this page was rendered on the {source}
      </div>
    </div>
  );
};

// Ref: https://nextjs.org/docs/basic-features/data-fetching#only-runs-on-server-side
export function getServerSideProps(ctx: NextPageContext) {
  const post = ctx.query.post || null;

  const props: Props = {
    source: 'server',
    post: post as any,
  };

  if (!props.post) {
    const service = new BlogService();
    props.post = service.find(ctx.query.slug as string);
    props.source = 'client';
  }

  if (props.post === null) {
    // Ref: https://nextjs.org/blog/next-10#notfound-support
    return {
      notFound: true,
    };
  }

  return { props };
}

export default Post;
