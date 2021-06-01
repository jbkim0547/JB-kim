import * as Yup from "yup";


const blogSchema = Yup.object().shape({

    blogTypeId:Yup.number()
        .min(1,"Please provide a blog type.")
        .max(10,"Please provide a blog type.")
        .required("Please provide a blog type."),

    title:Yup.string()
        .min(2,"Please provide a title.")
        .max(50,"Please provide a title.")
        .required("Please provide a title."),

    subject:Yup.string()
        .min(2,"Please provide a subject.")
        .max(50,"Please provide a subject.")
        .required("Please provide a subject."),

    content:Yup.string()
        .min(2,"Please provide a content.")
        .max(10000,"Please provide a content.")
        .required("Please provide a content."),

    isPublished:Yup.boolean()
        .required("Y/N")
        .oneOf([true,false],"publish or draft."),

    imageUrl:Yup.array()
        .required("Please provide a image."),
      
    datePublish:Yup.date()
    .required("Please provide a date.")
});    
        
export default blogSchema;

