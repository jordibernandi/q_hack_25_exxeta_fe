import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useProjectStore } from "@/stores/projectStore";
import { PersonStanding, Factory, CalendarCheck, Clock, Wallet, FolderPen, Mail, Phone, MapPin, Globe } from "lucide-react";
import { formatEuro, formatProjectDuration } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function ProjectDetail() {
    const { selectedProject } = useProjectStore();

    const duration = formatProjectDuration({
        startDate: selectedProject.projectApplication.projectDetails.startDate,
        endDate: selectedProject.projectApplication.projectDetails.endDate,
    });

    const budget = formatEuro(selectedProject.projectApplication.projectDetails.budget);

    return (
        <Card className="w-full">
            <CardHeader className="relative">
                <Badge className="absolute top-6 right-6" variant={selectedProject.projectApplication.applicationStatus}>{selectedProject.projectApplication.applicationStatus}</Badge>
                <CardTitle>{selectedProject.projectApplication.businessDetails.name}</CardTitle>
                <CardDescription>{selectedProject.projectApplication.projectDetails.projectName}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-2 ">
                    <div className="flex flex-row gap-2 items-center">
                        <CalendarCheck className="mr-2 h-4 w-4 opacity-70" />
                        <span className="text-xs text-muted-foreground">{selectedProject.projectApplication.projectDetails.startDate} - {selectedProject.projectApplication.projectDetails.endDate}</span>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <Clock className="mr-2 h-4 w-4 opacity-70" />
                        <span className="text-xs text-muted-foreground">{duration}</span>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <Wallet className="mr-2 h-4 w-4 opacity-70" />
                        <span className="text-xs text-muted-foreground">{budget}</span>
                    </div>
                    <Accordion defaultValue={["item-requirements"]} type="multiple">
                        <AccordionItem value="item-requirements">
                            <AccordionTrigger>Requirements</AccordionTrigger>
                            <AccordionContent>
                                {selectedProject.projectApplication.projectDetails.requirements.map(req => (
                                    <div key={req.skill} className="mb-3 flex items-center">
                                        <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-0.5 text-blue-800 text-sm font-medium mr-2">
                                            {req.skill}
                                        </span>
                                        <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-green-800 text-sm font-medium mr-2">
                                            <PersonStanding className="w-4 h-4 mr-1" />
                                            {req.amount}
                                        </span>
                                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-0.5 text-yellow-800 text-sm font-medium">
                                            {req.recommendedSeniority}
                                        </span>
                                    </div>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-detail">
                            <AccordionTrigger>Detail</AccordionTrigger>
                            <AccordionContent>
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-row gap-2 items-center">
                                        <Factory className="mr-2 h-4 w-4 opacity-70" />
                                        <span className="text-xs text-muted-foreground">{selectedProject.projectApplication.businessDetails.industry}</span>
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <MapPin className="mr-2 h-4 w-4 opacity-70" />
                                        <span className="text-xs text-muted-foreground">{selectedProject.projectApplication.businessDetails.location}</span>
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <Globe className="mr-2 h-4 w-4 opacity-70" />
                                        <span className="text-xs text-muted-foreground">{selectedProject.projectApplication.businessDetails.website}</span>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-desc">
                            <AccordionTrigger>Description</AccordionTrigger>
                            <AccordionContent>
                                <span className="whitespace-pre-wrap">
                                    {selectedProject.projectApplication.projectDetails.description}
                                </span>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-contact">
                            <AccordionTrigger>Contact</AccordionTrigger>
                            <AccordionContent>
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-row gap-2 items-center">
                                        <FolderPen className="mr-2 h-4 w-4 opacity-70" />
                                        <span className="text-xs text-muted-foreground">{selectedProject.projectApplication.businessDetails.contactPerson.name}</span>
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <Mail className="mr-2 h-4 w-4 opacity-70" />
                                        <span className="text-xs text-muted-foreground">{selectedProject.projectApplication.businessDetails.contactPerson.email}</span>
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <Phone className="mr-2 h-4 w-4 opacity-70" />
                                        <span className="text-xs text-muted-foreground">{selectedProject.projectApplication.businessDetails.contactPerson.phone ? selectedProject.projectApplication.businessDetails.contactPerson.phone : "-"}</span>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </CardContent>
        </Card>
    );

}