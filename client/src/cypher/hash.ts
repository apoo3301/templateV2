import { ec as EC } from "elliptic";
import crypto from "crypto";

const ec = new EC("secp256k1");

export function hashPassword(password: string): string {
  const hash = crypto.createHash("sha256");
  hash.update(password);
  return hash.digest("hex");
}

export function comparePasswordHash(
  password: string,
  hashedPassword: string
): boolean {
  return hashPassword(password) === hashedPassword;
}

export function generateKeyPair(): { privateKey: string; publicKey: string } {
  const keyPair = ec.genKeyPair();
  return {
    privateKey: keyPair.getPrivate("hex"),
    publicKey: keyPair.getPublic("hex"),
  };
}

export function getPublicKeyFromPrivateKey(privateKey: string): string {
  const keyPair = ec.keyFromPrivate(privateKey);
  return keyPair.getPublic("hex");
}

export function signData(data: string, privateKey: string): string {
  const keyPair = ec.keyFromPrivate(privateKey);
  const signature = keyPair.sign(data);
  return signature.toDER("hex");
}

//TODO: verify signature & create an accestoken