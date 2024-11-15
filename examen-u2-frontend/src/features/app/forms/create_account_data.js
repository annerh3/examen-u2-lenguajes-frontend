import * as Yup from 'yup';

export const createAccountInitValues = {
      precode: null,
      code: null,
      accountName: '',
      behaviorType: '',
      allowsMovement: false,
      isParentAccount: false,
      parentId: null
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
  allowsMovement: Yup.boolean(),
  code: Yup.number()
        .typeError('Código debe ser un número')
        .required('Código es obligatorio'),
  accountName: Yup.string()
    .required('Nombre es obligatorio')
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
    behaviorType: Yup.string().required('Nombre es obligatorio'),
    parentId: Yup.mixed().when('isParentAccount', {
      is: true,
      then: () => Yup.mixed().nullable(), // parentId será null si es cuenta padre
      otherwise: () => Yup.string().required(), // parentId será obligatorio si no es cuenta padre
    })
});