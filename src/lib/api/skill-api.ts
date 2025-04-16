
import { Skill, CreateSkillDTO, UpdateSkillDTO } from "@/lib/types/skill";
import { toast } from "sonner";

// Base URL for API requests
const API_BASE_URL = "http://localhost:3000/api";

class SkillApi {
  // Get all skills
  async getSkills(): Promise<Skill[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/skills`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch skills:", error);
      toast.error("Failed to load skills");
      return [];
    }
  }

  // Get a skill by ID
  async getSkillById(id: string): Promise<Skill | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/skills/${id}`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch skill with ID ${id}:`, error);
      toast.error("Failed to load skill details");
      return null;
    }
  }

  // Create a new skill
  async createSkill(skillData: CreateSkillDTO): Promise<Skill> {
    try {
      const response = await fetch(`${API_BASE_URL}/skills`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(skillData),
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const newSkill = await response.json();
      toast.success("Skill created successfully");
      return newSkill;
    } catch (error) {
      console.error("Failed to create skill:", error);
      toast.error("Failed to create skill");
      throw error;
    }
  }

  // Update a skill
  async updateSkill(skillData: UpdateSkillDTO): Promise<Skill> {
    try {
      const response = await fetch(`${API_BASE_URL}/skills/${skillData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(skillData),
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const updatedSkill = await response.json();
      toast.success("Skill updated successfully");
      return updatedSkill;
    } catch (error) {
      console.error(`Failed to update skill with ID ${skillData.id}:`, error);
      toast.error("Failed to update skill");
      throw error;
    }
  }

  // Delete a skill
  async deleteSkill(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/skills/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      toast.success("Skill deleted successfully");
      return true;
    } catch (error) {
      console.error(`Failed to delete skill with ID ${id}:`, error);
      toast.error("Failed to delete skill");
      return false;
    }
  }
}

// Export as a singleton
export const skillApi = new SkillApi();
