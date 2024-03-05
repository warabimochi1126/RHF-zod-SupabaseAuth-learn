import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signUpFormSchema } from "../lib/formSchema";
import { SubmitHandler, useForm } from "react-hook-form"
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useState } from "react";


export const useSignUpForm = () => {
    const [error, setError] = useState<string>("");

    const router = useRouter();

    const form = useForm<z.infer<typeof signUpFormSchema>>({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        }
    });

    const onSubmit: SubmitHandler<z.infer<typeof signUpFormSchema>> = async (data) => {
        const { username, email, password } = data;
        console.log(username, email, password);

        // signUp 
        try {
            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password
            });

            if(signUpError) {
                setError(signUpError.message);
                return;
            }

            const { error: userError } = await supabase.from("User").insert({
                id: data.user?.id,
                username,
                email,
            })

            if (userError) {
                if (userError.message.includes("duplicate key value violates unique constraint")) {
                    setError("既に存在するユーザーです。");
                }
                return;
            }

            router.push("/auth/email-confirm");
        } catch (err) {
            if (err instanceof Error) {
                // console.log(err.message);
            }
        }
    }

    return { form, onSubmit, error }
}