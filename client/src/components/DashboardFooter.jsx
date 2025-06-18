export default function DashboardFooter() {
  return (
    <footer className="bg-gray-100 text-center py-4 text-sm text-gray-500 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <a href="/help" className="hover:text-blue-600">Help</a>
          <a href="/settings" className="hover:text-blue-600">Settings</a>
          <a href="/terms" className="hover:text-blue-600">Terms</a>
          <a href="/privacy" className="hover:text-blue-600">Privacy</a>
        </div>
        <div className="mt-4">© {new Date().getFullYear()} Homyra. All rights reserved.</div>
      </div>
    </footer>
  );
}
