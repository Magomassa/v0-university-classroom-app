import { createAdminClient } from "@/lib/supabase/admin"

export async function POST(request: Request) {
  try {
    const { email, password, full_name } = await request.json()

    const supabase = createAdminClient()

    // Create user in auth
    const { data: user, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        full_name,
        role: "profesor",
      },
      email_confirm: true,
    })

    if (createError || !user.user) {
      return Response.json({ error: createError?.message || "Failed to create user" }, { status: 400 })
    }

    return Response.json({ success: true, user: user.user }, { status: 201 })
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
