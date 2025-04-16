
import { Skill, CreateSkillDTO, UpdateSkillDTO } from "@/lib/types/skill";
import { toast } from "sonner";

// In a real application, this would be fetched from an environment variable
const API_BASE_URL = "/api";

class SkillApi {
  // For now, we'll use localStorage to simulate a database
  private readonly STORAGE_KEY = "skilltrackr-skills";

  // Simulate API calls with localStorage
  private async simulateApi<T>(operation: () => T, delay = 300): Promise<T> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, delay));
    return operation();
  }

  // Get all skills
  async getSkills(): Promise<Skill[]> {
    try {
      return this.simulateApi(() => {
        const storedSkills = localStorage.getItem(this.STORAGE_KEY);
        return storedSkills ? JSON.parse(storedSkills) : [];
      });
    } catch (error) {
      console.error("Failed to fetch skills:", error);
      toast.error("Failed to load skills");
      return [];
    }
  }

  // Get a skill by ID
  async getSkillById(id: string): Promise<Skill | null> {
    try {
      return this.simulateApi(() => {
        const skills = this.getSkillsFromStorage();
        return skills.find(skill => skill.id === id) || null;
      });
    } catch (error) {
      console.error(`Failed to fetch skill with ID ${id}:`, error);
      toast.error("Failed to load skill details");
      return null;
    }
  }

  // Create a new skill
  async createSkill(skillData: CreateSkillDTO): Promise<Skill> {
    try {
      return this.simulateApi(() => {
        const skills = this.getSkillsFromStorage();
        
        // Generate a UUID
        const newId = crypto.randomUUID();
        
        const newSkill: Skill = {
          id: newId,
          ...skillData
        };
        
        // Add to "database"
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify([...skills, newSkill]));
        
        toast.success("Skill created successfully");
        return newSkill;
      });
    } catch (error) {
      console.error("Failed to create skill:", error);
      toast.error("Failed to create skill");
      throw error;
    }
  }

  // Update a skill
  async updateSkill(skillData: UpdateSkillDTO): Promise<Skill> {
    try {
      return this.simulateApi(() => {
        const skills = this.getSkillsFromStorage();
        const index = skills.findIndex(skill => skill.id === skillData.id);
        
        if (index === -1) {
          throw new Error(`Skill with ID ${skillData.id} not found`);
        }
        
        // Update the skill
        const updatedSkill = { ...skills[index], ...skillData };
        skills[index] = updatedSkill;
        
        // Save to "database"
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(skills));
        
        toast.success("Skill updated successfully");
        return updatedSkill;
      });
    } catch (error) {
      console.error(`Failed to update skill with ID ${skillData.id}:`, error);
      toast.error("Failed to update skill");
      throw error;
    }
  }

  // Delete a skill
  async deleteSkill(id: string): Promise<boolean> {
    try {
      return this.simulateApi(() => {
        const skills = this.getSkillsFromStorage();
        const filteredSkills = skills.filter(skill => skill.id !== id);
        
        if (filteredSkills.length === skills.length) {
          throw new Error(`Skill with ID ${id} not found`);
        }
        
        // Save to "database"
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredSkills));
        
        toast.success("Skill deleted successfully");
        return true;
      });
    } catch (error) {
      console.error(`Failed to delete skill with ID ${id}:`, error);
      toast.error("Failed to delete skill");
      return false;
    }
  }

  // Helper to get skills from localStorage
  private getSkillsFromStorage(): Skill[] {
    const storedSkills = localStorage.getItem(this.STORAGE_KEY);
    return storedSkills ? JSON.parse(storedSkills) : [];
  }
}

// Export as a singleton
export const skillApi = new SkillApi();
