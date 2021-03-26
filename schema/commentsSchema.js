import * as Yup from "yup";


const commentsSchema = Yup.object().shape({
    text: Yup.string()
      .min(2, "At least 2 characters, please")
      .max(
        3000,
        "3000 characters or less, please"
      )
      .required("Required"),
  });

  export default commentsSchema;