import * as yup from 'yup';
import i18n from 'i18n';
import format from 'string-format';

const validationSchema = () => 
	yup.object().shape({
	  username: yup
	      .string()
	      .max(255)
	      .required(i18n.t('validations.required')),
	  password: yup
	      .string()
	      .min(8, format(i18n.t('validations.min'), '8'))
	      .required(i18n.t('validations.required'))
	});

export default validationSchema;