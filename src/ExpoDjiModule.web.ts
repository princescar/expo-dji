import { registerWebModule, NativeModule } from 'expo';

import { ExpoDjiModuleEvents } from './ExpoDji.types';

class ExpoDjiModule extends NativeModule<ExpoDjiModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoDjiModule, 'ExpoDjiModule');
