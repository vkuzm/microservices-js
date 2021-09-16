import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class Password {
    static async toHash(password: string): Promise<string> {
        const salt = randomBytes(8).toString('hex');
        const buf = await Password.generateBuf(password, salt);

        return `${buf.toString('hex')}.${salt}`;
    }

    static async compare(storedPassword: string, suppliedPassword: string): Promise<boolean> {
        const [hashedPassword, salt] = storedPassword.split('.');
        const buf = await Password.generateBuf(suppliedPassword, salt);

        return hashedPassword === buf.toString('hex');
    }

    private static generateBuf(password: string, salt: string): Promise<Buffer> {
        return scryptAsync(password, salt, 64) as Promise<Buffer>;
    }
}