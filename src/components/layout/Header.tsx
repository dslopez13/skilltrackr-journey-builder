
import { useState } from "react";
import { 
  LayoutGrid, 
  ListChecks, 
  Plus, 
  BarChart, 
  Search 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

interface HeaderProps {
  onSearch?: (term: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <ListChecks className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">SkillTrackr</span>
        </Link>

        <div className="flex items-center ml-auto gap-2">
          <div className="relative w-full max-w-[260px] md:max-w-sm lg:max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search skills..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div className="flex gap-2 ml-4">
            <Button asChild variant="ghost" size="icon" className="hidden md:flex">
              <Link to="/dashboard">
                <LayoutGrid className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon" className="hidden md:flex">
              <Link to="/stats">
                <BarChart className="h-5 w-5" />
                <span className="sr-only">Statistics</span>
              </Link>
            </Button>
            <Button asChild variant="default" size="sm" className="gap-1">
              <Link to="/skills/new">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Add Skill</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
