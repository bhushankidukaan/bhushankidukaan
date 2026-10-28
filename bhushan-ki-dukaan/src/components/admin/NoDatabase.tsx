/** Shown on admin pages when DATABASE_URL is missing, instead of an error page. */
export default function NoDatabase() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream p-4">
      <div className="max-w-md rounded-xl bg-white p-6 text-center shadow-xl ring-1 ring-champagne">
        <h1 className="font-serif text-3xl text-maroon-dark">Database not connected</h1>
        <p className="mt-2 text-sm text-muted">
          Add the Neon connection string as <code>DATABASE_URL</code> (in <code>.env.local</code> locally, or as a Cloudflare secret
          on the live site), then run <code>npm run db:setup</code> once.
        </p>
      </div>
    </div>
  );
}
