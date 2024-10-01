


export function generateUUID(): string {
    const timestamp = Date.now();
    const nanoseconds = (performance.now() % 1) * 1_000_000;
    const buffer = new Uint8Array(16);
  
    const highTimestamp = Math.floor(timestamp / 1000);
    const lowTimestamp =
      (timestamp % 1000) * 10_000_000 + Math.floor(nanoseconds);
  
    buffer[0] = (highTimestamp >> 24) & 0xff;
    buffer[1] = (highTimestamp >> 16) & 0xff;
    buffer[2] = (highTimestamp >> 8) & 0xff;
    buffer[3] = highTimestamp & 0xff;
    buffer[4] = (lowTimestamp >> 24) & 0xff;
    buffer[5] = (lowTimestamp >> 16) & 0xff;
    buffer[6] = (lowTimestamp >> 8) & 0xff;
    buffer[7] = lowTimestamp & 0xff;
  
    for (let i = 8; i < 16; i++) {
      buffer[i] = Math.floor(Math.random() * 256);
    }
  
    buffer[6] = (buffer[6] & 0x0f) | 0x70;
    buffer[8] = (buffer[8] & 0x3f) | 0x80;
  
    const hex = Array.from(buffer)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
    return `${hex.substring(0, 8)}-${hex.substring(8, 12)}-${hex.substring(
      12,
      16
    )}-${hex.substring(16, 20)}-${hex.substring(20)}`;
  }
  