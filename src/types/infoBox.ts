export type InfoBoxVariant = "about" | "testimonial";

export interface InfoBoxProps {
  variant: InfoBoxVariant;
}

export interface SectionContent {
  about: string;
  testimonial: string;
}

export interface CardContent {
  about: string[];
  testimonial: string[];
}

export interface IconContent {
  about: React.ReactNode[];
  [key: string]: React.ReactNode[] | undefined;
}
