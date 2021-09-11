import { useTheme } from '@material-ui/core';
import { MotionProps, Transition, useAnimation } from 'framer-motion';
import { ControlsAnimationDefinition } from 'framer-motion/types/animation/types';
import { useEffect, useMemo } from 'react';
import { IntersectionOptions, useInView } from 'react-intersection-observer';

export const useAnimateOnView = ({
  intersectionOptions,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  transition,
  twoWayAnimation = false,
}: {
  initial?: ControlsAnimationDefinition & MotionProps['initial'];
  animate?: ControlsAnimationDefinition;
  transition?: Transition;
  twoWayAnimation?: boolean;
  intersectionOptions?: IntersectionOptions;
} = {}) => {
  const {
    transitions: {
      duration: { enteringScreen, leavingScreen },
    },
  } = useTheme();

  const controls = useAnimation();

  const { ref, inView } = useInView({
    threshold: 0.6,
    ...intersectionOptions,
  });

  const { inDuration, outDuration } = useMemo(
    () => ({
      inDuration: enteringScreen / 1000,
      outDuration: leavingScreen / 1000,
    }),
    [enteringScreen, leavingScreen]
  );

  useEffect(() => {
    if (twoWayAnimation)
      inView
        ? controls.start(animate, {
            duration: inDuration,
            ...transition,
          } as any)
        : controls.start(initial, {
            duration: outDuration,
            ...transition,
          } as any);
    else
      inView &&
        controls.start(animate, {
          duration: inDuration,
          ...transition,
        } as any);
  }, [
    controls,
    initial,
    inView,
    animate,
    twoWayAnimation,
    transition,
    enteringScreen,
    leavingScreen,
    inDuration,
    outDuration,
  ]);
  return { ref, animate: controls, initial };
};
