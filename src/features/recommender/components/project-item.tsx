import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useProjectStore } from "@/stores/projectStore";
import { Landmark } from "lucide-react";

export default function ProjectItem({ project }) {
    const { setSelectedProject } = useProjectStore();

    return (
        <>
            <div onClick={() => setSelectedProject(project)} className="cursor-pointer relative flex flex-row gap-4 p-2.5 hover:bg-gray-100 transition duration-300 ease-in-out">
                <Badge className="absolute top-3 right-3" variant={project.projectApplication.applicationStatus}>{project.projectApplication.applicationStatus}</Badge>
                <div className="w-[80px] h-[80px] flex items-center justify-center overflow-hidden bg-gray-200">
                    <Landmark className="size-6 text-muted-foreground" />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <span className="font-bold text-xl">{project.projectApplication.businessDetails.name}</span>
                    <div className="flex flex-row justify-between items-center">
                        <div className="text-xs text-gray-500 flex flex-col gap-2">
                            <span>{project.projectApplication.projectDetails.projectName}</span>
                            <span>{project.projectApplication.businessDetails.industry}</span>
                        </div>
                        <div className="text-xs text-gray-500 text-right flex flex-col gap-2">
                            <span>{project.projectApplication.projectDetails.location}</span>
                            <span>{project.projectApplication.projectDetails.startDate}</span>
                        </div>
                    </div>
                </div>
            </div>
            <Separator />
        </>
    );

}