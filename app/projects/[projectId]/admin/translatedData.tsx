"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface localiseKey {
  id?: number;
  name: string;
  value: string;
  description?: null;
  placeholders?: null;
}

interface translatedData {
  key_id: number;
  translations: JSON;
  created_at: string;
}

function TranslatedData({ translatedKey }: { translatedKey: localiseKey }) {
  const supabase = createClient();
  const [translation, setTranslation] = useState<translatedData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showTranslations, setShowTranslations] = useState<boolean>(false);

  function getTranslations() {
    setLoading(true);
    supabase
      .from("translatedKeys")
      .select()
      .eq("key_id", translatedKey.id)
      .then(({ data }) => {
        if (data?.length) {
          setTranslation(data?.[0]);
        }
        setLoading(false);
      });
  }

  if (loading) {
    return <div className="loader" />;
  }

  if (!showTranslations) {
    return (
      <button
        className="btn btn-secondary text-[8px]"
        onClick={() => {
          setShowTranslations(true);
          getTranslations();
        }}
      >
        Show Translations
      </button>
    );
  }

  if (showTranslations && !translation?.translations) {
    return null;
  }

  return (
    <div className="grid gap-3 mt-5">
      {Object.entries(translation?.translations)?.map(([key, value]) => {
        return (
          <div
            key={`${key}${translatedKey?.id}`}
            className="flex w-full items-center justify-between px-5 py-5 rounded-md gap-5 border"
          >
            <p className="text-sm/6 font-semibold w-fit">{key} :</p>
            <input
              disabled
              value={value}
              className="grow h-12 px-3 py-5 rounded-md inset-shadow-stone-950 shadow-md"
            />
          </div>
        );
      })}
    </div>
  );
}

export default TranslatedData;
