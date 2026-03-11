import { theme } from "@/styles/theme";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,  
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { z } from "zod";

// Zod schema
const empInfoSchema = z.object({
  firstName: z
    .string("First name must be a string")
    .trim()
    .min(2, "First name must be at least 2 characters"),
  lastName: z
    .string("Last name must be a string")
    .trim()
    .min(2, "Last name must be at least 2 characters"),
  empID: z
    .string("Employee ID must be a string")
    .trim()
    .length(9, "Employee ID must be 9 characters"),
  email: z.email("Invalid email address"),
  phone: z
    .string("Phone number must be a string")
    .refine(
      (val) => val.replace(/\D/g, "").length === 10,
      "Phone number must be 10 digits",
    ),
});

type EmpInfoForm = z.infer<typeof empInfoSchema>;

const EmpInfo = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EmpInfoForm>({
    resolver: zodResolver(empInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      empID: "",
      email: "",
      phone: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = (data: EmpInfoForm) => {
    Alert.alert(
      "Employee information updated",
      `First Name: ${data.firstName}\nLast Name: ${data.lastName}\nEmployee ID: ${data.empID}\nemail: ${data.email}\nPhone: ${data.phone}`,
      [{ text: "OK", onPress: () => router.back() }],
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.h1}>Edit Employee Info</Text>

      {/* First Name */}
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

      {/* Employee ID */}
      <Text style={styles.label}>Employee ID</Text>
      <Controller
        control={control}
        name="empID"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.empID && styles.inputError]}
            placeholder="123456789"
            placeholderTextColor={theme.colors.muted}
            value={value}
            onChangeText={onChange}
            autoCapitalize="characters"
            maxLength={9}
          />
        )}
      />
      {errors.empID && <Text style={styles.error}>{errors.empID.message}</Text>}

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
            autoCapitalize="none"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      {/* Phone */}
      <Text style={styles.label}>Phone</Text>
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.phone && styles.inputError]}
            placeholder="555-555-5555"
            placeholderTextColor={theme.colors.muted}
            value={value}
            onChangeText={onChange}
            keyboardType="phone-pad"
          />
        )}
      />
      {errors.phone && <Text style={styles.error}>{errors.phone.message}</Text>}

      <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Save Profile</Text>
      </Pressable>
    </ScrollView>
  );
};

export default EmpInfo;

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
