import { Card, CardContent,CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Signin = () => {
    return(
        <div className="w-full h-screen flex justify-center items-center">
                <Card className="mx-auto max-w-sm shadow-none">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Login</CardTitle>
                    <CardDescription>Enter your email and password to login to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form >
                        <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="text" name="email" placeholder="username" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" name="password" placeholder="password"  required/>
                        </div>
                        {/* {error && <p className="text-red-500 text-xs">{error}</p>} */}
                        <Button type="submit" className="w-full bg-green-500    ">
                            Login
                        </Button>
                        </div>
                    </form>
                </CardContent>
                </Card>
            </div>
    )
}
export default Signin;