// app/contact/actions.ts
"use server";

import { pb } from "@/lib/pb"; // PocketBase singleton

/**
 * Accepts <formData> from the client component and writes a record
 * into the PocketHost “contact” collection.
 */
export async function submitContactForm(formData: FormData) {
  try {
    const payload = {
      name: formData.get("name") ?? "",
      major: formData.get("major") ?? "",
      college: formData.get("college") ?? "",
      email: formData.get("email") ?? "",
      linkedin: formData.get("linkedin") ?? "",
      instagram: formData.get("instagram") ?? "",
      message: formData.get("message") ?? "",
      hasResponded: false,
    };

    // send to PocketBase
    console.log("why not working", payload);
    await pb.collection("contact").create(payload);
  } catch (err) {
    console.error("Contact form error:", err);
  }
}
