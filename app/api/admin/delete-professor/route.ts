import { createAdminClient } from "@/lib/supabase/admin"

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()

    const supabase = createAdminClient()

    // Delete user from auth
    const { error: deleteError } = await supabase.auth.admin.deleteUser(id)

    if (deleteError) {
      return Response.json({ error: deleteError.message }, { status: 400 })
    }

    return Response.json({ success: true }, { status: 200 })
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
