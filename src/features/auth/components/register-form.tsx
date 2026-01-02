"use client"
// step 1 : Import necessary modules and components
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
// import { authClient } from '@/lib/auth-client'
import { cn } from '@/lib/utils'
import { authClient } from '@/lib/auth-client'

// Step 2 : Define zod schema for the form
const registerSchema = z.object({
    email : z.string().email('Invalid email address'),
    password : z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword : z.string().min(6, 'Password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

// Step 3 : Extract type from schema
type registerFormValues = z.infer<typeof registerSchema>

// Step 4 : Create the RegisterForm component

export function RegisterForm() {
    const router = useRouter(); // Required for redirecting after successful login

    // 1. Initialize the form with useForm hook
    const form = useForm<registerFormValues>({
        resolver: zodResolver(registerSchema), // use Zod resolver for validation
        // Initialize default values for the form fields
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
    })
    //  2. Define the onSubmit function to handle form submission
    const onSubmit = async (values : registerFormValues) => {
        await authClient.signUp.email(
            {
                name: values.email,
                email: values.email,
                password: values.password,
                callbackURL: '/'
            },
            {
                onSuccess: () => {
                    router.push('/');
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message || 'Something went wrong during registration');
                }
            }
        )
    }
    const isPending = form.formState.isSubmitting; // use to disable the submit button during submission

    // 3. Render the form UI
    return (
        <div className='flex flex-col gap-6'>
            <Card>
                <CardHeader className='text-center'>
                    <CardTitle>
                        Get Started
                    </CardTitle>

                    <CardDescription>
                        Create your account to get started
                    </CardDescription>

                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className='grid gap-6'>
                                <div className='flex flex-col gap-4'>
                                    {/* Github Login */}
                                    <Button 
                                        variant='outline'
                                        className='w-full'
                                        type='button'
                                        disabled={isPending}
                                    >
                                        <Image alt='github' src='/logos/github.svg' width={20} height={20} />
                                        Continue with Github
                                    </Button>
                                    {/* Google Login */}
                                    <Button 
                                        variant='outline'
                                        className='w-full'
                                        type='button'
                                        disabled={isPending}
                                    >
                                        <Image alt='google' src='/logos/google.svg' width={20} height={20} />
                                        Continue with Google
                                    </Button>
                                    {/* Explicit Login */}
                                    <div className='grid gap-6'>
                                        {/* Email Field */}
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field })=>(
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type='email'
                                                            placeholder='m@example.com'
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/> 
                                                </FormItem>
                                            )}  
                                        />
                                        {/* Password Field */}
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field })=>(
                                                <FormItem>
                                                    <FormLabel>Password</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type='password'
                                                            placeholder='********'
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/> 
                                                </FormItem>
                                            )}  
                                        />
                                        {/* Confirm Password Field */}
                                        <FormField
                                            control={form.control}
                                            name="confirmPassword"
                                            render={({ field })=>(
                                                <FormItem>
                                                    <FormLabel>Confirm Password</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type='password'
                                                            placeholder='********'
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/> 
                                                </FormItem>
                                            )}  
                                        />

                                        <Button 
                                            type='submit'
                                            className='w-full'
                                            disabled = {isPending}
                                        >
                                            Sign up
                                        </Button>

                                    </div>
                                    <div className='text-center text-sm'>
                                        Already have an account?{" "}
                                        <Link href = '/login' className='underline underline-offset-4'>
                                            Log in
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}   
