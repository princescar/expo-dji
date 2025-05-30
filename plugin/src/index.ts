import { AndroidConfig, ConfigPlugin, withAndroidManifest } from 'expo/config-plugins';

const withDjiApiKey: ConfigPlugin<{ apiKey: string }> = (config, { apiKey }) => {
  return withAndroidManifest(config, config => {
    const mainApplication = AndroidConfig.Manifest.getMainApplicationOrThrow(config.modResults);
    AndroidConfig.Manifest.addMetaDataItemToMainApplication(
      mainApplication,
      "com.dji.sdk.API_KEY",
      apiKey,
    );
    return config;
  })
};

export default withDjiApiKey;
