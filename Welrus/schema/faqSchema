import * as Yup from "yup";


const FaqSchema = Yup.object().shape({

    Question:Yup.string()
        .min(4,"Minimum number of characters is 4.")
        .max(255,"You have exceeded the maximum number of characters allowed.")
        .required("Required field. Please provide a question."),

    Answer:Yup.string()
        .min(4,"Minimum number of characters is 4.")
        .max(2000,"You have exceeded the maximum number of characters allowed.")
        .required("Required field. Please provide an answer."),

});    

        
export default FaqSchema;

