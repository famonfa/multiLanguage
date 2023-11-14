import React, { createContext, useContext, useState, useEffect } from "react";
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LanguageContext = createContext();

const translations = {
  en: { welcome: 'Hellou', name: 'Charlie' },
  ja: { welcome: 'こんにちは', name: 'Hattori Hanzo' },
};
const i18n = new I18n(translations);
i18n.enableFallback = true;

export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(Localization.locale);

  useEffect(() => {
    const loadSelectedLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem('selectedLanguage');
        if (storedLanguage) {
          i18n.locale = storedLanguage;
          setSelectedLanguage(storedLanguage);
        } else {
          const deviceLanguage = Localization.locale;
          i18n.locale = deviceLanguage;
          setSelectedLanguage(deviceLanguage);
        }
      } catch (error) {
        console.error('Error loading language from AsyncStorage:', error);
      }
    };

    loadSelectedLanguage();
  }, []);

  const toggleLanguage = () => {
    const newLanguage = selectedLanguage === 'en' ? 'ja' : 'en';
    i18n.locale = newLanguage;
    setSelectedLanguage(newLanguage);

    AsyncStorage.setItem('selectedLanguage', newLanguage).catch((error) => {
      console.error('Error saving language to AsyncStorage:', error);
    });
  };


  const contextValue = {
    selectedLanguage,
    toggleLanguage,
    i18n
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};