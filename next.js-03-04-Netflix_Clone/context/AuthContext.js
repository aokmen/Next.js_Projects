"use client";
import { auth } from "@/auth/firebase";
import { toastErrorNotify, toastSuccessNotify } from "@/helpers/ToastNotify";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    userObserver();
  }, []);

  const createUser = async (email, password, displayName) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      router.push("/profile");
      toastSuccessNotify("Registered successfully");
    } catch (error) {
      toastErrorNotify(error.message);
    }
  };

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/profile");
      toastSuccessNotify("Logged in successfully");
    } catch (error) {
      toastErrorNotify(error.message);
    }
  };

  const userObserver = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, displayName, photoURL } = user;
        setCurrentUser({ email, displayName, photoURL });
        sessionStorage.setItem(
          "user",
          JSON.stringify({ email, displayName, photoURL })
        );
      } else {
        // User is signed out
        setCurrentUser(false);
        sessionStorage.removeItem("user");
      }
    });
  };

  const logOut = () => {
    signOut(auth);
    toastSuccessNotify("logged out successfully");
  };

  const signUpProvider = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        router.push("/profile");
        toastSuccessNotify("Logged in successfully");
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
      });
  };

  const values = { createUser, login, currentUser, logOut, signUpProvider };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
