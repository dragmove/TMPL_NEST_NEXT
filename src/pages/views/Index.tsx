import * as React from 'react';
import { NextPage, NextPageContext } from 'next';

interface Props {
  query: { name?: string; foo?: number };
}

const Index: NextPage<Props> = ({ query }) => {
  const greetName = query.name ? query.name : 'World';
  const foo = query.foo || 'no foo';

  return (
    <div>
      <div>Hello, {greetName}!</div>
      <div>foo: {foo}!</div>
    </div>
  );
};

export async function getServerSideProps(ctx: NextPageContext): Promise<{
  props: any;
}> {
  const query = {
    name: ctx.query.name || null,
    foo: ctx.query.foo || null,
  };
  return { props: { query } };
}

export default Index;