'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader,CardTitle,} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from '@/components/ui/select'

type FormData = {
  fName: string
  lName: string
  email: string
  password: string
  confirmPassword: string
  role: string
}

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    router.push("/admin")
  }

  const password = watch('password')

  return (
    <div className="w-full flex h-screen">
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
      <div className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-lg mx-auto border-0">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="fName">First name:</Label>
                  <Input
                    id="fName"
                    placeholder="Max"
                    {...register('fName', { required: 'First name is required' })}
                  />
                  {errors.fName && (
                    <p className="text-sm text-red-500">{errors.fName.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lName">Last name:</Label>
                  <Input
                    id="lName"
                    placeholder="Robinson"
                    {...register('lName', { required: 'Last name is required' })}
                  />
                  {errors.lName && (
                    <p className="text-sm text-red-500">{errors.lName.message}</p>
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email:</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Invalid email address',
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
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password:</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) =>
                      value === password || 'The passwords do not match',
                  })}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                )}
              </div>
              {/* <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select onValueChange={(value) => register('role', { value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && (
                  <p className="text-sm text-red-500">{errors.role.message}</p>
                )}
              </div> */}
              <Button type="submit" className="w-full bg-primary">
                Create an account
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="signin" className="underline">
                  Sign in
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}