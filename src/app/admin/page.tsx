import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminPanel from '@/components/AdminPanel'

export default async function AdminPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Ensure only info@dariusgarage.sk can access
    if (user.email !== 'info@dariusgarage.sk') {
        // Or show a nice "Access Denied" page
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
                <h1 className="text-2xl font-bold">Access Denied</h1>
                <p className="mt-2 text-gray-400">You do not have permission to view this page.</p>
            </div>
        )
    }

    const { data: cars } = await supabase
        .from('cars')
        .select('*')
        .eq('site_id', process.env.NEXT_PUBLIC_SITE_ID!)
        .order('created_at', { ascending: false })

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight">
                        Garage Management
                    </h1>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-400">{user.email}</span>
                        <form action="/auth/signout" method="post">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors"
                            >
                                Sign out
                            </button>
                        </form>
                    </div>
                </div>

                <AdminPanel initialCars={cars || []} />
            </div>
        </div>
    )
}
