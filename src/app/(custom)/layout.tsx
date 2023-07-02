
export default function CustomLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen mx-auto max-w-2xl px-4 pt-8 pb-16">
      <div className="flex-grow">
        <main className="my-0 py-16">{children}</main>
        
      </div>
    </div>
  );
}
/*under main new footer for a new component so you don't reuse when you dont want to */
