"use client";

import { createClient } from "@/utils/supabase/client";
import { CustomModal } from "@/components/modal/modal";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LanguageCode, languagesArray } from "@/constants/Languages";
import { isEmpty, isEqual, sortBy } from "lodash";

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

// Pass the checkbox name to the function
function getCheckedBoxes() {
  var checkboxes: NodeListOf<LanguageCheckbox> =
    document.querySelectorAll("input:checked");
  var checkboxesChecked: LanguageCode[] = [];
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

export default function Page() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const supabase = createClient();
  const [projects, setProjects] = useState<Project[]>([]);
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
        setProjects(sortBy(data, "created_at") || []);
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
        languages: checkedBoxes?.length ? checkedBoxes : ["en"],
      })
      .then((res) => {
        getProjects();
        setIsOpen(false);
      });
  }

  function updateProject(projectId: string) {
    return ({
      projectName,
      languages,
    }: {
      projectName?: string;
      languages?: LanguageCode[];
    }) => {
      return supabase
        .from("projects")
        .update({ name: projectName, languages })
        .eq("id", projectId)
        .then((res) => {
          getProjects();
          setIsOpen(false);
        });
    };
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
              <Input
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
            <ProjectDetail
              key={project?.id}
              project={project}
              updateProject={updateProject(project?.id)}
            />
          );
        })
      ) : (
        <div className="text-center text-sm p-3 m-5 px-5 rounded-md text-foreground flex gap-3 items-center cursor-pointer">
          No Projects yet, please create one
        </div>
      )}

      <div
        className="text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center cursor-pointer w-fit"
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

let timer: NodeJS.Timeout | null = null;

function ProjectDetail({
  project,
  updateProject: updateProjectFromProps,
}: {
  project: Project;
  updateProject: ({
    projectName,
    languages,
  }: {
    projectName?: string;
    languages?: LanguageCode[];
  }) => PromiseLike<void>;
}) {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  function openDetails() {
    if (!showDetails) {
      setLoading(true);
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setLoading(false);
        setShowDetails((showDetails) => {
          setEditMode(false);
          return !showDetails;
        });
      }, 1000);
    } else {
      setShowDetails((showDetails) => !showDetails);
    }
  }

  function editProject() {
    setEditMode((editMode) => !editMode);
  }

  function updateProject() {
    const projectName = (
      document.getElementById("projectName") as HTMLInputElement
    )?.value;
    const checkedBoxes = getCheckedBoxes() || [];
    const updatedObject = { projectName, languages: checkedBoxes };
    if (!isEqual(projectName, project?.name)) {
      updatedObject.projectName = projectName;
    }
    if (!isEqual(checkedBoxes, project?.languages)) {
      updatedObject.projectName = projectName;
    }
    if (!isEmpty(updatedObject)) {
      updateProjectFromProps(updatedObject).then((res) => {
        setEditMode(false);
      });
    }
  }

  return (
    <div
      key={editMode.toString()}
      className="bg-accent text-sm p-3 m-5 px-5 rounded-md text-foreground transition-all"
    >
      <div className="flex gap-3 items-center">
        <span
          className="flex gap-1 items-center cursor-pointer"
          onClick={() => redirect(`/projects/${project?.id}/admin`)}
        >
          {project.name}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </span>
        {loading ? (
          <div className="circular-progress ml-auto"></div>
        ) : (
          <svg
            onClick={openDetails}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4 ml-auto cursor-pointer"
          >
            {showDetails ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
              />
            )}
          </svg>
        )}
      </div>
      {showDetails && (
        <div
          key={`${project?.name}-${project?.languages?.length}`}
          className="bg-muted text-sm p-2 m-5 px-3 rounded-md text-foreground gap-3 items-center cursor-pointer"
        >
          <span className="flex w-full">
            {editMode && (
              <div className="pb-6 flex items-center gap-3">
                <span className="text-sm/6 font-semibold required">Name</span>
                <Input
                  id="projectName"
                  title="Name"
                  required
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  placeholder=""
                  defaultValue={project?.name}
                />
              </div>
            )}
            <span className="ml-auto">
              {editMode ? (
                <span className="flex gap-2">
                  <span className="text-muted-foreground" onClick={editProject}>
                    Cancel
                  </span>
                  <span onClick={updateProject}>Save</span>
                </span>
              ) : (
                <span title="Configure projects">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
                    onClick={editProject}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </span>
              )}
            </span>
          </span>
          <span className="flex w-full">Languages chosen: </span>

          <span className="flex gap-5 flex-wrap checkbox-wrapper mt-5 grid grid-cols-5">
            {languagesArray
              ?.sort((language) => {
                return project?.languages?.includes(language?.code) ? -1 : 1;
              })
              ?.map((language) => {
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
                      defaultChecked={project?.languages.includes(
                        language?.code
                      )}
                      disabled={!editMode}
                    />
                    <label htmlFor={language?.code} className="items-center">
                      {language?.label}
                    </label>
                  </div>
                );
              })}
          </span>
        </div>
      )}
    </div>
  );
}
