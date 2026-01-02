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
import { authClient } from '@/lib/auth-client'
import { cn } from '@/lib/utils'

// Step 2 : Define zod schema for the form
const loginSchema = z.object({
    email : z.string().email('Invalid email address'),
    password : z.string().min(6, 'Password must be at least 6 characters'),
})

// Step 3 : Extract type from schema
type LoginFormValues = z.infer<typeof loginSchema>

// Step 4 : Create the LoginForm component

export function LoginForm() {
    const router = useRouter(); // Required for redirecting after successful login

    // 1. Initialize the form with useForm hook
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema), // use Zod resolver for validation
        // Initialize default values for the form fields
        defaultValues: {
            email: '',
            password: '',
        },
    })
    //  2. Define the onSubmit function to handle form submission
    const onSubmit = async (values : LoginFormValues) => {
        await authClient.signIn.email(
            {
                email: values.email,
                password: values.password,
                callbackURL: '/'
            },
            {
                onSuccess: () => {
                    router.push('/');
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message || 'Something went wrong during login');
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
                        Welcome Back
                    </CardTitle>

                    <CardDescription>
                        Login to Continue
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
                                    <Image alt='github' src='/logos/google.svg' width={20} height={20} />
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

                                        <Button 
                                            type='submit'
                                            className='w-full'
                                            disabled = {isPending}
                                        >
                                            Login
                                        </Button>

                                    </div>
                                    <div className='text-center text-sm'>
                                        Don't have an account?{" "}
                                        <Link href = '/signup' className='underline underline-offset-4'>
                                            Sign up
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
