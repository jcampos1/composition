import * as yup from 'yup';
import i18n from 'i18n';
import format from 'string-format';

const validationSchema = () =>
    yup.object().shape({
        email: yup
            .string()
            .max(255)
            .email()
            .required(i18n.t('validations.required'))
    });

export default validationSchema;