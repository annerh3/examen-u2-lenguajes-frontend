import * as Yup from 'yup';

export const JournalEntryInitValues = {
    description: "",
    date: "",
    accountsEntrys: [
      { accountId: "", amount: "", muvType: "" }
    ]
  }

export const JournalEntryValidationSchema = Yup.object({
    description: Yup.string().required('La descripción es requerida'),
    date: Yup.date().required('La fecha es requerida'),
    accountsEntrys: Yup.array().of(
      Yup.object().shape({
        accountId: Yup.string().required('La cuenta es requerida'),
        amount: Yup.number().required('El monto es requerido').min(0, 'El monto debe ser positivo'),
        muvType: Yup.string().required('El tipo de movimiento es requerido')
      })
    ).min(1, 'Debe haber al menos una entrada')
  });