import { Wallet } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

interface titlesContent {
  title: string;
  content: string[];
}

const titlesContent: titlesContent[] = [
  {
    title: "PRODUTO",
    content: ["Recursos", "Preços", "FAQ"],
  },
  {
    title: "EMPRESA",
    content: ["Sobre", "Blog", "Contato"],
  },
  {
    title: "LEGAL",
    content: ["Termos", "Privacidade", "Cookis"],
  },
];

const icons: React.ReactNode[] = [
  <FaFacebook className="" />,
  <FaTwitter className="" />,
  <FaInstagram className="" />,
];

function Footer() {
  return (
    <div className="px-26 py-8 w-full h-4/12 bg-white flex justify-between dark:bg-[#1a1a1a]">
      <div className="w-1/4">
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <Wallet className="w-6 h-6" />
              <h1 className="text-xl font-bold">FinTrack</h1>
            </div>
            <p className="text-sm max-w-9/10 text-zinc-500">
              Sua solução completa para gestão financeira pessoal e planejamento
              de orçamento.
            </p>
          </div>
          <p className="text-sm max-w-9/10 text-zinc-500">
            © 2025 FinTrack. Todos os direitos reservados.
          </p>
        </div>
      </div>
      <div className="w-1/4 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start">
          {titlesContent.map((item, index) => {
            return (
              <div className="flex flex-col gap-4" key={index}>
                <h1 className="text-sm font-semibold">{item.title}</h1>
                <div className="flex flex-col gap-2">
                  {item.content.map((content, index) => {
                    return (
                      <p key={index} className="text-neutral-500">
                        {content}
                      </p>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex gap-2 w-full justify-end">
          {icons.map((icon, index) => (
            <div key={index} className="w-8 h-8 p-1 text-neutral-500">
              {icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Footer;
