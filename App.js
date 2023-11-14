import { View, StyleSheet, Text, Button, Item} from 'react-native';
import * as Localization from 'expo-localization';

import { LanguageProvider,  useLanguage } from './contextLanguage';
import SwitchLanguage from './SwitchLanguage';


export default function App() {

  return (
    <LanguageProvider>
      <SwitchLanguage/>
    </LanguageProvider>
  );
}

