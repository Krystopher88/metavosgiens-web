import { ArrowIcon } from "@/components/arrow-icon";

type ArrowLinkProps = {
  href: string;
  children: string;
};

export function ArrowLink({ href, children }: ArrowLinkProps) {
  return (
    <a
      href={href}
      className="flex w-fit items-center gap-1.5 text-sm underline decoration-[#9aa59e] underline-offset-4 transition-colors motion-reduce:transition-none hover:text-green"
    >
      {children}
      <ArrowIcon size={14} />
    </a>
  );
}
