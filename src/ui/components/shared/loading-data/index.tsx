import { useGlobalStyles } from '@/styles';
import { makeStyles } from '@material-ui/styles';
import React, { ReactElement } from 'react';
import { Empty } from '../empty';
import { LoadingRect } from '../loading-rect';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backdropFilter: 'blur(2px)',
    // display: 'grid',
    // placeContent: 'start center',
    // backgroundColor: '#00000007',
  },
  icon: {
    position: 'absolute',
    fontSize: '2rem',
    left: '50%',
    top: '30%',
    transform: 'translate(-50%,-50%)',
  },
}));

type LoadingDataProps = {
  empty?: boolean;
  refetching?: boolean;
  customError?: ReactElement;
  customEmpty?: ReactElement;
  customStanding?: ReactElement;
  customLoading?: ReactElement;
} & (
  | {
      loading: boolean;
      dataValid?: boolean;
      standing?: boolean;
    }
  | {
      status: 'idle' | 'success' | 'error' | 'loading';
    }
);

export const LoadingData: React.FC<LoadingDataProps> = props => {
  const cls = useStyles();
  const gs = useGlobalStyles();
  const {
    customError = <div>error</div>,
    customEmpty = <Empty />,
    empty: isEmpty = false,
    customStanding = <div>standing</div>,
    customLoading = (
      <div className={gs.flexCenter}>
        <LoadingRect />
      </div>
    ),
    refetching = false,
    children,
  } = props;

  if ('status' in props) {
    switch (props.status) {
      case 'idle':
        return customStanding;

      case 'loading':
        return customLoading;

      case 'error':
        return customError;

      case 'success':
        if (refetching)
          return (
            <div className={cls.root}>
              {children}
              <div className={cls.overlay} />
              <div className={cls.icon}>
                <LoadingRect />
              </div>
            </div>
          );

        if (isEmpty) return customEmpty;

        return <>{children}</>;

      default:
        return customStanding;
    }
  } else {
    const { loading, children, dataValid = true } = props;
    if (loading) return customLoading;
    if (dataValid) {
      if (refetching)
        return (
          <div className={cls.root}>
            {children}
            <div className={cls.overlay} />
            <div className={cls.icon}>
              <LoadingRect />
            </div>
          </div>
        );

      if (isEmpty) return customEmpty;

      return <>{children}</>;
    }
    return customError;
  }
};
