
import { useState, useEffect } from "react";
import { BarChart3, PieChart, TrendingUp, BarChart2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skill, SkillLevel } from "@/lib/types/skill";
import { skillApi } from "@/lib/api/skill-api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart as RechartsPie, Pie, Cell } from "recharts";

const DashboardPage = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
  const averageProgress = totalSkills
    ? Math.round(
        skills.reduce((sum, skill) => sum + skill.progress, 0) / totalSkills
      )
    : 0;

  // Count skills by level
  const skillsByLevel = {
    beginner: skills.filter((skill) => skill.level === "beginner").length,
    intermediate: skills.filter((skill) => skill.level === "intermediate").length,
    advanced: skills.filter((skill) => skill.level === "advanced").length,
  };

  // Data for level distribution chart
  const levelDistributionData = [
    { name: "Beginner", value: skillsByLevel.beginner },
    { name: "Intermediate", value: skillsByLevel.intermediate },
    { name: "Advanced", value: skillsByLevel.advanced },
  ];

  // Data for progress chart
  const progressData = skills
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 5)
    .map((skill) => ({
      name: skill.title,
      progress: skill.progress,
    }));

  // Chart colors
  const COLORS = ["#4F46E5", "#7C3AED", "#2DD4BF"];

  // If loading, show a loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded-lg"></div>
              ))}
            </div>
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
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle className="text-sm font-medium">
                  Total Skills
                </CardTitle>
                <CardDescription>All tracked skills</CardDescription>
              </div>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSkills}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle className="text-sm font-medium">
                  Average Progress
                </CardTitle>
                <CardDescription>Across all skills</CardDescription>
              </div>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageProgress}%</div>
              <Progress value={averageProgress} className="h-2 mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle className="text-sm font-medium">
                  Skills by Level
                </CardTitle>
                <CardDescription>Skill distribution</CardDescription>
              </div>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-1">
                <div className="flex flex-col items-center">
                  <span className="text-xs text-muted-foreground">Beginner</span>
                  <span className="font-bold">{skillsByLevel.beginner}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-muted-foreground">Intermediate</span>
                  <span className="font-bold">{skillsByLevel.intermediate}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-muted-foreground">Advanced</span>
                  <span className="font-bold">{skillsByLevel.advanced}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {totalSkills > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  Progress by Skill
                </CardTitle>
                <CardDescription>Top 5 skills by progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={progressData} layout="vertical">
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis
                        type="category"
                        dataKey="name"
                        tick={{ fontSize: 12 }}
                        width={100}
                      />
                      <Tooltip formatter={(value) => [`${value}%`, "Progress"]} />
                      <Bar
                        dataKey="progress"
                        fill="hsl(var(--primary))"
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  Level Distribution
                </CardTitle>
                <CardDescription>Skills by proficiency level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  {totalSkills > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPie width={400} height={300}>
                        <Pie
                          data={levelDistributionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {levelDistributionData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [value, "Skills"]}
                        />
                      </RechartsPie>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-muted-foreground">No data available</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card>
            <CardContent className="pt-6 flex flex-col items-center justify-center py-12">
              <BarChart2 className="h-12 w-12 text-muted-foreground mb-4" />
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

export default DashboardPage;
