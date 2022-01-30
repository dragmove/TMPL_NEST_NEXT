import { NextPage, NextPageContext } from 'next';
import React, { ReactElement } from 'react';

interface Props {
  query: { name?: string };
}

const Index: NextPage<Props> = ({ query }): ReactElement => {
  const name = query.name ? query.name : 'foo';

  return (
    <div>
      <p>Hello, {name}!</p>
    </div>
  );
};

export async function getServerSideProps(ctx: NextPageContext): Promise<{
  props: any;
}> {
  const query = {
    name: ctx.query.name || null,
  };
  return { props: { query } };
}

export default Index;
