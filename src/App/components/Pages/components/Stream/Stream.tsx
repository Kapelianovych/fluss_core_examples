import * as React from 'react';
import { stream, Stream as IStream, throttle, FRAME_TIME } from '@fluss/core';

import { BodyContainer } from './Stream.module.less';

interface ThrottleStreamFunction {
  <T>(derivative: IStream<T>): IStream<T>['send'];
}

const throttleStream: ThrottleStreamFunction = ({ send }) => throttle(send, 10);

const { send, derive } = stream<MouseEvent>();
document.addEventListener('mousemove', send);

enum Direction {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
  NEUTRAL = 'neutral',
}

type MouseDirection = [vertical: Direction, horizontal: Direction];

const toDirection = (() => {
  let oldClientX = 0;
  let oldClientY = 0;

  return ({ clientX, clientY }: MouseEvent): MouseDirection => {
    const vertical =
      oldClientY > clientY
        ? Direction.UP
        : oldClientY === clientY
        ? Direction.NEUTRAL
        : Direction.DOWN;
    const horizontal =
      oldClientX > clientX
        ? Direction.LEFT
        : oldClientX === clientX
        ? Direction.NEUTRAL
        : Direction.RIGHT;

    oldClientX = clientX;
    oldClientY = clientY;

    return [vertical, horizontal];
  };
})();

interface Velocity {
  readonly x: number;
  readonly y: number;
}

const toVelocity = ({ movementX, movementY }: MouseEvent): Velocity => ({
  x: movementX / FRAME_TIME,
  y: movementY / FRAME_TIME,
});

const round =
  (what: number) =>
  (to: number = 2) =>
    Math.abs(what).toFixed(to);

export const Stream = () => {
  const [direction, setDirection] = React.useState<MouseDirection>([
    Direction.NEUTRAL,
    Direction.NEUTRAL,
  ]);
  const [velocity, setVelocity] = React.useState<Velocity>({
    x: 0,
    y: 0,
  });

  React.useEffect(
    () =>
      derive<MouseEvent>(throttleStream).map(toDirection).listen(setDirection),
    [],
  );
  React.useEffect(
    () =>
      derive<MouseEvent>(throttleStream).map(toVelocity).listen(setVelocity),
    [],
  );

  return (
    <React.Fragment>
      <h1>stream</h1>
      <div className={BodyContainer}>
        <p>Direction:</p>
        <ul>
          <li>Vertical: {direction[0]}</li>
          <li>Horizontal: {direction[1]}</li>
        </ul>

        <p>Velocity:</p>
        <ul>
          <li>X: {round(velocity.x)()} px/frame</li>
          <li>Y: {round(velocity.y)()} px/frame</li>
        </ul>
      </div>
    </React.Fragment>
  );
};
