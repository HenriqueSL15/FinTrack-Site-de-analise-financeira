import {
  LucideChartColumnIncreasing,
  LucideChartPie,
  LucideLock,
} from "lucide-react";

import AboutCard from "./AboutCard.tsx";
import TestimonialCard from "./TestimonialCard.tsx";
import {
  CardContent,
  IconContent,
  InfoBoxProps,
  SectionContent,
} from "@/types/infoBox.ts";

function InfoBox({ variant }: InfoBoxProps) {
  const sectionTitles: SectionContent = {
    about: "Recursos Poderosos",
    testimonial: "O Que Nossos Usuários Dizem",
  };

  const sectionDescriptions: SectionContent = {
    about:
      "Nossa plataforma oferece tudo que você precisa para gerenciar suas finanças com eficiência.",
    testimonial:
      "Milhares de pessoas já transformaram sua relação com dinheiro usando nossa plataforma.",
  };

  const cardTitles: CardContent = {
    about: ["Acompanhe Despesas", "Defina Orçamentos", "Segurança Garantida"],
    testimonial: [
      "Ana Silva / Empreendedora",
      "Carlos Mendes / Professor",
      "Juliana Costa / Desenvolvedora",
    ],
  };

  const cardDescriptions: CardContent = {
    about: [
      "Registre e categorize todas as suas transações em um só lugar para saber exatamente para onde vai seu dinheiro.",
      "Estabeleça limites de gastos para diferentes categorias e receba alertas quando estiver próximo de atingi-los.",
      "Seus dados financeiros são protegidos com criptografia de ponta a ponta e as melhores práticas de segurança.",
    ],

    testimonial: [
      "Graças ao FinTrack, finalmente consegui organizar minhas finanças pessoais e da minha pequena empresa. A interface é simples e muito intuitiva!",
      "Eu estava com dificuldades para economizar, mas os recursos de orçamento do FinTrack me ajudaram a identificar onde podia cortar gastos.",
      "A visualização de dados do FinTrack é impressionante. Consigo ver claramente meus padrões de gastos e tomar decisões melhores.",
    ],
  };

  const cardIcons: IconContent = {
    about: [
      <LucideChartColumnIncreasing className="w-7 h-7" />,
      <LucideChartPie className="w-7 h-7" />,
      <LucideLock className="w-7 h-7" />,
    ],
  };

  return (
    <div
      className={`${
        variant === "about"
          ? "bg-gray-100 dark:bg-[#1a1a1a]"
          : "bg-white dark:bg-black"
      } h-6/10 px-26 w-full flex flex-col items-center gap-2`}
    >
      <div className="w-full h-1/2 flex flex-col justify-center items-center gap-5">
        <h1 className="text-3xl font-bold">{sectionTitles[variant]}</h1>
        <h2 className="max-w-4/10 break-words text-center text-gray-500 dark:text-neutral-300">
          {sectionDescriptions[variant]}
        </h2>
      </div>
      <div className="w-full flex gap-10 pb-10">
        {cardTitles[variant].map((title, index) => {
          return variant === "about" ? (
            <AboutCard
              key={index}
              title={title}
              description={cardDescriptions[variant][index]}
              icon={cardIcons[variant] && cardIcons[variant][index]}
              className={"bg-white"}
            />
          ) : (
            <TestimonialCard
              key={index}
              title={title}
              description={cardDescriptions[variant][index]}
              className={"bg-gray-100"}
            />
          );
        })}
      </div>
    </div>
  );
}

export default InfoBox;
