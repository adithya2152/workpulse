import supabase from "@/dbConfig/supabase";

export async function POST(request: Request) {
    try {
        if (request.method !== "POST") {
            return new Response(JSON.stringify({ message: "Method not allowed" }), { status: 405 });
        }

        const { eid, password } = await request.json();

        if (!eid || !password) {
            return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
        }

        const { data: existingUsers, error: selectError } = await supabase
            .from("authentication")
            .select("*")
            .eq("eid", eid);

        if (selectError) {
            console.log("Error fetching user: ", selectError);
            return new Response(JSON.stringify({ message: "Error fetching user" }), { status: 500 });
        }

        if (existingUsers && existingUsers.length > 0) {
            if (existingUsers[0].password === password) {
                return new Response(JSON.stringify({ message: "Login successful" }), { status: 200 });
            } else {
                return new Response(JSON.stringify({ message: "Invalid password" }), { status: 401 });
            }
        } else {
            return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
        }

    } catch (error: any) {
        console.log("Processing error: ", error);
        return new Response(JSON.stringify({ error: error.message || "Something went wrong" }), { status: 500 });
    }
}
