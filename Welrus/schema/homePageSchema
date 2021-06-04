import * as Yup from "yup";

const homePageSchema = Yup.object().shape({

    serviceQuery: Yup.string()
        .min(2, "Must be at least 2 characters.")
        .max(50, "Must be less than 50 characters.")
        .required("Please provide a service."),

});

export default homePageSchema;

