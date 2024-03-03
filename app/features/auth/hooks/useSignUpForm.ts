import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form"

export const useSignUpForm = () => {
    const form = useForm({
        resolver: zodResolver(),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        }
    });

    const onSubmit: SubmitHandler = (data) => {
        const { username, email, password } = data;
        console.log(username, email, password);
    }


    return { form, onsubmit }
}