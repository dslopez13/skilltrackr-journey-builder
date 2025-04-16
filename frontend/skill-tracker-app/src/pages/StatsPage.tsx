
import { useState, useEffect } from "react";
import { BarChart, LineChart, Calendar, Tag } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skill, SkillLevel } from "@/lib/types/skill";
import { skillApi } from "@/lib/api/skill-api";
import { BarChart as ReBarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const StatsPage = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "tags">("overview");

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    setIsLoading(true);
    try {
      const data = await skillApi.getSkills();
      setSkills(data);
    } catch (error) {
      console.error("Failed to fetch skills:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate statistics
  const totalSkills = skills.length;

  // Get all unique tags
  const allTags = skills.reduce((tags, skill) => {
    skill.tags.forEach((tag) => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
    return tags;
  }, [] as string[]);

  // Count skills for each tag
  const tagCounts = allTags.map((tag) => ({
    name: tag,
    count: skills.filter((skill) => skill.tags.includes(tag)).length,
  })).sort((a, b) => b.count - a.count);

  // Count skills by level
  const levelCounts = [
    { name: "Beginner", value: skills.filter((skill) => skill.level === "beginner").length },
    { name: "Intermediate", value: skills.filter((skill) => skill.level === "intermediate").length },
    { name: "Advanced", value: skills.filter((skill) => skill.level === "advanced").length },
  ];

  // Calculate average progress by level
  const averageProgressByLevel = [
    {
      name: "Beginner",
      progress: calculateAverageProgress("beginner"),
    },
    {
      name: "Intermediate",
      progress: calculateAverageProgress("intermediate"),
    },
    {
      name: "Advanced",
      progress: calculateAverageProgress("advanced"),
    },
  ];

  function calculateAverageProgress(level: SkillLevel) {
    const filteredSkills = skills.filter((skill) => skill.level === level);
    if (filteredSkills.length === 0) return 0;
    return Math.round(
      filteredSkills.reduce((sum, skill) => sum + skill.progress, 0) /
        filteredSkills.length
    );
  }

  // Count skills by completion status
  const completedSkills = skills.filter((skill) => skill.progress === 100).length;
  const inProgressSkills = skills.filter(
    (skill) => skill.progress > 0 && skill.progress < 100
  ).length;
  const notStartedSkills = skills.filter((skill) => skill.progress === 0).length;

  // If loading, show a loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-10 bg-muted rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-80 bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-4">Statistics</h1>
        <p className="text-muted-foreground mb-8">
          Insights and analytics about your skills.
        </p>

        <div className="flex space-x-4 mb-8">
          <Button
            variant={activeTab === "overview" ? "default" : "outline"}
            onClick={() => setActiveTab("overview")}
            className="gap-2"
          >
            <BarChart className="w-4 h-4" />
            Overview
          </Button>
          <Button
            variant={activeTab === "tags" ? "default" : "outline"}
            onClick={() => setActiveTab("tags")}
            className="gap-2"
          >
            <Tag className="w-4 h-4" />
            Tags
          </Button>
        </div>

        {totalSkills > 0 ? (
          activeTab === "overview" ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="h-[400px]">
                <CardHeader>
                  <CardTitle>Skill Level Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <ReBarChart data={levelCounts}>
                      <XAxis dataKey="name" />
                      <YAxis allowDecimals={false} />
                      <Tooltip formatter={(value) => [`${value} skills`, "Count"]} />
                      <Bar
                        dataKey="value"
                        fill="hsl(var(--primary))"
                        radius={[4, 4, 0, 0]}
                      />
                    </ReBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="h-[400px]">
                <CardHeader>
                  <CardTitle>Average Progress by Level</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <ReBarChart data={averageProgressByLevel}>
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip formatter={(value) => [`${value}%`, "Average Progress"]} />
                      <Bar
                        dataKey="progress"
                        fill="hsl(var(--accent))"
                        radius={[4, 4, 0, 0]}
                      />
                    </ReBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Progress Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
                      <span className="text-3xl font-bold text-blue-600">
                        {notStartedSkills}
                      </span>
                      <span className="text-sm text-blue-700 mt-1">Not Started</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg">
                      <span className="text-3xl font-bold text-purple-600">
                        {inProgressSkills}
                      </span>
                      <span className="text-sm text-purple-700 mt-1">In Progress</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
                      <span className="text-3xl font-bold text-green-600">
                        {completedSkills}
                      </span>
                      <span className="text-sm text-green-700 mt-1">Completed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tags Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground mb-4">
                      You have {allTags.length} unique tags across your skills
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag} ({skills.filter((skill) => skill.tags.includes(tag)).length})
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="h-[500px]">
                <CardHeader>
                  <CardTitle>Most Used Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <ReBarChart
                      data={tagCounts.slice(0, 10)}
                      layout="vertical"
                      margin={{ left: 100 }}
                    >
                      <XAxis type="number" />
                      <YAxis
                        type="category"
                        dataKey="name"
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip formatter={(value) => [`${value} skills`, "Count"]} />
                      <Bar
                        dataKey="count"
                        fill="hsl(var(--accent))"
                        radius={[0, 4, 4, 0]}
                      />
                    </ReBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          )
        ) : (
          <Card>
            <CardContent className="pt-6 flex flex-col items-center justify-center py-12">
              <LineChart className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Skills Yet</h3>
              <p className="text-muted-foreground text-center max-w-md">
                Add skills to your tracker to see statistics and visualizations here.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default StatsPage;
