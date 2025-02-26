// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import {
  $Header,
  $InfoItem,
  $List,
} from 'tet-shared//components/posting/postingInfoItem/PostingInfoItem.sc';

type Props = {
  title: string;
  body: string | string[];
  icon: JSX.Element;
};

const PostingInfoItem: React.FC<Props> = ({ title, body, icon }) => {
  const list = Array.isArray(body) ? body : [body];
  return (
    <$InfoItem>
      <$Header>
        {icon}
        <span>{title}</span>
      </$Header>
      <$List>
        {list.map((item) => (
          <li>{item}</li>
        ))}
      </$List>
    </$InfoItem>
  );
};

export default PostingInfoItem;
