import * as yup from 'yup';
import i18n from 'i18n';
import format from 'string-format';

const validationSchema = () => 
	yup.object().shape({
	  new_password1: yup
	      .string()
	      .min(8, format(i18n.t('validations.min'), '8'))
	      .required(i18n.t('validations.required')),
     new_password2: yup
        .string()
        .min(8, format(i18n.t('validations.min'), '8'))
        .oneOf([yup.ref('new_password1'), null], i18n.t('signup.validations.password_dont_match'))
        .required(i18n.t('validations.required'))
	});

export default validationSchema;