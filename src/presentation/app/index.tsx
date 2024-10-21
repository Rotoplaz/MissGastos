import Profile from "./profile";
import InitialScreen from "./initial";
import YourCards from "./yourCards";
import AddCard from "./addCard";
import WatchCard from "./watchCard";
import EditCard from "./editCard";
import History from "./history";
import { useEffect, useRef, useState } from "react";
import { UserRepositorySqliteImpl } from '../../infrastructure/user/user-sqli.repository.impl';
import { GetUserUseCase } from "@/src/application/use-cases/user/get-user.use-case";
import React from "react";
import { useUserStore } from "../store/useUserStore";
import { router } from 'expo-router';

export default function Index() {

  const userRepository = useRef(new UserRepositorySqliteImpl());
  const setUserStore = useUserStore(state=>state.setUser);

  useEffect(()=>{

    const getUser = async () => {

      const user = await new GetUserUseCase(
        userRepository.current
      ).execute();

      if (!user) {
        return;
      }
      // TODO: Change route to home screen
      router.replace("/profile")
      setUserStore(user);
    }

    getUser();
  },[]);

  return (
    <>
      
      <InitialScreen />
      
    </>
  );
}
