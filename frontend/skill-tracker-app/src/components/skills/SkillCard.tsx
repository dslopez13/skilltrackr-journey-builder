
import { formatDistance } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skill } from "@/lib/types/skill";

interface SkillCardProps {
  skill: Skill;
  onDelete: (id: string) => void;
}

export function SkillCard({ skill, onDelete }: SkillCardProps) {
  const levelColorMap = {
    beginner: "bg-blue-100 text-blue-800",
    intermediate: "bg-purple-100 text-purple-800",
    advanced: "bg-green-100 text-green-800",
  };

  const getTimeAgo = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistance(date, new Date(), { addSuffix: true });
    } catch (e) {
      return "Invalid date";
    }
  };

  const startedAgo = getTimeAgo(skill.startDate);

  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-md animate-fade-in">
      <CardHeader className="flex justify-between items-start gap-4 pb-2">
        <div>
          <Link
            to={`/skills/${skill.id}`}
            className="text-lg font-semibold hover:text-primary transition-colors"
          >
            {skill.title}
          </Link>
          <div className="flex flex-wrap gap-1 mt-1">
            <span
              className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                levelColorMap[skill.level]
              }`}
            >
              {skill.level}
            </span>
            <span className="text-xs text-muted-foreground">Started {startedAgo}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {skill.description}
        </p>
        <div className="flex flex-wrap gap-1 mt-2">
          {skill.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1">
            <span>Progress</span>
            <span>{skill.progress}%</span>
          </div>
          <Progress value={skill.progress} className="h-2" />
        </div>
      </CardContent>
      <CardFooter className="pt-1 gap-2">
        <Button
          asChild
          size="sm"
          variant="outline"
          className="flex-1 text-xs h-8"
        >
          <Link to={`/skills/${skill.id}/edit`}>
            <Pencil className="h-3 w-3 mr-1" />
            Edit
          </Link>
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="flex-1 text-xs h-8"
          onClick={() => onDelete(skill.id)}
        >
          <Trash2 className="h-3 w-3 mr-1" />
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
}
