import i18n from "i18next";
import * as Localization from "expo-localization";
import { initReactI18next } from "react-i18next";
import { en, es } from "@/translations/index";

const languageDetector = {
  type: "languageDetector",
  async: true,
  detect: (callback) => {
    callback(Localization.getLocales()[0].languageCode);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    fallbackLng: "en",
    compatibilityJSON: "v3",
    resources: {
      en: {
        translation: en,
      },
      es: {
        translation: es,
      },
      ns: ["translation"],
      defaultNS: "translation",
    },
  });

export default i18n;
