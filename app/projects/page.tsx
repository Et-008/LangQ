"use client";

import { createClient } from "@/utils/supabase/client";
import { CustomModal } from "@/components/modal/modal";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { languagesArray } from "@/constants/Languages";

export default function Page() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const supabase = createClient();
  const [projects, setProjects] = useState<any[]>([]);
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
      .eq("user_id", user?.email)
      .then(({ data }) => {
        setProjects(data || []);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user?.email) {
      getProjects();
    }
  }, [user]);

  // Pass the checkbox name to the function
  function getCheckedBoxes() {
    var checkboxes: NodeListOf<HTMLInputElement> =
      document.querySelectorAll("input:checked");
    var checkboxesChecked = [];
    // loop over them all
    for (var i = 0; i < checkboxes.length; i++) {
      // And stick the checked ones onto an array...
      if (checkboxes[i]?.checked) {
        checkboxesChecked.push(checkboxes[i]?.id);
      }
    }
    // Return the array if it is non-empty, or null
    return checkboxesChecked.length > 0 ? checkboxesChecked : null;
  }

  function createProject() {
    const projectName = (
      document.getElementById("projectName") as HTMLInputElement
    )?.value;
    const checkedBoxes = getCheckedBoxes();

    console.log(checkedBoxes);

    supabase
      .from("projects")
      .insert({
        user_id: user?.email,
        name: projectName || `Test ${projects?.length}`,
        selectedLanguages: checkedBoxes?.length ? checkedBoxes : ["en"],
      })
      .then((res) => {
        getProjects();
        setIsOpen(false);
      });
  }

  return (
    <div className="px-4 py-4 sm:px-6 lg:px-8">
      <Link className="text-[12px]" href={"/projects"}>
        Projects
      </Link>
      {isOpen && (
        <CustomModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="modal min-h-80 min-w-80 flex flex-col">
            <h1 className="text-3xl font-bold">Add New Project</h1>
            <div className="py-6 flex gap-3">
              <span className="text-sm/6 font-semibold required">Name</span>
              <input
                id="projectName"
                title="Name"
                required
                type="text"
                className="input input-bordered w-full max-w-xs"
                placeholder=""
              />
            </div>
            <div className="flex flex-wrap">
              <fieldset>
                <legend className="text-sm/6 font-semibold">
                  Choose all your preffered languages:
                </legend>
                <span className="flex gap-5 flex-wrap checkbox-wrapper mt-5 grid grid-cols-5">
                  {languagesArray?.map((language) => {
                    return (
                      <div
                        key={language?.code}
                        className="flex gap-1 checkbox-wrapper"
                      >
                        <input
                          id={language?.code}
                          name={language?.label}
                          className="substituted"
                          type="checkbox"
                          aria-hidden="true"
                          {...(language?.default
                            ? { defaultChecked: true }
                            : {})}
                        />
                        <label
                          htmlFor={language?.code}
                          className="items-center"
                        >
                          {language?.label}
                        </label>
                      </div>
                    );
                  })}
                </span>
              </fieldset>
            </div>
            <div className="flex gap-2 mt-auto ml-auto">
              <Button onClick={createProject}>Save</Button>
              <button
                className="btn btn-secondary"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </CustomModal>
      )}
      {projects?.length ? (
        projects?.map((project) => {
          return (
            <div
              key={project?.id}
              className="bg-accent text-sm p-3 m-5 px-5 rounded-md text-foreground flex gap-3 items-center cursor-pointer"
              onClick={() => redirect(`/projects/${project?.id}/admin`)}
            >
              {project.name}
              <svg
                className="ml-auto"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          );
        })
      ) : (
        <div className="text-center text-sm p-3 m-5 px-5 rounded-md text-foreground flex gap-3 items-center cursor-pointer">
          No Projects yet, please create one
        </div>
      )}

      <div
        className=" text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center cursor-pointer"
        onClick={() => setIsOpen(true)}
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
        Add a new project
      </div>
    </div>
  );
}
