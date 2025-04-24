import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useProjectStore } from "@/stores/projectStore";
import ProjectItem from "./project-item";


export default function ProjectList() {
    const { projectData } = useProjectStore();



    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Project List</CardTitle>
                <CardDescription>List of Projects</CardDescription>
            </CardHeader>
            <CardContent>
                {projectData.length > 0 ? (
                    projectData.map((project, index) => (
                        <ProjectItem key={index} project={project} />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center p-6 h-full">
                        <p>No project data available.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );

}