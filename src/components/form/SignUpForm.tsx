"use client";
import React from "react";
import { Icons } from "@components/Icon";
import { Button } from "@components/ui/button";
import { cn } from "@lib/utils";
import { Label } from "@radix-ui/react-label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useToast } from "@components/ui/use-toast";
import { useRouter } from "next/navigation";


const formSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string(),
});

const SignUpForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const response = await axios.post("/api/user", {
        email: values.email,
        password: values.password,
      });

      console.log(response.data);

      if (response.status === 201) {
        setIsLoading(false);

        toast({
          title: "Account Created Successfully",
          description: "Your account has been successfully created.",
          variant: "default",
        });
        
        router.push("/");
      } else {
        setIsLoading(false);

        toast({
          title: "Error",
          description: "Oops! something when wrong!",
          variant: "destructive",
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Oops! something when wrong!",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-1">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="name@example.com"
                          type="email"
                          autoCapitalize="none"
                          autoComplete="email"
                          autoCorrect="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-1">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign Up with Email
              </Button>{" "}
            </div>
          </form>
        </Form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
