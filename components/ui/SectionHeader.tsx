import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  dark?: boolean;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  dark = false,
  align = "center",
  className,
}: SectionHeaderProps) {
  const isCenter = align === "center";
  return (
    <div className={cn(isCenter && "text-center", className)}>
      <p
        className={cn(
          "font-inter text-xs tracking-[0.35em] uppercase font-semibold mb-4",
          dark ? "text-gold" : "text-gold"
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "font-playfair leading-[1.1]",
          dark ? "text-white" : "text-text-primary",
          "text-[clamp(2rem,4vw,3rem)]"
        )}
      >
        {title}
      </h2>
      <div
        className={cn(
          "h-px w-14 bg-gradient-to-r from-gold/60 to-gold-light/60 mt-5 mb-5",
          isCenter && "mx-auto"
        )}
      />
      {subtitle && (
        <p
          className={cn(
            "font-inter leading-relaxed max-w-xl",
            dark ? "text-white/55" : "text-text-secondary",
            isCenter && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
