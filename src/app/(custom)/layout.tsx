export default function CustomLayout({ children }: { children: React.ReactNode }) {
  return (
  <div className="flex flex-col flex-1 bg-rwood">
        <main className="relative flex flex-1 flex-col overflow-hidden px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
/*under main new footer for a new component so you don't reuse when you dont want to */
