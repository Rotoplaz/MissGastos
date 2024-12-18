import * as SQLite from "expo-sqlite";

export const getDataBase = async () => {
    const db = await SQLite.openDatabaseAsync("MissGastosDataBase", {
        useNewConnection: true,
        finalizeUnusedStatementsBeforeClosing: true,
    });

    return db;
}