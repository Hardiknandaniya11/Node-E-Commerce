import bcrypt from "bcrypt";

export default class Encryption {

    async encryptPassword(password: string): Promise<string> {

        const hashedPassword = await bcrypt.hash(password, 10);

        return hashedPassword
    }
}

