
export type SkillLevel = "beginner" | "intermediate" | "advanced";

export interface Skill {
  id: string;
  title: string;
  description: string;
  tags: string[];
  level: SkillLevel;
  startDate: string;
  endDate?: string;
  progress: number;
}

export interface CreateSkillDTO {
  title: string;
  description: string;
  tags: string[];
  level: SkillLevel;
  startDate: string;
  endDate?: string;
  progress: number;
}

export interface UpdateSkillDTO extends Partial<CreateSkillDTO> {
  id: string;
}
