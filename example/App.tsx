import ExpoDji, { ExpoDjiView } from 'expo-dji';
import { useState } from 'react';
import { Button, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [apiKey, setApiKey] = useState('');
  const [appRegistered, setAppRegistered] = useState(false);

  const init = async () => {
    try {
      await ExpoDji.registerApp();
      setAppRegistered(true);
    } catch (e) {
      setAppRegistered(false);
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Expo DJI Example</Text>
        <Group name="Constants">
          <Text>{ExpoDji.PI}</Text>
        </Group>
        <Group name="Functions">
          <Text>{apiKey}</Text>
          <Button
            title="Get api key"
            onPress={() => {
              setApiKey(ExpoDji.getApiKey() ?? "")
            }}
          />
        </Group>
        <Group name="Async Functions">
          <Text>{appRegistered ? "registered" : "unregistered"}</Text>
          <Button
            title="Register app"
            onPress={init}
          />
        </Group>
        <Group name="Views">
          <ExpoDjiView
            url="https://www.example.com"
            onLoad={({ nativeEvent: { url } }) => console.log(`Loaded: ${url}`)}
            style={styles.view}
          />
        </Group>
      </ScrollView>
    </SafeAreaView>
  );
}

function Group(props: { name: string; children: React.ReactNode }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupHeader}>{props.name}</Text>
      {props.children}
    </View>
  );
}

const styles = {
  header: {
    fontSize: 30,
    margin: 20,
  },
  groupHeader: {
    fontSize: 20,
    marginBottom: 20,
  },
  group: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  view: {
    flex: 1,
    height: 200,
  },
};
