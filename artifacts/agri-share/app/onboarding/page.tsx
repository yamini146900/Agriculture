import { SiteNav } from "../../components/site-nav";
import { OnboardingForm } from "../../components/onboarding-form";

export default function OnboardingPage() {
  return <main className="min-h-[100dvh]"><SiteNav /><div className="px-5 py-9 sm:py-14"><OnboardingForm /></div></main>;
}
