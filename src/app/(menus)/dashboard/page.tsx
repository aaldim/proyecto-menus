export default function DashboardPage() {
    return (
      <div className="w-full h-screen">
        <iframe
          className="w-full h-full"
          src="https://lookerstudio.google.com/embed/reporting/fbd1e345-ff22-4f72-b6bd-af2269d05b31/page/1VpLE"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen
          sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        ></iframe>
      </div>
    );
  }