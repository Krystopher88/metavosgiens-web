import { ServicePage } from "@/components/service-page";
import { TOOLS_SERVICE } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: TOOLS_SERVICE.title,
  description: TOOLS_SERVICE.description,
  path: TOOLS_SERVICE.path,
});

export default function ToolsServicePage() {
  return <ServicePage content={TOOLS_SERVICE} />;
}
