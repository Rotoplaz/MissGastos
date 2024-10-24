import InitialScreen from "./initial";
import { useEffect, useRef, useState } from "react";
import { UserRepositorySqliteImpl } from '../../infrastructure/user/user-sqli.repository.impl';
import { GetUserUseCase } from "@/src/application/use-cases/user/get-user.use-case";
import React from "react";
import { useUserStore } from "../store/useUserStore";
import { useRouter } from "expo-router";
import { User } from "@/src/domain/entities/user.entity";
import { FullLoaderScreen } from "../screens/loaders/FullLoaderScreen";

export default function Index() {
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
  const userRepository = useRef(new UserRepositorySqliteImpl());
  const setUserStore = useUserStore(state=>state.setUser);
  const router = useRouter()
  useEffect(()=>{

    const getUser = async () => {

      const user = await new GetUserUseCase(
        userRepository.current
      ).execute();
      
      setIsLoadingUser(false);
      
      if (!user) {
        return;
      }
      router.replace({pathname: '/(home)'})
      
      setUserStore(user);
    }

    getUser();
  },[]);

  return (
    <>
      {
        isLoadingUser ? <FullLoaderScreen/> : <InitialScreen />
      }
      
    </>
  );
}
