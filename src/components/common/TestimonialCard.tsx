interface AboutCardProps {
  key?: React.Key;
  title: string;
  description: string;
  className?: string;
}

function AboutCard({ key, title, description, className }: AboutCardProps) {
  return (
    <div
      key={key}
      className={`w-1/3 flex flex-col gap-3 p-5 rounded-lg border-2 border-gray-200 ${className}`}
    >
      <div className="flex gap-2">
        <h1 className="text-xl font-bold w-13 h-13 bg-gray-300 rounded-full flex items-center justify-center">
          {title[0]}
        </h1>
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-bold">{title.split(" / ")[0]}</h1>
          <h3 className="font-text text-base text-gray-600">
            {title.split(" / ")[1]}
          </h3>
        </div>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default AboutCard;
