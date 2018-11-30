import * as yup from 'yup';
import i18n from 'i18n';

const validationSchema = () =>
    yup.object().shape({
        name: yup
            .string()
            .max(30)
            .required(i18n.t('validations.required')),
        invitation_code: yup
            .string()
            .max(255)
    });

export default validationSchema;