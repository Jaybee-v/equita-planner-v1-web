import Image from "next/image";

type LogoProps = {
  size: number;
  name?: boolean;
};

export const Logo = ({ size, name }: LogoProps) => {
  return (
    <article className="flex items-center gap-2">
      <Image
        src="/images/logo-ep-2.png"
        alt="Logo Equita-Planner"
        width={size}
        height={size}
        className="bg-primary rounded-full"
      />
      {name && <p>Equita-Planner</p>}
    </article>
  );
};
