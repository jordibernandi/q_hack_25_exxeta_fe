import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  // FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X } from "lucide-react";
import * as React from "react";
import { useProjectStore } from "@/stores/projectStore";
import { Textarea } from "@/components/ui/textarea";

export default function ImportProject() {
  const { setProjectData, setFileData, fileData } = useProjectStore();

  const onFileValidate = React.useCallback(
    (file: File): string | null => {
      // Validate max files (only allow one JSON file)
      if (fileData.length >= 1) {
        return "You can only upload one JSON file";
      }

      // Validate file type (only JSON)
      if (file.type !== "application/json") {
        return "Only JSON files are allowed";
      }

      return null;
    },
    [fileData],
  );

  const onFileReject = React.useCallback((file: File, message: string) => {
    console.log(`"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected: ${message}`);
  }, []);

  const handleFileChange = (newFiles: File[]) => {
    setFileData(newFiles);

    newFiles.forEach((file) => {
      if (file.type === "application/json") {
        const reader = new FileReader();

        reader.onload = (event) => {
          try {
            const jsonData = JSON.parse(event?.target?.result as string);
            setProjectData(jsonData);
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        };

        reader.onerror = (error) => {
          console.error("Error reading file:", error);
        };

        reader.readAsText(file);
      }
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy the new project in one-click</CardDescription>
      </CardHeader>
      <CardContent>
        <FileUpload
          value={fileData}
          onValueChange={handleFileChange}
          onFileValidate={onFileValidate}
          onFileReject={onFileReject}
          accept="application/json"
          maxFiles={1}
          className="w-full"
          multiple={false}
        >
          <FileUploadDropzone>
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center justify-center rounded-full border p-2.5">
                <Upload className="size-6 text-muted-foreground" />
              </div>
              <p className="font-medium text-sm">Drag & drop JSON file here</p>
              <p className="text-muted-foreground text-xs">Or click to browse (.json only)</p>
            </div>
            <FileUploadTrigger asChild>
              <Button variant="outline" size="sm" className="mt-2 w-fit">
                Browse file
              </Button>
            </FileUploadTrigger>
          </FileUploadDropzone>
          <FileUploadList>
            {fileData.map((file) => (
              <FileUploadItem key={file.name} value={file}>
                <FileUploadItemMetadata />
                <FileUploadItemDelete
                  asChild
                  onClick={() => { setFileData([]); setProjectData([]); }}
                >
                  <Button variant="ghost" size="icon" className="size-7">
                    <X />
                  </Button>
                </FileUploadItemDelete>
              </FileUploadItem>
            ))}
          </FileUploadList>
        </FileUpload>
        <div className="flex flex-col gap-4 mt-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="projectName">Project Name</Label>
            <Input type="projectName" id="projectName" placeholder="Project Name" />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="desc">Description</Label>
            <Textarea placeholder="Type the project description." id="desc" rows={5} className="w-full h-32" />
          </div>
        </div>
      </CardContent>
    </Card>

  );
}