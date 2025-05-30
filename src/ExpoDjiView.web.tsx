import * as React from 'react';

import { ExpoDjiViewProps } from './ExpoDji.types';

export default function ExpoDjiView(props: ExpoDjiViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
