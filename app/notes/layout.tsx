import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Header />

      {children}

      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <Footer />
      </div>
    </div>
  );
}
