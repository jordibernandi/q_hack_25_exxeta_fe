import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useProjectStore } from "@/stores/projectStore";
import { useRecommendCandidateMutation } from "../hooks/useFetchApi";
import { useEffect, useState } from "react";
import CandidateTable from "./candidate-table";
import { Candidate, CandidateGroup } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { sendCandidateEmails } from "../api/recommender-api";
import CardLoader from "@/components/card-loader";
import { Spinner } from "@/components/ui/spinner";


export default function CandidateList() {
    const { selectedProject } = useProjectStore();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSendingEmail, setIsSendingEmail] = useState(false);
    const [candidateEmails, setCandidateEmails] = useState<CandidateGroup>(() => {
        return Array.from({ length: selectedProject.projectApplication.projectDetails.requirements.length }, () => []);
    });

    // Function to update candidateEmails based on child's selection
    const updateSelectedEmails = (index: number, selection: Record<number, boolean>, currentGroup: Candidate[]) => {
        if (index >= 0 && index < candidateEmails.length && currentGroup) {
            const selectedCandidates = currentGroup.filter((_, i) => selection[i]);
            // Create a new copy of candidateEmails to avoid direct mutation
            const updatedEmails = [...candidateEmails];
            updatedEmails[index] = selectedCandidates;
            setCandidateEmails(updatedEmails);
        }
    };

    const handleSendEmails = async () => {
        setIsSendingEmail(true); // Set loading state to true
        const body = {
            project: selectedProject,
            candidates: candidateEmails
        }

        try {
            const result = await sendCandidateEmails(body);
            console.log('Emails sent successfully:', result);
            setIsDialogOpen(false);
            // Optionally show a success message to the user
        } catch (error: any) {
            console.error('Failed to send emails:', error.message);
            setIsDialogOpen(false);
            // Optionally show an error message to the user
        } finally {
            setIsSendingEmail(false); // Set loading state back to false
        }
    };

    const { mutate, data, isPending, isError } = useRecommendCandidateMutation();

    useEffect(() => {
        if (selectedProject) {
            const body = selectedProject;
            mutate(body);
        }
    }, [selectedProject, mutate]);

    if (isPending) {
        return <CardLoader title={"Candidate List"} description={"Top Rank Candidates"} isLoading={isPending} />
    }

    if (isError) {
        return <div>Error</div>;
    }

    // Don't render "Error" if data is available
    return (
        <Card className="w-full">
            <CardHeader className="relative">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="absolute top-3 right-3" variant="outline">Email</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Summary of Email</DialogTitle>
                        </DialogHeader>
                        <ul className="list-disc">
                            {selectedProject.projectApplication.projectDetails.requirements.map((req, index) => (
                                <li key={req.skill} className="font-bold">{req.skill}
                                    <ul className="list-desc">
                                        {candidateEmails[index].map(candidate => (
                                            <li key={candidate.profile_name} className="font-light">- {candidate.profile_name}</li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                        <DialogFooter>
                            {isSendingEmail && <Spinner className="mr-2" size="small" />}
                            <Button onClick={handleSendEmails} disabled={isSendingEmail}>
                                Send
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <CardTitle>Candidate List</CardTitle>
                <CardDescription>Top Rank Candidates</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue={selectedProject.projectApplication.projectDetails.requirements[0].skill} className="">
                    <TabsList className="flex">
                        {selectedProject.projectApplication.projectDetails.requirements.map((req, index) => (
                            <TabsTrigger key={req.skill} value={req.skill}>
                                <div className="flex items-center gap-2">
                                    {req.skill} <span className="rounded-full bg-green-100 p-0.5 text-green-800 text-sm font-medium mr-2">
                                        {selectedProject.projectApplication.projectDetails.requirements[index].amount - candidateEmails[index].length}
                                    </span>
                                </div>
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {selectedProject.projectApplication.projectDetails.requirements.map((req, index) => (
                        <TabsContent key={req.skill} value={req.skill}>
                            {data && Array.isArray(data) && data[index] ? (
                                <CandidateTable
                                    data={data[index]}
                                    candidateEmails={candidateEmails}
                                    currentIndex={index}
                                    onSelectionChange={updateSelectedEmails}
                                />
                            ) : (
                                <div>No data available for this requirement</div>
                            )}
                        </TabsContent>
                    ))}
                </Tabs>
            </CardContent>
        </Card>
    );
};