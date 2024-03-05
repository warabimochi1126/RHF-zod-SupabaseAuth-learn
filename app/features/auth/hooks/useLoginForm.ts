import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form"
import { loginFormSchema, signUpFormSchema } from "../lib/formSchema";
import { z } from "zod";
import { supabase } from "../lib/supabaseClient";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const useLoginForm = () => {
    const [error, setError] = useState("");

    const router = useRouter();


    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit: SubmitHandler<z.infer<typeof loginFormSchema>> = async (data) => {
        const { email, password } = data;
        try {
            const { data, error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (signInError) {
                console.log(signInError.message);
                setError(signInError.message);
                return;
            }

            router.push("/");
        } catch (err) {
            if (err instanceof Error) {
                console.log(err.message);
            }
        }
    }

    return { form, onSubmit }
}