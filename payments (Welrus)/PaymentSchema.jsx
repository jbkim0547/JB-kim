import * as Yup from "yup";

const paymentFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "*Invalid Name")
    .max(30, "*Cannot exceed 30 characters")
    .required("*Required field"),
  email: Yup.string()
    .email("*Invalid email format")
    .max(40, "*Cannot exceed 40 characters")
    .required("*Required field"),
  cardNumber: Yup.string()
    .matches(/^(\d{4}[- ]){3}\d{4}|\d{16}$/, "*Invalid card number")
    .required("*Required field"),
  cvc: Yup.string().min(3, "*Invalid cvc code").required("*Required field"),
  expMonth: Yup.number().required("*Required field"),
  expYear: Yup.number().required("*Required field"),
});

export { paymentFormSchema };
