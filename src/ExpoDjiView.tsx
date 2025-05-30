import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoDjiViewProps } from './ExpoDji.types';

const NativeView: React.ComponentType<ExpoDjiViewProps> =
  requireNativeView('ExpoDji');

export default function ExpoDjiView(props: ExpoDjiViewProps) {
  return <NativeView {...props} />;
}
