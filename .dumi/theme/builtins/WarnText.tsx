// Foo.tsx
import React, { type FC } from 'react';

const WarnText: FC<{ text: string }> = props => (
  <div style={{ color: 'red' }}>{props.text}</div>
);

export default WarnText;
