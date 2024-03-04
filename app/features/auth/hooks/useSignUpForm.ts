import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signUpFormSchema } from "../lib/formSchema";
import { SubmitHandler, useForm } from "react-hook-form"


export const useSignUpForm = () => {
    const form = useForm<z.infer<typeof signUpFormSchema>>({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        }
    });

    const onSubmit: SubmitHandler<z.infer<typeof signUpFormSchema>> = (data) => {
        const { username, email, password } = data;
        console.log(username, email, password);
    }

    return { form, onSubmit }
}