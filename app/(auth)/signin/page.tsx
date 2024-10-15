'use client'

import { useState } from 'react'
import Image from "next/image"
import Link from "next/link"
import { useForm } from "react-hook-form"

import { Button } from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader,CardTitle,} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react'

type FormData = {
  email: string
  password: string
}

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>()

    const onSubmit = async (data: FormData) => {
        const response = await fetch('/api/auth/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });      
        if (response.ok) {
            const { token } = await response.json();
            router.push("/admin")
        }else{
            const { error } = await response.json();
            console.log(error)
        }
    };
    

    return (
        <div className="w-full h-screen flex">
            <div className="flex-1 flex items-center justify-center">
                <Card className="mx-auto lg:w-7/12 border-0">
                <CardHeader>
                    <CardTitle className="text-2xl text-primary">Login</CardTitle>
                    <CardDescription>
                    Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email:</Label>
                        <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Invalid email address",
                            },
                        })}
                        />
                        {errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password:</Label>
                        <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 8,
                                message: 'Password must be at least 8 characters',
                            },
                            })}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-500" />
                            ) : (
                            <Eye className="h-4 w-4 text-gray-500" />
                            )}
                        </button>
                        </div>
                        {errors.password && (
                        <p className="text-sm text-red-500">{errors.password.message}</p>
                        )}
                    </div>
                    <Button type="submit" className="w-full bg-primary">
                        Login
                    </Button>
                    <Button type="button" variant="outline" className="w-full">
                        Login with Google
                    </Button>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="underline">
                        Sign up
                        </Link>
                    </div>
                    </form>
                </CardContent>
                </Card>
            </div>
            <div className="flex-1 hidden lg:block bg-muted">
                <div className="flex items-center justify-center w-full h-full">
                    <Image
                    src="/assets/icon/icon.png"
                    alt="Login cover"
                    width={500}
                    height={500}
                    className="object-cover w-56 h-56"
                    />
                </div>
            </div>
        </div>
    )
}