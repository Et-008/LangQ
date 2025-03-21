"use client";

import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const [keys, setKeys] = useState<any[] | null>(null);

    return (
        <div
            className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center cursor-pointer"
            onClick={() => redirect("/projects/admin")}
        >
            Localise keys
        </div>
    );
}
