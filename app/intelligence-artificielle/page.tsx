import { ServicePage } from "@/components/service-page";
import { AI_SERVICE } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: AI_SERVICE.title,
  description: AI_SERVICE.description,
  path: AI_SERVICE.path,
});

export default function AiServicePage() {
  return <ServicePage content={AI_SERVICE} />;
}
