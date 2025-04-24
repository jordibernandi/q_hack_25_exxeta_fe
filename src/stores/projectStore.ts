import { create } from 'zustand';

interface ProjectState {
    fileData: File[];
    setFileData: (data: File[]) => void;
    projectData: undefined[];
    setProjectData: (data: undefined) => void;
    clearProjectData: () => void;
    selectedProject: undefined | null;
    setSelectedProject: (data: undefined) => void;
    clearSelectedProject: () => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
    fileData: [],
    setFileData: (data: File[]) => set({ fileData: data }),
    projectData: [],
    setProjectData: (data) => set({ projectData: data }),
    clearProjectData: () => set({ projectData: [] }),
    selectedProject: null,
    setSelectedProject: (data) => set({ selectedProject: data }),
    clearSelectedProject: () => set({ selectedProject: null }),
}));