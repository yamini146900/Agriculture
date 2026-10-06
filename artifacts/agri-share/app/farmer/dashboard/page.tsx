import { DashboardFrame } from "../../../components/dashboard-frame";
import { requireRole } from "../../../lib/auth/role-guard";

export default async function FarmerDashboardPage() {
  await requireRole("FARMER");
  return <DashboardFrame role="FARMER" />;
}
