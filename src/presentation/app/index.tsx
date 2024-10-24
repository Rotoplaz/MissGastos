import Profile from "./profile";
import InitialScreen from "./initial";
import YourCards from "./(home)/cards";
import AddCard from "./addCard";
import WatchCard from "./watchCard";
import EditCard from "./editCard";
import History from "./(home)/history";
import { useEffect, useRef, useState } from "react";
import { UserRepositorySqliteImpl } from "../../infrastructure/user/user-sqli.repository.impl";
import { GetUserUseCase } from "@/src/application/use-cases/user/get-user.use-case";
import React from "react";
import { useUserStore } from "../store/useUserStore";
import { useRouter } from "expo-router";

export default function Index() {
  const userRepository = useRef(new UserRepositorySqliteImpl());
  const setUserStore = useUserStore((state) => state.setUser);
  const router = useRouter();
  useEffect(() => {
    const getUser = async () => {
      const user = await new GetUserUseCase(userRepository.current).execute();

      if (!user) {
        return;
      }
      router.replace({ pathname: "/(home)" });

      setUserStore(user);
    };

    getUser();
  }, []);

  return (
    <>
      <InitialScreen />
    </>
  );
}
