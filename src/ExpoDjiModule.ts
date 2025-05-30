import { NativeModule, requireNativeModule } from 'expo';

import { ExpoDjiModuleEvents } from './ExpoDji.types';

declare class ExpoDjiModule extends NativeModule<ExpoDjiModuleEvents> {
  PI: number;
  getApiKey(): string | null;
  registerApp(): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoDjiModule>('ExpoDji');
