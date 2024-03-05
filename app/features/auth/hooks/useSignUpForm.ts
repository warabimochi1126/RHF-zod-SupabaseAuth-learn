import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signUpFormSchema } from "../lib/formSchema";
import { SubmitHandler, useForm } from "react-hook-form"
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";


export const useSignUpForm = () => {
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
                console.log(signUpError);
                throw signUpError;
            }

            const { error: userError } = await supabase.from("User").insert({
                id: data.user?.id,
                username,
                email,
            })

            if (userError) {
                console.log(userError.message);
                throw userError;
            }

            router.push("/auth/login");
        } catch (err) {
            if (err instanceof Error) {
                console.log(err.message);
            }
        }
    }

    return { form, onSubmit }
}