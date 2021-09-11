import { MetaTags } from '@/types';
import React from 'react';

type Props = {
  fullTitle?: boolean;
} & MetaTags;

export const Metas: React.FC<Props> = ({
  title: _title,
  fullTitle = false,
  description,
  keywords,
  image,
  link,
}) => {
  const title = fullTitle ? _title : `${_title} | Al Tuhoo`;
  return (
    <>
      <title>{title}</title>

      <meta name='title' content={title} />

      {validValue(description) ? (
        <meta name='description' content={description} />
      ) : null}
      {validValue(keywords) ? (
        <meta name='keywords' content={keywords?.join(', ')} />
      ) : null}

      <meta property='og:type' content='website' />

      {validValue(link) ? (
        <meta property='og:url' content={'https://www.al-tuhoo.com' + link} />
      ) : null}

      <meta property='og:title' content={title} />

      {validValue(description) ? (
        <meta property='og:description' content={description} />
      ) : null}

      {validValue(image) ? <meta property='og:image' content={image} /> : null}

      <meta property='twitter:card' content='summary_large_image' />

      {validValue(link) ? (
        <meta
          property='twitter:url'
          content={'https://www.al-tuhoo.com' + link}
        />
      ) : null}

      <meta property='twitter:title' content={title} />

      {validValue(description) ? (
        <meta property='twitter:description' content={description} />
      ) : null}

      {validValue(image) ? (
        <meta property='twitter:image' content={image} />
      ) : null}
    </>
  );
};

// @ts-ignore
const validValue = <T,>(el: T): el is Omit<T, undefined | null> =>
  typeof el !== 'undefined' && el !== null;
