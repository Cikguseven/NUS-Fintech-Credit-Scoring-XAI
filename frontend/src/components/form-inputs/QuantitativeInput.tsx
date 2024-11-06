import { ControllerRenderProps } from "react-hook-form"
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "../ui/form"

import { FormFieldDetails } from "@/lib/model_inputs"
import { Input } from "../ui/input"
  
/**
 * @param formlabel - how we want the form to be labelled
 * 
 * @return a category selection component with the appropriate labels and categories
 */
export default ({ fieldDetails }: { fieldDetails: FormFieldDetails }) => ({ field }: { field: ControllerRenderProps<any>}) => (

    <FormItem>
        <FormLabel className="font-semibold">{fieldDetails.header}</FormLabel>
            <FormControl>
                <Input placeholder={fieldDetails.placeholder} {...field}/>
            </FormControl>
        <FormDescription>The {fieldDetails.header.toLowerCase()} factor for the prediction</FormDescription>
        <FormMessage />
    </FormItem>
)