import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = total > 0 ? ((current + 1) / total) * 100 : 0;

  return (
    <div className="w-full" data-testid="container-progress-bar">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium" data-testid="text-progress-count">
          {current + 1} / {total}
        </span>
        <span className="text-sm text-muted-foreground">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="h-1 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-chart-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
