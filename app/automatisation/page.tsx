import { ServicePage } from "@/components/service-page";
import { AUTOMATION_SERVICE } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: AUTOMATION_SERVICE.title,
  description: AUTOMATION_SERVICE.description,
  path: AUTOMATION_SERVICE.path,
});

export default function AutomationServicePage() {
  return <ServicePage content={AUTOMATION_SERVICE} />;
}
