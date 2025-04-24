export type Candidate = {
  certificates: string
  languages_spoken: string
  profile_description: string
  profile_name: string
  role: string
  seniority: string
  technologies: string,
  sim_score?: string,
  total_score?: string,
  description_explanation: string,
  seniority_explanation: string,
  geo_lang_explanation: string,
  skills_explanation: string,
}

export type CandidateGroup = Candidate[][];
