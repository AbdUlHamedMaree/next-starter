import React from 'react';
import Image from 'next/image';
import { makeStyles } from '@material-ui/styles';
import { Box, BoxProps } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
}));

type Props = {
  children?: never;
  size?: number;
} & BoxProps;

export const Logo: React.FC<Props> = ({
  children,
  className,
  size = 1,
  ...props
}) => {
  const cls = useStyles();

  return (
    <Box
      position='relative'
      width={176 * size}
      height={40 * size}
      {...props}
      className={clsx(className)}
    >
      <div className={cls.root}>
        <Image
          src='/assets/images/logo.png'
          quality={100}
          layout='fill'
          objectFit='contain'
          alt='Al Tuhoo Logo'
          loading='eager'
        />
      </div>
    </Box>
  );
};
