export function isLocal() {
  const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
  return (
    SUPABASE_URL?.includes('localhost') ||
    SUPABASE_URL?.includes('127.0.0.1') ||
    SUPABASE_URL?.includes('kong:')
  )
}
