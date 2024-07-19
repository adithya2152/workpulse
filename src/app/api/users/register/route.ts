import supabase from "@/dbConfig/supabase"

export async function POST(request: Request) {
    try {
        console.log("supabase", supabase);
        const { username, email } = await request.json();

        const { data: existingUsers, error: selectError } = await supabase
            .from("pendingusers")
            .select("*")
            .eq("ename", username)
            .eq("email", email);

        console.log("supabase", existingUsers);

        if (selectError) {
            throw new Error(selectError.message);
        }

        if (existingUsers && existingUsers.length > 0) {
            return new Response(JSON.stringify({ message: "User already registered" }), { status: 409 });
        }

        const { error: insertError } = await supabase
            .from("pendingusers")
            .insert({ ename: username, email: email });

        if (insertError) {
            throw new Error(insertError.message);
        }

        return new Response(JSON.stringify({ message: "Inserted successfully" }), { status: 200 });
    } catch (error: any) {
        console.log("Processing error ", error);
        return new Response(JSON.stringify({ error: error.message || "Something went wrong" }), { status: 500 });
    }
}
