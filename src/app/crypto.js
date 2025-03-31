import crypto from 'crypto';
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" })

const algorithm = 'aes-256-cbc';
const secretKey = process.env.ENCRYPTION_KEY;
if (!secretKey || secretKey.length !== 32) {
    throw new Error('ENCRYPTION_KEY must be 32 characters long');
}

export const decrypt = (encryptedContent, iv) => {
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encryptedContent, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};
const decryptedMessages = messages.map(msg => {
            if (msg.encryptedContent && msg.iv) {
                try {
                    const decrypted = decrypt(msg.encryptedContent, msg.iv);
                    return { ...msg, content: decrypted };
                } catch (e) {
                    return { ...msg, content: "[не удалось расшифровать]" };
                }
            }
            return msg;
        });