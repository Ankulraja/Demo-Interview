export async function GET() {
  // Only show in development or if explicitly enabled
  if (process.env.NODE_ENV === 'production' && !process.env.DEBUG_ENV) {
    return Response.json({ error: "Debug endpoint disabled in production" }, { status: 403 });
  }

  const firebaseEnvVars = {
    NEXT_PUBLIC_FIREBASE_API_KEY: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: !!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: !!process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: !!process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: !!process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  return Response.json({
    environment: process.env.NODE_ENV,
    firebaseVars: firebaseEnvVars,
    allEnvVars: Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC_FIREBASE')),
  });
}
