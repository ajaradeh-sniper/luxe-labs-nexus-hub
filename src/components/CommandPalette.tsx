import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Search, 
  Plus, 
  Users, 
  Upload, 
  TrendingUp, 
  Play,
  FileText,
  BarChart,
  UserPlus
} from "lucide-react";
import { ActionKey } from './ActionRouter';
import { hasCapability, Role } from '@/shared/roles';

interface CommandItem {
  id: ActionKey;
  label: string;
  description: string;
  icon: React.ComponentType<any>;
  category: string;
  capability?: string;
  keywords: string[];
}

const commands: CommandItem[] = [
  {
    id: 'new-project',
    label: 'Create New Project',
    description: 'Start a new project from scratch',
    icon: Plus,
    category: 'Projects',
    capability: 'project:create',
    keywords: ['create', 'new', 'project', 'add']
  },
  {
    id: 'invite-user',
    label: 'Invite Team Member',
    description: 'Send invitation to new team member',
    icon: UserPlus,
    category: 'Team',
    capability: 'user:invite',
    keywords: ['invite', 'user', 'team', 'member', 'add']
  },
  {
    id: 'promote-opportunity',
    label: 'Promote Opportunity',
    description: 'Convert opportunity to active project',
    icon: TrendingUp,
    category: 'Opportunities',
    capability: 'opportunity:promote',
    keywords: ['promote', 'opportunity', 'convert', 'project']
  },
  {
    id: 'start-project',
    label: 'Start Project',
    description: 'Begin project execution phase',
    icon: Play,
    category: 'Projects',
    capability: 'project:update',
    keywords: ['start', 'begin', 'execute', 'project']
  },
  {
    id: 'upload-doc',
    label: 'Upload Documents',
    description: 'Upload project documents and files',
    icon: Upload,
    category: 'Documents',
    capability: 'document:upload',
    keywords: ['upload', 'document', 'file', 'attach']
  },
  {
    id: 'reports',
    label: 'Generate Reports',
    description: 'Create financial and progress reports',
    icon: BarChart,
    category: 'Reports',
    keywords: ['report', 'generate', 'financial', 'analytics']
  }
];

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onAction: (actionKey: ActionKey) => void;
  userRole: Role;
}

export function CommandPalette({ open, onClose, onAction, userRole }: CommandPaletteProps) {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Filter commands based on user capabilities and search
  const filteredCommands = commands.filter(command => {
    const hasPermission = !command.capability || hasCapability(userRole, command.capability as any);
    if (!hasPermission) return false;

    if (!search) return true;

    const searchLower = search.toLowerCase();
    return (
      command.label.toLowerCase().includes(searchLower) ||
      command.description.toLowerCase().includes(searchLower) ||
      command.keywords.some(keyword => keyword.includes(searchLower))
    );
  });

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            handleAction(filteredCommands[selectedIndex].id);
          }
          break;
        case 'Escape':
          e.preventDefault();
          handleClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, selectedIndex, filteredCommands]);

  // Reset selection when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      setSearch('');
      setSelectedIndex(0);
    }
  }, [open]);

  const handleAction = (actionKey: ActionKey) => {
    onAction(actionKey);
    handleClose();
  };

  const handleClose = () => {
    setSearch('');
    setSelectedIndex(0);
    onClose();
  };

  const categories = Array.from(new Set(filteredCommands.map(cmd => cmd.category)));

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="max-w-2xl p-0">
        <DialogHeader className="p-4 pb-0">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Search className="h-4 w-4" />
            <span>Command Palette</span>
            <Badge variant="outline" className="ml-auto text-xs">
              ⌘K
            </Badge>
          </div>
        </DialogHeader>
        
        <div className="p-4 pt-2">
          <Input
            placeholder="Search commands..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4"
            autoFocus
          />

          {filteredCommands.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No commands found</p>
              <p className="text-sm">Try a different search term</p>
            </div>
          ) : (
            <ScrollArea className="max-h-96">
              <div className="space-y-4">
                {categories.map(category => {
                  const categoryCommands = filteredCommands.filter(cmd => cmd.category === category);
                  if (categoryCommands.length === 0) return null;

                  return (
                    <div key={category}>
                      <h4 className="text-xs font-medium text-muted-foreground mb-2 px-2">
                        {category}
                      </h4>
                      <div className="space-y-1">
                        {categoryCommands.map((command, index) => {
                          const globalIndex = filteredCommands.indexOf(command);
                          const isSelected = globalIndex === selectedIndex;
                          const Icon = command.icon;

                          return (
                            <Button
                              key={command.id}
                              variant={isSelected ? "secondary" : "ghost"}
                              className={`w-full justify-start h-auto p-3 ${
                                isSelected ? 'bg-accent' : 'hover:bg-accent/50'
                              }`}
                              onClick={() => handleAction(command.id)}
                            >
                              <div className="flex items-center gap-3 w-full">
                                <div className="p-1.5 bg-background rounded border">
                                  <Icon className="h-4 w-4" />
                                </div>
                                <div className="flex-grow text-left">
                                  <div className="font-medium text-sm">{command.label}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {command.description}
                                  </div>
                                </div>
                              </div>
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          )}
        </div>
        
        <div className="border-t p-3 text-xs text-muted-foreground bg-muted/30">
          <div className="flex items-center justify-between">
            <span>Use ↑↓ to navigate, Enter to select, Esc to close</span>
            <div className="flex gap-1">
              <kbd className="px-1 py-0.5 bg-background border rounded text-xs">↑</kbd>
              <kbd className="px-1 py-0.5 bg-background border rounded text-xs">↓</kbd>
              <kbd className="px-1 py-0.5 bg-background border rounded text-xs">↵</kbd>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function useCommandPalette(onAction: (actionKey: ActionKey) => void, userRole: Role) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return {
    isOpen,
    openPalette: () => setIsOpen(true),
    closePalette: () => setIsOpen(false),
    CommandPaletteComponent: () => (
      <CommandPalette
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onAction={onAction}
        userRole={userRole}
      />
    )
  };
}