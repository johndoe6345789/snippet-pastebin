'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { navigationItems } from './navigation-items';
import { useNavigation } from './useNavigation';

export function NavigationSidebar() {
  const { menuOpen, setMenuOpen } = useNavigation();
  const pathname = usePathname();

  return (
    <motion.aside
      initial={false}
      animate={{ x: menuOpen ? 0 : -320 }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed left-0 top-0 h-screen w-80 bg-card border-r border-border z-30 flex flex-col"
    >
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-semibold">Navigation</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <li key={item.path}>
                  <Link href={item.path}>
                    <Button
                      variant={isActive ? 'secondary' : 'ghost'}
                      className={cn(
                        'w-full justify-start gap-3',
                        isActive && 'bg-accent text-accent-foreground'
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </Button>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            CodeSnippet Library
          </p>
        </div>
      </div>
    </motion.aside>
  );
}
