
import { format } from "date-fns";
import { Pencil, ArrowLeft, Calendar, Tag } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skill } from "@/lib/types/skill";
import { Card, CardContent } from "@/components/ui/card";

interface SkillDetailProps {
  skill: Skill;
}

export function SkillDetail({ skill }: SkillDetailProps) {
  const levelBadgeMap = {
    beginner: "bg-blue-100 text-blue-800",
    intermediate: "bg-purple-100 text-purple-800",
    advanced: "bg-green-100 text-green-800",
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not set";
    try {
      return format(new Date(dateString), "MMMM d, yyyy");
    } catch (e) {
      return "Invalid date";
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 animate-fade-in">
      <div className="mb-6">
        <Button asChild variant="ghost" size="sm" className="mb-4">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Skills
          </Link>
        </Button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">{skill.title}</h1>
            <div className="flex items-center gap-2 mt-2">
              <span
                className={`text-sm px-2 py-0.5 rounded-full capitalize ${
                  levelBadgeMap[skill.level]
                }`}
              >
                {skill.level}
              </span>
            </div>
          </div>
          <Button asChild>
            <Link to={`/skills/${skill.id}/edit`}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Skill
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-muted-foreground whitespace-pre-line">
                {skill.description}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Progress</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Completion</span>
                    <span className="font-medium">{skill.progress}%</span>
                  </div>
                  <Progress value={skill.progress} className="h-2.5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-lg font-semibold mb-2 flex items-center">
                <Calendar className="mr-2 h-4 w-4" /> Dates
              </h2>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-muted-foreground">Started</span>
                  <p className="font-medium">{formatDate(skill.startDate)}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">End Date</span>
                  <p className="font-medium">{formatDate(skill.endDate)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-lg font-semibold mb-2 flex items-center">
                <Tag className="mr-2 h-4 w-4" /> Tags
              </h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {skill.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
