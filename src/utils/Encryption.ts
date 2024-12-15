import bcrypt from "bcrypt";
import { error } from "winston";

export default class Encryption {

    async encryptPassword(password: string): Promise<string> {

        const hashedPassword = await bcrypt.hash(password, 10);

        return hashedPassword
    }

    async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {

        console.log("inside compare password")

        let compare = bcrypt.compare(plainPassword, hashedPassword)

        return compare
            
    }
}

