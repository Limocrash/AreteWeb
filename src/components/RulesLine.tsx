/**
 * Site-wide mantra line: "DON'T CHANGE LEADERS. CHANGE THE RULES."
 * Rendered at the bottom of main screens in medium/muted style (signature, not headline).
 */

interface RulesLineProps {
  darkMode: boolean;
  className?: string;
}

export function RulesLine({ darkMode, className = '' }: RulesLineProps) {
  return (
    <p
      className={`text-lg md:text-xl text-center tracking-wide ${className}`}
      style={{
        fontFamily: '"Crimson Text", "EB Garamond", "Georgia", "Times New Roman", serif',
        fontVariant: 'small-caps',
        letterSpacing: '0.05em',
        color: darkMode ? 'rgba(251, 191, 36, 0.85)' : 'rgb(87, 83, 78)',
      }}
    >
      DON'T CHANGE LEADERS. CHANGE THE <span className="underline">RULES</span>.
    </p>
  );
}
