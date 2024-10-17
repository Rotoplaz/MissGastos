import { Remainder } from "../entities/reminders.entity";


export interface RemaindersRepository {
    getRemainderById(id: number): Promise<Remainder | null>;
    createRemainder(remainder: Omit<Remainder, "id">): Promise<Remainder>;
    updateRemainder(id: number, remainder: Partial<Remainder>): Promise<Remainder>;
    deleteRemainder(id: number): Promise<void>;
    getAllRemainders(): Promise<Remainder[]>;
}
