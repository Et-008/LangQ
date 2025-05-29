import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import JSZip from "npm:jszip";
import { writeFile } from "node:fs/promises";


// Update the url and key from env
const supabase = createClient(
    "",
    "",
);

export async function download(projectId: string, languages: string[]) {

    const translationResponse = await supabase.from("translatedKeys").select('keys(id, name), translations').eq("project_id", projectId);

    if (!translationResponse.data) {
        console.log("Invalid Project")
    }

    const translations: { [key: string]: { [key: string]: string } } = {}

    // const data: { [key: string]: string } = {}

    translationResponse.data?.forEach((e) => {
        languages.forEach((langCode) => {
            if (translations[`${langCode}`] == null) {
                translations[`${langCode}`] = {};
            }
            translations[`${langCode}`][`${e.keys.name}`] = `${e.translations[langCode]}`;
        });
    })


    console.log(translations);


    // Zip the temp directory
    const zip = new JSZip();

    languages.forEach((langCode) => {
        const data = translations[langCode];
        const fileName = `${langCode}.json`;
        zip.file(fileName, JSON.stringify(data, null, 2));
    });

    // Generate ZIP buffer and write to file
    const content = await zip.generateAsync({ type: "nodebuffer" });
    await writeFile("output.zip", content);

    console.log("✅ output.zip created.");

}


















