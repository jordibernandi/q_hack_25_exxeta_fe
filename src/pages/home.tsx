import ImportProject from "@/features/recommender/components/import-project";
import ProjectDetail from "@/features/recommender/components/project-detail";
import ProjectList from "@/features/recommender/components/project-list";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useProjectStore } from "@/stores/projectStore";
import CandidateList from "@/features/recommender/components/candidate-list";

export function HomePage() {

  const { selectedProject, setSelectedProject } = useProjectStore();

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-6">
        {/* <h1 className="text-3xl">Find Your Candidates</h1> */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => setSelectedProject()}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            {selectedProject?.projectApplication?.businessDetails?.name && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{selectedProject.projectApplication.businessDetails.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
        {selectedProject ? (
          <div className="flex gap-6">
            <ProjectDetail />
            <CandidateList />
          </div>
        ) : (
          <div className="flex gap-6">
            <ImportProject />
            <ProjectList />
          </div>
        )}
      </div>


    </div >
  );
};