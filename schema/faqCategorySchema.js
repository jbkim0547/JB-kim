import * as Yup from "yup";


const FaqCategorySchema = Yup.object().shape({
    name: Yup.string().required("Required"),
  });    
        
export default FaqCategorySchema;
