
import { Header } from "@/components/layout/Header";
import { SkillForm } from "@/components/skills/SkillForm";
import { CreateSkillDTO } from "@/lib/types/skill";
import { skillApi } from "@/lib/api/skill-api";

const SkillCreatePage = () => {
  const handleCreateSkill = async (skillData: CreateSkillDTO) => {
    await skillApi.createSkill(skillData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Add New Skill</h1>
          <p className="text-muted-foreground">
            Track a new skill you're learning or want to improve.
          </p>
        </div>
        <SkillForm onSubmit={handleCreateSkill} />
      </main>
    </div>
  );
};

export default SkillCreatePage;
