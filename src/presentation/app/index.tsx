import InitialScreen from "./initial";
import { useEffect, useRef, useState } from "react";
import { UserRepositorySqliteImpl } from "../../infrastructure/user/user-sqli.repository.impl";
import { GetUserUseCase } from "@/src/application/use-cases/user/get-user.use-case";
import React from "react";
import { useUserStore } from "../store/user/useUserStore";
import { useRouter } from "expo-router";
import { FullLoaderScreen } from "../common/screens/loaders/FullLoaderScreen";
import { migrateDbIfNeeded } from "@/src/infrastructure/db/migration";
import { getDataBase } from "@/src/infrastructure/db/database";


export default function Index() {
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
  const setUserStore = useUserStore((state) => state.setUser);
  const router = useRouter();
  
  useEffect(() => {
    const getUser = async () => {
      const db = await getDataBase();
      await migrateDbIfNeeded(db);
      const userRepository = new UserRepositorySqliteImpl();
      const user = await new GetUserUseCase(
        userRepository
      ).execute();
      
      setIsLoadingUser(false);
      
      if (!user) {
        return;
      }
      router.replace({ pathname: "/(home)" });
     
      await db.closeAsync();
      setUserStore(user);
    };

    getUser();
  }, []);

  return (
    <>
      {
        isLoadingUser ? <FullLoaderScreen/> : <InitialScreen />
      }
      
    </>
  );
}
