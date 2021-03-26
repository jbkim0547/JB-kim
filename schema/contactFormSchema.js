import * as Yup from "yup";

const contactFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "*must exceed 2 character")
    .max(100, "*cannot exceed 100 characters")
    .required("*This field is Required"),
  email: Yup.string()
    .email()
    .min(1, "*Please provide a email.")
    .max(100, "*Please provide a email.")
    .required("This field is required."),

  title: Yup.string().min(2).required("*This field is Required"),
  message: Yup.string()
    .min(10, "*must exceed 10 character")
    .max(250)
    .required("*This field is Required"),
});
export default contactFormSchema;
