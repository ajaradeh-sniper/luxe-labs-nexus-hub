import { DashboardLayout } from "@/components/DashboardLayout"
import { ClientPaymentPortal } from "@/components/client/ClientPaymentPortal"

export default function Payments() {
  return (
    <DashboardLayout>
      <ClientPaymentPortal />
    </DashboardLayout>
  )
}