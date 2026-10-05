import { ServicePage } from "@/components/service-page";
import { WEBSITE_SERVICE } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: WEBSITE_SERVICE.title,
  description: WEBSITE_SERVICE.description,
  path: WEBSITE_SERVICE.path,
});

export default function WebsiteServicePage() {
  return <ServicePage content={WEBSITE_SERVICE} />;
}
