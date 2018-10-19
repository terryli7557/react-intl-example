import zh from './zh';
import enUS from './en-US';
import de from './de';

// edit this config every time a new locale is added
const localeConfig = {
    zh,
    'en-US': enUS,
    de,
};

export const getAntdLocale = locale => {
    if (localeConfig[locale]) {
        return localeConfig[locale].antdLocale;
    }
};

export const getMessagesByLocale = locale => {
    if (localeConfig[locale]) {
        return localeConfig[locale].messages;
    }
};

const getLocaleData = () => {
    const localeData = [];
    Object.keys(localeConfig).forEach(key => {
        localeData.push(...localeConfig[key].localeData)
    });
    return localeData;
};
export const localeData = getLocaleData();