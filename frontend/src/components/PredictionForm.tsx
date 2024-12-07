"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormField,
} from "@/components/ui/form"
import { categoricalFormFields, quantitativeFormFields } from "@/lib/model_inputs"
import CategoricalInput from "./form-inputs/CategoricalInput"
import QuantitativeInput from "./form-inputs/QuantitativeInput"
import { Explanation, ExplanationInputFields, fetchExplanationKnn } from "@/lib/explanation_actions"
import { useState } from "react"

const formSchema = z.object({
    // Dynamically add categorical fields to the schema
    ...categoricalFormFields.reduce((acc, field) => {
      acc[field.fieldName] = z.nativeEnum(field.enum, { message: `Please select a ${field.header}.` });
      return acc;
    }, {} as Record<string, z.ZodTypeAny>),
    // Dynamically add quantitative fields to the schema
    ...quantitativeFormFields.reduce((acc, field) => {
      acc[field.fieldName] = z.coerce.number().min(1, { message: `Please provide a valid ${field.header}.` });
      return acc;
    }, {} as Record<string, z.ZodNumber>),
  });

export default function PredictionForm() {
    const [resultData, setResultData] = useState<null | Explanation>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const explanationAndPrediction = await fetchExplanationKnn(values as ExplanationInputFields);
        setResultData(explanationAndPrediction);
        console.log(resultData);
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[600px] flex flex-col justify-center">
                    {categoricalFormFields.map(categoricalField =>
                        <FormField
                        key={categoricalField.fieldName}
                        control={form.control}
                        name={categoricalField.fieldName}
                        render={CategoricalInput({fieldDetails: categoricalField})}
                        />)}

                    {quantitativeFormFields.map(quantitativeField =>
                        <FormField
                        key={quantitativeField.fieldName}
                        control={form.control}
                        name={quantitativeField.fieldName}
                        render={QuantitativeInput({fieldDetails: quantitativeField})}
                        />
                    )}
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
            {resultData?.explanation_html && (
                <iframe
                    title="Explanation HTML"
                    srcDoc={resultData.explanation_html}
                    style={{ width: '100%', height: '840px', border: 'none', overflow: 'auto' }}
                    sandbox="allow-scripts" // Adjust permissions as needed
                />
            )}
        </div>
    )
}