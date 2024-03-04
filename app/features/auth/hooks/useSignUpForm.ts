import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form"
import { singUpFormSchema } from "../lib/signupFormSchema";
import { z } from "zod";

export const useSignUpForm = () => {
    const form = useForm<z.infer<typeof singUpFormSchema>>({
        resolver: zodResolver(singUpFormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        }
    });

    const onSubmit: SubmitHandler<z.infer<typeof singUpFormSchema>> = (data) => {
        const { username, email, password } = data;
        console.log(username, email, password);
    }

    return { form, onSubmit }
}