
import { z } from "zod";
import { theme } from "@/styles/theme";
import {useForm, Controller} from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from "expo-router";
import {
  Alert,  
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import React from 'react'; 

// zod schema for signup form validation
export const signupSchema = z.object({
    firstName: z
        .string("First name must be a string")
        .trim()
        .min(2, "First name must be at least 2 characters"),
    lastName: z
        .string("Last name must be a string")
        .trim()
        .min(2, "Last name must be at least 2 characters"),
    email: z.email("Invalid email address"),

    // password must be at least 8 characters long, contain at least one uppercase letter and one number
    password: z
        .string("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
    
    confirmPassword: z.string(),
})

.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // attach error to this specifc field
});

export type SignUpFormData = z.infer<typeof signupSchema>;

const SignUpForm = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onSubmit",
    });

    const onSubmit = (data: SignUpFormData) => {
        Alert.alert(
            "Account created successfully", 
            `Welcome, ${data.firstName} ${data.lastName}!`,
            [{ text: "OK", onPress: () => router.back() }]
        );
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.h1}>Sign Up</Text>

            {/* Sign Up Form Fields */}
    
            <Text style={styles.label}>First Name</Text>
            <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, value } }) => (
                <TextInput
                    style={[styles.input, errors.firstName && styles.inputError]}
                    placeholder="John"
                    placeholderTextColor={theme.colors.muted}
                    value={value}
                    onChangeText={onChange}
                    autoCapitalize="words"
                />
                )}
            />
            {errors.firstName && (
                <Text style={styles.error}>{errors.firstName.message}</Text>
            )}

            {/* Last Name */}
            <Text style={styles.label}>Last Name</Text>
            <Controller
                control={control}
                name="lastName"
                render={({ field: { onChange, value } }) => (
                <TextInput
                    style={[styles.input, errors.lastName && styles.inputError]}
                    placeholder="Doe"
                    placeholderTextColor={theme.colors.muted}
                    value={value}
                    onChangeText={onChange}
                    autoCapitalize="words"
                />
                )}
            />
            {errors.lastName && (
                <Text style={styles.error}>{errors.lastName.message}</Text>
            )}

            {/* Email */}
            <Text style={styles.label}>Email</Text>
            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                <TextInput
                    style={[styles.input, errors.email && styles.inputError]}
                    placeholder="john.doe@example.com"
                    placeholderTextColor={theme.colors.muted}
                    value={value}
                    onChangeText={onChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                )}
            />
            {errors.email && (
                <Text style={styles.error}>{errors.email.message}</Text>
            )}
            {/* Password */}
            <Text style={styles.label}>Password</Text>
            <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                <TextInput
                    style={[styles.input, errors.password && styles.inputError]}
                    placeholder="••••••••"
                    placeholderTextColor={theme.colors.muted}
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry
                />
                )}
            />
            {errors.password && (
                <Text style={styles.error}>{errors.password.message}</Text>
            )}

            {/* Confirm Password */}
            <Text style={styles.label}>Confirm Password</Text>
            <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, value } }) => (
                <TextInput
                    style={[styles.input, errors.confirmPassword && styles.inputError]}
                    placeholder="••••••••"
                    placeholderTextColor={theme.colors.muted}
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry
                />
                )}
            />
            {errors.confirmPassword && (
                <Text style={styles.error}>{errors.confirmPassword.message}</Text>
            )}

            <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.buttonText}>Create Account</Text>
            </Pressable>
        </ScrollView>
    );
};

export default SignUpForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  content: {
    padding: theme.spacing.screen,
  },
  h1: {
    fontSize: 22,
    fontWeight: "800",
    color: theme.colors.text,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.input,
    padding: 14,
    fontSize: 16,
    color: theme.colors.text,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  error: {
    color: theme.colors.error,
    fontSize: 13,
    marginTop: 4,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.input,
    padding: 16,
    alignItems: "center",
    marginTop: 28,
  },
  buttonText: {
    color: theme.colors.primaryText,
    fontSize: 16,
    fontWeight: "700",
  },
});