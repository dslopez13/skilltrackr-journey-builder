
import { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

import { Header } from "@/components/layout/Header";
import { SkillCard } from "@/components/skills/SkillCard";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Skill, SkillLevel } from "@/lib/types/skill";
import { skillApi } from "@/lib/api/skill-api";
import { toast } from "sonner";

const Index = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterLevel, setFilterLevel] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchSkills();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [skills, filterLevel, searchTerm]);

  const fetchSkills = async () => {
    setIsLoading(true);
    try {
      const data = await skillApi.getSkills();
      setSkills(data);
      setFilteredSkills(data);
    } catch (error) {
      console.error("Failed to fetch skills:", error);
      toast.error("Failed to load skills");
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...skills];

    // Apply level filter
    if (filterLevel !== "all") {
      filtered = filtered.filter(
        (skill) => skill.level === filterLevel as SkillLevel
      );
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (skill) =>
          skill.title.toLowerCase().includes(term) ||
          skill.description.toLowerCase().includes(term) ||
          skill.tags.some((tag) => tag.toLowerCase().includes(term))
      );
    }

    setFilteredSkills(filtered);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleLevelFilterChange = (value: string) => {
    setFilterLevel(value);
  };

  const handleDeleteSkill = async (id: string) => {
    try {
      await skillApi.deleteSkill(id);
      setSkills(skills.filter((skill) => skill.id !== id));
    } catch (error) {
      console.error("Failed to delete skill:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={handleSearchChange} />
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">My Skills</h1>
          <div className="flex items-center gap-2">
            <Select
              value={filterLevel}
              onValueChange={handleLevelFilterChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="h-64 bg-muted rounded-lg"
              ></div>
            ))}
          </div>
        ) : filteredSkills.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                onDelete={handleDeleteSkill}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-center max-w-md mx-auto">
              <h2 className="text-xl font-semibold mb-2">No skills found</h2>
              <p className="text-muted-foreground mb-6">
                {searchTerm || filterLevel !== "all"
                  ? "Try adjusting your filters or search term."
                  : "Start tracking your skills by adding your first skill."}
              </p>
              {!searchTerm && filterLevel === "all" && (
                <Button asChild>
                  <Link to="/skills/new">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Your First Skill
                  </Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
