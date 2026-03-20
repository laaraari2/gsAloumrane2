import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const useBook = () => {
    const { bookId } = useParams<{ bookId: string }>();
    const { t, i18n } = useTranslation();

    // Default to 'antigone' if no bookId is present (fallback for safety)
    const activeBook = bookId || 'antigone';

    const bt = (key: string, options?: any): any => {
        // If the key is already scoped or is a common key, return as is
        if (key.includes('app.') || key.includes('navigation.') || key.includes('hub.') || key.includes('lang.') || key.includes('footer.') || key.includes('guide.') || key.includes('login.')) {
            return t(key, options);
        }
        return t(`${activeBook}.${key}`, options);
    };

    return {
        bookId: activeBook,
        t: bt,
        i18n
    };
};
