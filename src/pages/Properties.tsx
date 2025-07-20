import { DashboardLayout } from "@/components/DashboardLayout"
import { PropertyManagement } from "@/components/properties/PropertyManagement"

const Properties = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <PropertyManagement />
      </div>
    </DashboardLayout>
  )
}

export default Properties