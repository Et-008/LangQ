"use client";

import { createClient } from "@/utils/supabase/client";
import { CustomModal } from "@/components/modal/modal";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import JSZip from "jszip";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LanguageCode, languagesArray } from "@/constants/Languages";
import { ArrowDownToLine, ArrowLeftCircle, Download } from "lucide-react";

interface localiseKey {
  id?: number;
  name: string;
  value: string;
  description?: null;
  placeholders?: null;
  is_translating?: boolean;
  is_translated?: boolean;
  translations?: Record<LanguageCode, string>;
}

interface Project {
  id: string;
  name: string;
  description?: string;
  languages: LanguageCode[];
  api_key?: string;
  user_id: string;
  created_at: Date;
}

interface LanguageCheckbox extends HTMLInputElement {
  id: LanguageCode;
}

export default function DownloadPage() {
  const { projectId } = useParams();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const supabase = createClient();
  const [project, setProject] = useState<Project>();
  const [keys, setKeys] = useState<localiseKey[]>();
  const [user, setUser] = useState<any>();

  const getUser = () => {
    supabase.auth.getUser().then((res) => {
      setUser(res?.data?.user);
    });
  };

  const getProjects = () => {
    supabase
      .from("projects")
      .select()
      .eq("id", projectId)
      .then(({ data }) => {
        setProject(data?.[0]);

        supabase
          .from("keys")
          .select()
          .eq("project_id", projectId)
          .then(({ data }) => {
            const keysData = data || [];
            setKeys(keysData);
          });
      });
  };

  function downloadKeys(languageCode: LanguageCode) {
    const jsonData: Record<string, string> = {};
    keys?.forEach((key) => {
      if (key?.translations?.[languageCode]) {
        jsonData[key?.name] = key?.translations?.[languageCode];
      }
    });

    const jsonStr = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${languageCode || "en"}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  function saveMultipleJSONsAsZip(jsonObjects: any, zipFileName = "langQ.zip") {
    const zip = new JSZip();

    jsonObjects.forEach(
      ({
        filename,
        data,
      }: {
        filename: string;
        data: Record<string, string>;
      }) => {
        const jsonStr = JSON.stringify(data, null, 2);
        zip.file(
          filename.endsWith(".json") ? filename : `${filename}.json`,
          jsonStr
        );
      }
    );

    zip.generateAsync({ type: "blob" }).then((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = zipFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  }

  function downloadAllKeys() {
    const allLanguagesJsonArray: {
      filename: string;
      data: Record<string, string>;
    }[] = [];
    project?.languages?.forEach((languageCode) => {
      const jsonData: Record<string, string> = {};
      keys?.forEach((key) => {
        if (key?.translations?.[languageCode]) {
          jsonData[key?.name] = key?.translations?.[languageCode];
        }
      });
      allLanguagesJsonArray.push({ filename: languageCode, data: jsonData });
    });
    saveMultipleJSONsAsZip(allLanguagesJsonArray);
  }

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user?.email) {
      getProjects();
    }
  }, [user]);

  return (
    <div className="flex flex-col gap-16 height-[450px] w-full items-center justify-between relative">
      <div className="absolute left-0">
        <Link href={`/projects/${projectId}/admin`}>
          <ArrowLeftCircle />
        </Link>
      </div>
      <div className="flex flex-col gap-10 w-full items-center">
        Download Zip
        <Button
          variant="secondary"
          className="text-[12px] gap-1 cursor-pointer"
          onClick={downloadAllKeys}
        >
          LangQ.zip
          <Download size={16} />
        </Button>
      </div>
      <div className="flex flex-col gap-10 w-full items-center">
        Download individual languages
        <div className="flex gap-5 w-full justify-center max-w-[500px] flex-wrap">
          {languagesArray
            ?.filter((language) => {
              return !!project?.languages?.includes(language?.code);
            })
            ?.map((language) => {
              return (
                <Button
                  key={language?.code}
                  variant="secondary"
                  className="text-[12px] flex items-center gap-1 cursor-pointer"
                  onClick={() => downloadKeys(language?.code)}
                >
                  {language?.label}
                  <ArrowDownToLine size={16} />
                </Button>
              );
            })}
        </div>
      </div>
    </div>
  );
}
