"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
    Form,
    FormField,
} from "@/components/ui/form"
import { categoricalFormFields, quantitativeFieldNames } from "@/lib/model_inputs"
import CategoricalInput from "./form-inputs/CategoricalInput"
 
const formSchema = z.object({
    // Dynamically add categorical fields to the schema
    ...categoricalFormFields.reduce((acc, field) => {
      acc[field.fieldName] = z.string().min(1, { message: `Please select a ${field.header}.` });
      return acc;
    }, {} as Record<string, z.ZodString>),
    // Dynamically add quantitative fields to the schema
    ...quantitativeFieldNames.reduce((acc, field) => {
      acc[field.fieldName] = z.coerce.number().min(1, { message: `Please provide a valid ${field.header}.` });
      return acc;
    }, {} as Record<string, z.ZodNumber>),
  });

export default function PredictionForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            existingCheckingAccountBalance: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[600px] flex flex-col justify-center">
                {categoricalFormFields.map(categoricalField => 
                    <FormField 
                    key={categoricalField.fieldName}
                    control={form.control}
                    name={categoricalField.fieldName}
                    render={CategoricalInput({fieldDetails: categoricalField})}
                    />)}
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}