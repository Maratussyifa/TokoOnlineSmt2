"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { FormEvent, useState } from "react"
import { toast } from "sonner"

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
    /**preparing state for each input */
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [role, setRole] = useState<string>("")

    async function handleRegister(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        try {
            /** validasi password */
            if (password !== confirmPassword) {
                toast.error("Password tidak sama", { className: 'bg-rose-500 text-white' })
                return
            }

            /**prepare request requirement */
            const url = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`
            const payload = new FormData()
            payload.append("name", name)
            payload.append("email", email)
            payload.append("password", password)
            payload.append("confirmPassword", confirmPassword)
            payload.append("role", role)

            /**sending to backend */
            const response = await fetch(url, {
                method: "POST",
                body: payload,
            })

            /** Handle response data*/
            const responseData = await response.json()
            const message: string =
                typeof responseData?.message == `string` ?
                    responseData?.message :
                    Object.values(responseData?.message).join(",")

            const status: boolean = responseData?.status || false


            if (!response.ok || !status) {
                toast.error(message || 'Registration failed', {
                    className: 'bg-rose-500 text-white'
                })
                return
            }

            toast.success(message || 'Registration successful', {
                className: 'bg-green-500 text-white'
            })

            /** redirect to login page */

        } catch (error) {
            console.log(error)
            toast.error("Register failed. Please try again.", {
                className: 'bg-rose-500 text-white'
            })
        }
    }

    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                    Enter your information below to create your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleRegister}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="name">Full Name</FieldLabel>
                            <Input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <FieldDescription>
                                We&apos;ll use this to contact you. We will not share your email
                                with anyone else.
                            </FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <FieldDescription>
                                Must be at least 8 characters long.
                            </FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="role">
                                Pilih Role
                            </FieldLabel>
                            <Select value={role}
                                onValueChange={value => setRole(value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="user">User</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
                            <Input
                                id="confirm-password"
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <FieldDescription>Please confirm your password.</FieldDescription>
                        </Field>
                        <FieldGroup>
                            <Field>
                                <Button type="submit">Create Account</Button>
                                <Button variant="outline" type="button">
                                    Sign up with Google
                                </Button>
                                <FieldDescription className="px-6 text-center">
                                    Already have an account? <a href="#">Sign in</a>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}