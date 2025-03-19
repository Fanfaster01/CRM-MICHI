import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function DashboardLoading() {
  return (
    <div className="flex justify-center items-center h-full py-12">
      <LoadingSpinner size="lg" text="Cargando dashboard..." />
    </div>
  );
}