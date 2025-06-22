"use client";

import { IntlProvider } from "react-intl";
import { LanguageCode } from "@/constants/Languages";
import { useEffect, useState } from "react";

export default function LangqProvider({
  projectToken,
  locale,
  children,
}: {
  projectToken: string;
  locale: LanguageCode;
  children: React.ReactElement;
}) {
  const [keys, setKeys] = useState<Record<any, any>>({});
  const [loading, setLoading] = useState<boolean>(false);

  async function getProjectKeys() {
    setLoading(true);
    fetch(
      "https://ymsreanckxyrthosfqiq.supabase.co/functions/v1/pull-from-web",
      {
        headers: { Authorization: `Bearer ${projectToken}` },
        body: JSON.stringify({
          langCode: locale || "en",
        }),
        method: "POST",
        cache: "force-cache",
      }
    )
      .then((res) => res?.json())
      .then((response) => {
        const data: any = response;

        console.log(data, " data");

        setKeys(data?.translations?.[locale]);
        console.log(
          "data?.translations?.[locale] => ",
          data?.translations?.[locale]
        );
      })
      .catch((err) => {
        console.error(err, " error");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getProjectKeys();
  }, [projectToken, locale]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <IntlProvider locale={locale} messages={keys}>
      {children}
    </IntlProvider>
  );
}
