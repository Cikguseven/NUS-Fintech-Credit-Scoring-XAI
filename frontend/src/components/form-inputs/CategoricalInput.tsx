import { ControllerRenderProps } from "react-hook-form"
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "../ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CategoricalFormFieldDetails } from "@/lib/model_inputs"

/**
 * @param formlabel - how we want the form to be labelled
 *
 * @return a category selection component with the appropriate labels and categories
 */
export default ({ fieldDetails }: { fieldDetails: CategoricalFormFieldDetails }) => ({ field }: { field: ControllerRenderProps<any>}) => (
    <FormItem>
        <FormLabel className="font-semibold">{fieldDetails.header}</FormLabel>
        <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
                <SelectTrigger>
                    <SelectValue placeholder={fieldDetails.placeholder} />
                </SelectTrigger>
            </FormControl>
            <SelectContent>
                {Array.from(fieldDetails.categories).map((category, index) => (
                    <SelectItem key={index} value={fieldDetails.enum[category]}>
                        {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
                    </SelectItem>
                 ))}
            </SelectContent>
        </Select>
        <FormDescription>The {fieldDetails.header.toLowerCase()} factor for the prediction</FormDescription>
        <FormMessage />
    </FormItem>
)