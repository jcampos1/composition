import * as yup from 'yup';
import i18n from 'i18n';
import format from 'string-format';

const validationSchema = () =>
    yup.object().shape({
        first_name: yup
            .string()
            .max(128)
            .required(i18n.t('validations.required')),
        last_name: yup
            .string()
            .max(128)
            .required(i18n.t('validations.required')),
        email: yup
            .string()
            .max(255)
            .email()
            .required(i18n.t('validations.required')),
        password1: yup
            .string()
            .min(8, format(i18n.t('validations.min'), '8'))
            .required(i18n.t('validations.required')),
        password2: yup
            .string()
            .min(8, format(i18n.t('validations.min'), '8'))
            .oneOf([yup.ref('password1'), null], i18n.t('signup.validations.password_dont_match'))
            .required(i18n.t('validations.required'))
    });

export default validationSchema;