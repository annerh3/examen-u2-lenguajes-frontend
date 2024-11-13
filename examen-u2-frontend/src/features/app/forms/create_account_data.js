import * as Yup from 'yup';

export const createAccountInitValues = {
    precode: null,
      code: null,
      name: '',
      email: '',
      isParentAccount: false,
}

export const createAccountValidationSchema = Yup.object().shape({
  isParentAccount: Yup.boolean(),
  precode: Yup.number()
            .nullable()
            .when('isParentAccount', {
              is: false, // Si 'isParentAccount' es false
              then: (schema) => schema.required('PreCódigo es obligatorio cuando no es una cuenta padre'),
              otherwise: (schema) => schema.nullable(),
            }),
  code: Yup.number()
        .typeError('Código debe ser un número')
        .required('Código es obligatorio'),
  name: Yup.string()
    .required('Nombre es obligatorio')
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: Yup.string()
    .email('Correo electrónico no válido')
    .required('Correo electrónico es obligatorio'),
});