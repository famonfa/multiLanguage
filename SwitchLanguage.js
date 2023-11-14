import {  useLanguage,} from './contextLanguage';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as Localization from 'expo-localization';



export default function SwitchLanguage() {
    const { selectedLanguage, toggleLanguage, i18n } = useLanguage();

    console.log(i18n.locale);

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {i18n.t('welcome') } {i18n.t('name')}
        </Text>
        <Text>Current locale: {selectedLanguage}</Text>
        <Text>Device locale: {Localization.getLocales()[0].languageCode}</Text>
  
        <Button title="Toggle Language" onPress={toggleLanguage} />
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  