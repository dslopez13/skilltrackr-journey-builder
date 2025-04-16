
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { SkillDetail } from "@/components/skills/SkillDetail";
import { Skill } from "@/lib/types/skill";
import { skillApi } from "@/lib/api/skill-api";
import { toast } from "sonner";

const SkillDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [skill, setSkill] = useState<Skill | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchSkill(id);
    }
  }, [id]);

  const fetchSkill = async (skillId: string) => {
    setIsLoading(true);
    try {
      const data = await skillApi.getSkillById(skillId);
      if (data) {
        setSkill(data);
      } else {
        toast.error("Skill not found");
      }
    } catch (error) {
      console.error("Failed to fetch skill:", error);
      toast.error("Failed to load skill");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-8">
          <div className="animate-pulse space-y-4 max-w-3xl mx-auto">
            <div className="h-4 bg-muted rounded w-24"></div>
            <div className="h-8 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-32 mt-2"></div>
            <div className="h-64 bg-muted rounded-lg mt-8"></div>
          </div>
        </main>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-2">Skill Not Found</h1>
            <p className="text-muted-foreground">
              The skill you're looking for doesn't exist or has been removed.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <SkillDetail skill={skill} />
      </main>
    </div>
  );
};

export default SkillDetailPage;
