import * as yup from 'yup';
import i18n from 'i18n';

const validationSchema = () =>
    yup.object().shape({
        email: yup
            .string()
            .max(255)
            .email()
            .required(i18n.t('validations.required')),
        join_as: yup
            .string()
            .max(11)
            .required(i18n.t('validations.required'))
    });

export default validationSchema;