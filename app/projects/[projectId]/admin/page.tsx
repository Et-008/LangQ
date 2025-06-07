"use client";

import { CustomModal } from "@/components/modal/modal";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import { ParamValue } from "next/dist/server/request/params";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ReactNode,
  useEffect,
  useState,
  ChangeEventHandler,
  ChangeEvent,
} from "react";
import TranslatedData from "./translatedData";
import { Button } from "@/components/ui/button";
import { LanguageCode } from "@/constants/Languages";
import { DownloadIcon } from "lucide-react";

interface localiseKey {
  id?: number;
  name: string;
  value: string;
  description?: null;
  placeholders?: null;
  is_translating?: boolean;
  is_translated?: boolean;
}

interface translatedData {
  key_id: number;
  translations: JSON;
  created_at: string;
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

export default function Page() {
  const { projectId } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const [keys, setKeys] = useState<localiseKey[]>([]);
  const [project, setProject] = useState<Project | null>(null);

  const [editKey, setEditKey] = useState<localiseKey | null>(null);
  const supabase = createClient();

  const getData = () => {
    supabase
      .from("projects")
      .select()
      .eq("id", projectId)
      .then(({ data }) => {
        setProject(data?.[0]);
      });
    supabase
      .from("keys")
      .select()
      .eq("project_id", projectId)
      .then(({ data }) => {
        setKeys(data || []);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  function toggleModal() {
    setIsOpen((open) => !open);
  }

  const openModal = (key?: localiseKey) => {
    return () => {
      setEditKey(key || null);
      toggleModal();
    };
  };

  const deleteKey = (key: localiseKey) => {
    return () => {
      supabase
        .from("keys")
        .delete()
        .eq("project_id", projectId)
        .eq("id", key?.id)
        .then((res) => {
          getData();
          alert(`${key?.name} deleted successfully`);
        });
    };
  };

  function closeModal() {
    setIsOpen(false);
    setEditKey(null);
  }

  function redirectToDownload() {
    document.location.href = `/projects/${projectId}/download`;
  }

  const items: ReactNode[] = [];

  if (!keys) {
    // TODO Return an empty state
    return null;
  }

  for (let i = 0; i < keys?.length; i++) {
    const key = keys[i];
    items.push(
      <li
        className="pt-5 pb-3 key-card"
        key={key?.id}
        // onClick={toggleModal}
      >
        <div className="flex justify-between gap-x-6">
          <div className="flex min-w-0 gap-x-4">
            {/* <img className="size-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" /> */}
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 font-semibold">{key?.name}</p>
              <span className="text-xs/5 text-gray-500">
                {key?.description || "No description"}
              </span>
              {/* <p className="mt-1 truncate text-xs/5 text-gray-500">tom.cook@example.com</p> */}
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm/6 text-ellipsis w-[250px]">
              {key?.is_translating ? (
                <span className="fake-loader" />
              ) : (
                key?.value
              )}
            </p>

            <div
              className="flex flex-col gap-3 absolute key-actions"
              key={key?.id}
            >
              <span
                title="Edit"
                className="flex gap-2 cursor-pointer items-center bg-gray-500 p-2 rounded-full"
                onClick={openModal(key)}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z"
                    fill="white"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span
                title="Delete"
                className="flex gap-1 cursor-pointer items-center  bg-destructive p-2 rounded-full"
                onClick={deleteKey(key)}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="24" height="24" />
                  <path
                    d="M5 7.5H19L18 21H6L5 7.5Z"
                    stroke="white"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.5 9.5L15 19"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 9.5V19"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.5 9.5L9 19"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 5H19C20.1046 5 21 5.89543 21 7V7.5H3V7C3 5.89543 3.89543 5 5 5H8M16 5L15 3H9L8 5M16 5H8"
                    stroke="white"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
        {key ? <TranslatedData translatedKey={key} /> : null}
      </li>
    );
  }

  return (
    <div className="px-4 py-4 sm:px-6 lg:px-8">
      {editKey && (
        <CustomModal
          isOpen={isOpen}
          onClose={() => {
            closeModal();
          }}
        >
          <KeyForm
            projectId={projectId}
            editKey={editKey}
            toggleModal={toggleModal}
            onSuccess={(res) => {
              getData();
              closeModal();
            }}
          />
        </CustomModal>
      )}
      <div className="flex gap-1 w-full text-[12px]">
        <Link href={"/projects"}>Projects</Link>
        <span className="px-2">{"/"}</span>
        <span>{project?.name}</span>
        <Button
          className="text-[12px] flex items-center gap-1 cursor-pointer ml-auto"
          onClick={redirectToDownload}
        >
          <DownloadIcon size={16} />
          Download keys
        </Button>
      </div>
      <ul role="list" className="divide-y">
        {items}
        <li
          className="flex justify-center items-center gap-x-6 py-5 cursor-pointer"
          key="AddKey"
          onClick={openModal()}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          <p className="text-sm/6">Add Key</p>
        </li>
      </ul>
    </div>
  );
}

function KeyForm({
  editKey,
  projectId,
  onSuccess,
  toggleModal,
  translationData,
}: {
  projectId: ParamValue;
  editKey: localiseKey;
  toggleModal: () => void;
  onSuccess: (res: any) => void;
  translationData?: translatedData;
}) {
  const supabase = createClient();
  const [keyData, setKeyData] = useState({
    name: editKey?.name,
    value: editKey?.value,
    description: editKey?.description,
    placeholders: editKey?.placeholders,
  });

  function onChangeHandler(
    field: "name" | "value" | "description" | "placeholders"
  ): ChangeEventHandler<HTMLInputElement> {
    return (e: ChangeEvent | any) => {
      if ("value" in e.target) {
        setKeyData((prev) => ({
          ...prev,
          [field]: e.target?.value || "",
        }));
      }
    };
  }

  function createKey() {
    if (keyData?.name?.length > 1) {
      supabase
        .from("keys")
        .insert({
          name: keyData?.name,
          value: keyData?.value,
          project_id: projectId,
          description: keyData?.description,
        })
        .then((res) => {
          onSuccess(res);
        });
    }
  }

  function updateKey() {
    supabase
      .from("keys")
      .update({
        value: keyData?.value,
      })
      .eq("id", editKey?.id)
      .then((res) => {
        supabase
          .from("translation_update")
          .upsert({
            id: editKey?.id,
            value: keyData?.value,
          })
          .then((res) => {
            onSuccess(res);
          });
      });
  }

  function saveKeyData() {
    if (editKey?.id) {
      updateKey();
    } else {
      createKey();
    }
  }

  return (
    <div className="modal min-h-100 mb-12 rounded-sm bg-white px-5 py-7 shadow-three shadow-lg dark:bg-gray-dark lg:mb-5 max-h-120 overflow-auto">
      <h1 className="text-3xl font-bold  mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
        Edit key
      </h1>
      <div className="py-6 grid gap-5">
        <p className="">
          <span className="text-sm/6 font-semibold  mb-3 block text-sm font-medium text-dark dark:text-white required">
            Key
          </span>
          <Input
            required
            title="Key"
            type="text"
            className="input input-bordered w-full  border-stroke w-full rounded-sm border bg-[#f8f8f8] px-3 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
            value={keyData?.name}
            onChange={onChangeHandler("name")}
            placeholder="Provide a unique key"
          />
          {/* <input
            title="Key"
            type="text"
            className="input input-bordered w-full max-w-xs"
            value={keyData?.name}
            onChange={onChangeHandler("name")}
          /> */}
        </p>
        <p className="">
          <span className="text-sm/6 font-semibold  mb-3 block text-sm font-medium text-dark dark:text-white">
            Value
          </span>
          <Input
            title="Value"
            type="text"
            className="input input-bordered w-full  border-stroke w-full rounded-sm border bg-[#f8f8f8] px-3 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
            value={keyData?.value}
            onChange={onChangeHandler("value")}
            placeholder="Add a base value for the key"
          />
        </p>
        <p className="">
          <span className="text-sm/6 font-semibold  mb-3 block text-sm font-medium text-dark dark:text-white">
            Description
          </span>
          <Input
            title="Description"
            type="text"
            className="input input-bordered w-full  border-stroke w-full rounded-sm border bg-[#f8f8f8] px-3 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
            value={keyData?.description || ""}
            onChange={onChangeHandler("description")}
            placeholder="Describe what the key is for"
          />
        </p>
        <p className="">
          <span className="text-sm/6 font-semibold  mb-3 block text-sm font-medium text-dark dark:text-white">
            Placeholders
          </span>
          <Input
            title="Placeholders"
            type="text"
            className="input input-bordered w-full  border-stroke w-full rounded-sm border bg-[#f8f8f8] px-3 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
            value={keyData?.placeholders || ""}
            onChange={onChangeHandler("placeholders")}
          />
        </p>
      </div>
      <div className="flex gap-2">
        <Button className="btn btn-primary" onClick={saveKeyData}>
          Save
        </Button>
        <Button className="btn btn-secondary" onClick={toggleModal}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
