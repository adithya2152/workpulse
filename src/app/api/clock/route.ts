import supabase from "@/dbConfig/supabase";

export async function POST(request: Request) {
  try {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const currentDate = `${year}-${month}-${day}`;
    const currentTime = `${hours}:${minutes}:${seconds}`;

    console.log(currentDate, currentTime);
    const { userId, modalTitle } = await request.json();
    console.log(userId, modalTitle);

    // Check if the userId exists in the employee table
    const { data: employeeData, error: employeeError } = await supabase
      .from("employee")
      .select("*")
      .eq("eid", userId);

    if (employeeError) {
      throw new Error(employeeError.message);
    }

    if (!employeeData || employeeData.length === 0) {
      return new Response(JSON.stringify({ message: "User ID not found in the employee table" }), { status: 404 });
    }

    if (modalTitle === "CheckIN") {
      const { data: existingData, error: selectError } = await supabase
        .from("checkin")
        .select("*")
        .eq("eid", userId)
        .eq("date", currentDate);

      if (selectError) {
        throw new Error(selectError.message);
      }

      if (existingData && existingData.length > 0) {
        if (existingData[0].checkedin) {
          return new Response(JSON.stringify({ message: `You have already checked in at ${existingData[0].time}` }), { status: 409 });
        } else {
          const { error: insertError } = await supabase
            .from("checkin")
            .insert({ eid: userId, date: currentDate, time: currentTime, checkedin: "true" });

          if (insertError) {
            throw new Error(insertError.message);
          }

          return new Response(JSON.stringify({ message: `You have checked in successfully at ${currentTime}` }), { status: 200 });
        }
      } else {
        // Insert a new checkin record if none exists for the day
        const { error: insertError } = await supabase
          .from("checkin")
          .insert({ eid: userId, date: currentDate, time: currentTime, checkedin: "true" });

        if (insertError) {
          throw new Error(insertError.message);
        }

        return new Response(JSON.stringify({ message: `You have checked in successfully at ${currentTime}` }), { status: 200 });
      }
    } else if (modalTitle === "CheckOUT") {
      const { data: existingCOData, error: selectError } = await supabase
        .from("checkout")
        .select("*")
        .eq("eid", userId)
        .eq("date", currentDate);

      if (selectError) {
        throw new Error(selectError.message);
      }

      if (existingCOData && existingCOData.length > 0) {
        if (existingCOData[0].checkedout) {
          return new Response(JSON.stringify({ message: `You have already checked out for the day` }), { status: 409 });
        } else {
          const { data: existingData, error: selectError } = await supabase
            .from("checkin")
            .select("*")
            .eq("eid", userId)
            .eq("date", currentDate);

          if (selectError) {
            throw new Error(selectError.message);
          }

          if (existingData && existingData.length > 0) {
            if (existingData[0].checkedin) {
              const { error: insertError } = await supabase
                .from("checkout")
                .insert({ eid: userId, date: currentDate, time: currentTime, checkedout: "true" });

              if (insertError) {
                throw new Error(insertError.message);
              }

              return new Response(JSON.stringify({ message: `You have successfully checked out at ${currentTime}` }), { status: 200 });
            } else {
              return new Response(JSON.stringify({ message: `You need to check in first before checking out` }), { status: 400 });
            }
          } else {
            return new Response(JSON.stringify({ message: `You need to check in first before checking out` }), { status: 400 });
          }
        }
      } else {
        // Insert a new checkout record if none exists for the day
        const { error: insertError } = await supabase
          .from("checkout")
          .insert({ eid: userId, date: currentDate, time: currentTime, checkedout: "true" });

        if (insertError) {
          throw new Error(insertError.message);
        }

        return new Response(JSON.stringify({ message: `You have successfully checked out at ${currentTime}` }), { status: 200 });
      }
    } else {
      return new Response(JSON.stringify({ message: "Invalid action" }), { status: 400 });
    }
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message || "Something went wrong" }), { status: 500 });
  }
}
