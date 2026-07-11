import { timingSafeEqual } from "crypto";

export function assertAdminPasskey(passkey: string | null) {
  const configuredPasskey = process.env.ADMIN_PASSKEY;

  if (!configuredPasskey) {
    return {
      ok: false,
      reason: "ADMIN_PASSKEY is missing in deployment environment variables.",
    };
  }

  if (!passkey) {
    return {
      ok: false,
      reason: "Admin passkey is required.",
    };
  }

  const configuredBuffer = Buffer.from(configuredPasskey);
  const providedBuffer = Buffer.from(passkey);
  const isMatch =
    configuredBuffer.length === providedBuffer.length &&
    timingSafeEqual(configuredBuffer, providedBuffer);

  if (!isMatch) {
    return {
      ok: false,
      reason: "Admin passkey is incorrect.",
    };
  }

  return {
    ok: true,
    reason: null,
  };
}
