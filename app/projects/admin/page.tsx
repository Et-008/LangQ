"use client";

import { CustomModal } from "@/components/modal/modal";
import { createClient } from "@/utils/supabase/client";
import { ReactNode, useEffect, useState, useRef } from "react";

interface localiseKey {
    id: number;
    key: string;
    value: string;
    description?: null;
    placeholders?: null;
}

export default function Page() {
    const [isOpen, setIsOpen] = useState(false);

    const [keys, setKeys] = useState<localiseKey[] | null>(null);
    const supabase = createClient();

    useEffect(() => {
        const getData = async () => {
            const { data } = await supabase.from("localise").select();
            setKeys(data);
        };
        getData();
    }, []);

    function toggleModal() {
        setIsOpen(open => !open);
    }

    const items: ReactNode[] = [];

    if (!keys || !keys?.length) {
        // TODO Return an empty state
        return null;
    }

    for (let i = 0; i < keys?.length; i++) {
        const key = keys[i];
        items.push(
            <li key={key?.id} onClick={toggleModal}>
                {key?.key}: {key?.value}
            </li>
        );
    }

    return (
        <div>
            <CustomModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div className="modal min-h-80 min-w-80">
                    <h1 className="text-3xl font-bold">Edit key</h1>
                    <p className="py-6">
                        <input type="text" className="input input-bordered w-full max-w-xs" />
                        <input type="text" className="input input-bordered w-full max-w-xs" />
                        <input type="text" className="input input-bordered w-full max-w-xs" />
                        <input type="text" className="input input-bordered w-full max-w-xs" />
                    </p>
                    <div className="flex gap-2">
                        <button className="btn btn-primary">Save</button>
                        <button className="btn btn-secondary" onClick={toggleModal}>
                            Cancel
                        </button>
                    </div>
                </div>
            </CustomModal>
            <ul>{items}</ul>
        </div>
    );
}
