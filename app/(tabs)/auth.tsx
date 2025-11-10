import Header from "@/components/Header";
import { useAuth } from "@/hooks/AuthContext";
import React, { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";

export default function AuthScreen() {
   const {user,member, loading, error, login, register, logout, updateMember, refresh} = useAuth();

  // auth screen
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [name, setName] = useState(""); // only used in register
  const [club, setClub] = useState(""); // only used in register
  const [phone, setPhone] = useState(""); // only used in register

  const [submitting, setSubmitting] = useState(false);
  //const [error, setError] = useState<string | null>(null);

  
  let themeCol;

                if (club === "XBX") {
                    themeCol = {backgroundColor: "#6c27e3ff"}
                }
                else if (club === "PKA") {
                    themeCol = {backgroundColor: "#e01919ff"}
                }
                else if (club === "OX") {
                    themeCol = {backgroundColor: "#31d287ff"}
                }
                else if (club === "EP") {
                    themeCol = {backgroundColor: "#f5f064ff"}
                }
                else {
                    themeCol =  {backgroundColor: "#308fe2ff"}
                }

  //profile screeb
  const [showing, setShowing] = useState(false);

  async function handleSubmit() {
    setSubmitting(true);
    // setError(null);
    try {
      if (mode === "login") {
        await login(email.trim(), password);
      } else {
        await register(email.trim(), password, name.trim(), phone, club);
      }
    } catch (err: any) {
      // Appwrite throws rich errors (code, message, etc.)
      // setError(err?.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }


   if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (loading) {
    // still checking existing session
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text>Checking session…</Text>
      </View>
    );
  }

  // if logged in, show a simple profile + logout
  if (user) {
    return (
      <View style={{height: "100%"}}>
      <Header title="Profile" club=""/> {/* change to use user club*/}
    <View style={styles.container}>
      
      <View style={styles.textHolder}>

        <Text style={[styles.listingStyle, styles.welcomeTitle]}>Welcome {user?.name}!</Text>
        <Text style={[styles.listingStyle, ]}>Club: {member?.club}</Text>
          {/* name */}
        <Text style={[styles.listingStyle, ]}>Email: {member?.email}</Text>
        <Text style={[styles.listingStyle, ]}>Phone: {member?.phone}</Text>
        <Text style={[styles.listingStyle, ]}>Club: {member?.club}</Text>
          {/* password */}
        <View style={styles.passwordContainer}>
          <Text style={[styles.listingStyle, ]}>Password: 
          {showing && (
            <Text style={{color: "white"}}> {user?.password}</Text>
          )}
          </Text>
          {/* show password */}
          <Pressable onPress={() => {setShowing(!showing)}} style={[styles.showButton]}>Show</Pressable>
        </View>
      </View>

      <Pressable style={[styles.buttonHolder]} onPress={logout}>Logout</Pressable>
    </View>
    </View>
  );
  }

  // if logged OUT, show login/register form
  return (
    <ScrollView style={{height: "100%"}}>
       <Header title={mode === "login" ? "Login" : "Create Account"} club="" />
    <View style={[styles.container, {paddingInline: "10%", paddingTop: "20%"}]}>
      {/* <Text style={[styles.title, {paddingTop: "40%"}]}>
        {mode === "login" ? "Login" : "Create Account"}
      </Text> */}

      {mode === "register" && (
        <>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="words"
            value={name}
            onChangeText={setName}
            placeholder="Jane Doe"
          />

         <Text style={styles.label}>Club</Text>
            <TextInput
              style={styles.input}
              value={club}
              onChangeText={setClub}
              placeholder="xbx"
            />

            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="+12223334444"
            />
        </>
      )}

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        placeholder="you@example.com"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholder="••••••••"
      />

      {error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={submitting}
      >
        {submitting ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.buttonText}>
            {mode === "login" ? "Sign In" : "Sign Up"}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          setMode((m) => (m === "login" ? "register" : "login"))
        }
      >
        <Text style={styles.linkText}>
          {mode === "login"
            ? "Need an account? Sign up"
            : "Already have an account? Sign in"}
        </Text>
      </TouchableOpacity>
    </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  container: {
    flex: 1,
    // paddingTop: 96,
    paddingHorizontal: 24,
    backgroundColor: "black",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "white",
    marginBottom: 32,
  },
  label: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 6,
  },
  value: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 16,
  },
  input: {
    width: "100%",
    borderColor: "#333",
    borderWidth: 1,
    backgroundColor: "#1a1a1a",
    color: "white",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 14,
    marginTop: 4,
    marginBottom: 12,
  },
  buttonText: {
    color: "black",
    fontWeight: "600",
    fontSize: 16,
  },
  linkText: {
    color: "#5ea0ff",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
  },
  errorText: {
    color: "#ff6b6b",
    marginBottom: 12,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    alignSelf: "center",
    marginTop: 10,
    color: "white",
  },
  textHolder: {
    width: "80%",
    gap: 20,
    marginInline: "auto",
    marginBottom: 20,
    marginTop: 20,
    color: "white",
  },
  middle: {
    marginInline: "auto",
  },
  listingStyle: {
    fontSize: 16,
    color: "white",
  },
  passwordContainer: {
    flexDirection: "row",
    gap: 4,
    justifyContent: "space-between",
  },
  buttonHolder: {
    fontFamily: 'sans-serif',
    padding: 10,
    borderRadius: 5,
    cursor: "pointer",
    backgroundColor: "white",
    alignItems: "center",
    marginTop: 10,
    width: "62%",
    marginInline: "auto",
    color: "black",
  },
   showButton: {
    color: 'black',
    backgroundColor: "white",

    fontFamily: 'sans-serif',
    fontSize: 14,
    padding: 5,
    borderRadius: 5,
    cursor: "pointer",
  },
  flexer: {
      flexDirection: "row",
      justifyContent: 'center',
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      padding: 5,
      paddingTop: 10,
      paddingBottom: 10,
    },

});

