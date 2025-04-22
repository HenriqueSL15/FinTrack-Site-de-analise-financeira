interface AboutCardProps {
  key?: React.Key;
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

function AboutCard({
  key,
  title,
  description,
  icon,
  className,
}: AboutCardProps) {
  return (
    <div
      key={key}
      className={`w-1/3 flex flex-col gap-3 p-5 rounded-lg border-2 border-gray-200 ${className}`}
    >
      {icon}
      <h1 className="text-xl font-bold">{title}</h1>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}

export default AboutCard;
