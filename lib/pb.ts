// lib/pb.ts
import PocketBase from "pocketbase";

export const pb = new PocketBase(
  process.env.NEXT_PUBLIC_POCKETHOST_URL ?? "https://localhost:8090"
);

// Example: hook auth store into localStorage when on the client
if (typeof window !== "undefined") {
  pb.authStore.loadFromCookie(document.cookie);
  pb.authStore.onChange(() => {
    document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
  });
}
