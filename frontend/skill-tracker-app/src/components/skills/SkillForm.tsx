
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  CalendarIcon, 
  Save,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Skill, SkillLevel, CreateSkillDTO } from "@/lib/types/skill";
import { format } from "date-fns";

interface SkillFormProps {
  skill?: Skill;
  onSubmit: (skillData: CreateSkillDTO) => Promise<void>;
}

export function SkillForm({ skill, onSubmit }: SkillFormProps) {
  const navigate = useNavigate();
  const isEditing = !!skill;

  const [formData, setFormData] = useState<CreateSkillDTO>({
    title: "",
    description: "",
    tags: [],
    level: "beginner",
    startDate: new Date().toISOString().split("T")[0],
    progress: 0,
  });

  const [tagsInput, setTagsInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (skill) {
      setFormData({
        title: skill.title,
        description: skill.description,
        tags: [...skill.tags],
        level: skill.level,
        startDate: skill.startDate,
        endDate: skill.endDate,
        progress: skill.progress,
      });
      setTagsInput(skill.tags.join(", "));
    }
  }, [skill]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsInput(e.target.value);
    const tags = e.target.value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");
    setFormData((prev) => ({ ...prev, tags }));
  };

  const handleLevelChange = (value: string) => {
    setFormData((prev) => ({ ...prev, level: value as SkillLevel }));
  };

  const handleProgressChange = (value: number[]) => {
    setFormData((prev) => ({ ...prev, progress: value[0] }));
  };

  const handleDateChange = (field: "startDate" | "endDate", date: Date | undefined) => {
    if (date) {
      setFormData((prev) => ({
        ...prev,
        [field]: date.toISOString().split("T")[0],
      }));
    } else if (field === "endDate") {
      setFormData((prev) => {
        const { endDate, ...rest } = prev;
        return rest;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (formData.tags.length === 0) {
      newErrors.tags = "At least one tag is required";
    }

    if (!formData.level) {
      newErrors.level = "Skill level is required";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
      navigate("/");
    } catch (error) {
      console.error("Failed to save skill:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Skill Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="e.g., React Development"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? "border-red-500" : ""}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Describe what you're learning..."
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className={errors.description ? "border-red-500" : ""}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Tags (comma separated)</Label>
          <Input
            id="tags"
            name="tags"
            placeholder="e.g., frontend, javascript, web"
            value={tagsInput}
            onChange={handleTagsChange}
            className={errors.tags ? "border-red-500" : ""}
          />
          {errors.tags && <p className="text-red-500 text-sm">{errors.tags}</p>}
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-secondary px-2 py-1 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="level">Skill Level</Label>
          <Select
            value={formData.level}
            onValueChange={handleLevelChange}
          >
            <SelectTrigger
              id="level"
              className={errors.level ? "border-red-500" : ""}
            >
              <SelectValue placeholder="Select Skill Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          {errors.level && <p className="text-red-500 text-sm">{errors.level}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.startDate && "text-muted-foreground",
                    errors.startDate && "border-red-500"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.startDate ? (
                    format(new Date(formData.startDate), "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.startDate ? new Date(formData.startDate) : undefined}
                  onSelect={(date) => handleDateChange("startDate", date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.startDate && (
              <p className="text-red-500 text-sm">{errors.startDate}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>End Date</Label>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                className="h-5 px-2 text-xs"
                onClick={() => handleDateChange("endDate", undefined)}
              >
                <X className="mr-1 h-3 w-3" />
                Clear
              </Button>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.endDate ? (
                    format(new Date(formData.endDate), "PPP")
                  ) : (
                    <span className="text-muted-foreground">Optional</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.endDate ? new Date(formData.endDate) : undefined}
                  onSelect={(date) => handleDateChange("endDate", date)}
                  initialFocus
                  disabled={(date) => 
                    formData.startDate 
                      ? date < new Date(formData.startDate) 
                      : false
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Progress: {formData.progress}%</Label>
            </div>
            <Slider
              defaultValue={[formData.progress]}
              max={100}
              step={1}
              onValueChange={handleProgressChange}
              className="py-4"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button 
          type="button" 
          variant="outline"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <Button type="submit">
          <Save className="mr-2 h-4 w-4" />
          {isEditing ? "Update Skill" : "Save Skill"}
        </Button>
      </div>
    </form>
  );
}
