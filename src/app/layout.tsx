import "./globals.css";
export const metadata = { title: "Tastely – Recipe Explorer", description: "Next.js + Tailwind" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body className="min-h-screen"><div className="max-w-6xl mx-auto px-4">
    <header className="py-4 border-b flex justify-between"><strong>Tastely</strong></header>
    <main className="py-8">{children}</main>
    <footer className="py-10 text-center opacity-70">© {new Date().getFullYear()} Tastely</footer>
  </div></body></html>);
}
