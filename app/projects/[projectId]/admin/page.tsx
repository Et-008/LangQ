"use client";

import { CustomModal } from "@/components/modal/modal";
import { createClient } from "@/utils/supabase/client";
import { ParamValue } from "next/dist/server/request/params";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ReactNode,
  useEffect,
  useState,
  useRef,
  ChangeEventHandler,
  ChangeEvent,
} from "react";

interface localiseKey {
  id?: number;
  name: string;
  value: string;
  description?: null;
  placeholders?: null;
}

interface Project {
  name: string;
  user_id: string;
}

export default function Page() {
  const { projectId } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const [keys, setKeys] = useState<localiseKey[] | null>(null);
  const [project, setProject] = useState<Project | null>(null);

  const [editKey, setEditKey] = useState<localiseKey>({
    name: "",
    value: "",
  });
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
        setKeys(data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  function toggleModal() {
    setIsOpen((open) => !open);
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
        className="flex justify-between gap-x-6 py-5"
        key={key?.id}
        // onClick={toggleModal}
      >
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
          <p className="text-sm/6">{key?.value}</p>
          <span
            onClick={() => {
              setEditKey(key);
              toggleModal();
            }}
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
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
          </span>
          {/* <div className="mt-1 flex items-center gap-x-1.5">
            <div className="flex-none rounded-full bg-emerald-500/20 p-1">
              <div className="size-1.5 rounded-full bg-emerald-500"></div>
            </div>
            <p className="text-xs/5 text-gray-500">Online</p>
          </div> */}
        </div>
      </li>
    );
  }

  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      {editKey && (
        <CustomModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <KeyForm
            projectId={projectId}
            editKey={editKey}
            toggleModal={toggleModal}
            onSuccess={(res) => {
              getData();
              setIsOpen(false);
            }}
          />
        </CustomModal>
      )}
      <Link href={"/projects"}>Projects</Link>
      <span className="">{" > "}</span>
      {project?.name}
      <ul role="list" className="divide-y divide-gray-100">
        {items}
        <li
          className="flex justify-center items-center gap-x-6 py-5 cursor-pointer"
          key="AddKey"
          onClick={toggleModal}
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
}: {
  projectId: ParamValue;
  editKey: localiseKey;
  toggleModal: () => void;
  onSuccess: (res: any) => void;
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
        name: keyData?.name,
        value: keyData?.value,
        project_id: projectId,
        description: keyData?.description,
      })
      .eq("project_id", projectId)
      .eq("id", editKey?.id)
      .then((res) => {
        onSuccess(res);
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
    <div className="modal min-h-80 min-w-80">
      <h1 className="text-3xl font-bold">Edit key</h1>
      <div className="py-6 grid gap-5">
        <p className="">
          <span className="text-sm/6 font-semibold">Key</span>
          <input
            title="Key"
            type="text"
            className="input input-bordered w-full max-w-xs"
            value={keyData?.name}
            onChange={onChangeHandler("name")}
          />
        </p>
        <p className="">
          <span className="text-sm/6 font-semibold">Description</span>
          <input
            title="Description"
            type="text"
            className="input input-bordered w-full max-w-xs"
            value={keyData?.description || ""}
            onChange={onChangeHandler("description")}
          />
        </p>
        <p className="">
          <span className="text-sm/6 font-semibold">Value</span>
          <input
            title="Value"
            type="text"
            className="input input-bordered w-full max-w-xs"
            value={keyData?.value}
            onChange={onChangeHandler("value")}
          />
        </p>
        <p className="">
          <span className="text-sm/6 font-semibold">Placeholders</span>
          <input
            title="Placeholders"
            type="text"
            className="input input-bordered w-full max-w-xs"
            value={keyData?.placeholders || ""}
            onChange={onChangeHandler("placeholders")}
          />
        </p>
      </div>
      <div className="flex gap-2">
        <button className="btn btn-primary" onClick={saveKeyData}>
          Save
        </button>
        <button className="btn btn-secondary" onClick={toggleModal}>
          Cancel
        </button>
      </div>
    </div>
  );
}
