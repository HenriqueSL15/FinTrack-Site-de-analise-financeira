import TestimonialCardProps from "@/types/testimonialCard";

function AboutCard({
  key,
  title,
  description,
  className,
}: TestimonialCardProps) {
  return (
    <div
      key={key}
      className={`w-1/3 flex flex-col gap-3 p-5 rounded-lg border-2 border-gray-200 ${className} dark:border-[#2e2e2e] dark:bg-[#1a1a1a]`}
    >
      <div className="flex gap-2">
        <h1 className="text-xl font-bold w-13 h-13 bg-gray-300 rounded-full flex items-center justify-center dark:bg-[#1f1f1f] ">
          {title[0]}
        </h1>
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-bold">{title.split(" / ")[0]}</h1>
          <h3 className="font-text text-base text-gray-600 dark:text-gray-400">
            {title.split(" / ")[1]}
          </h3>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}

export default AboutCard;
