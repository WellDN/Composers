export default function CustomLayout({ children }: { children: React.ReactNode }) {
  return (
          <div className="bg-rwood">
          <div className="flex flex-col min-h-screen px-4 pt-4 pb-16">
          <div className="flex-grow">
        <main className="my-0 py-16">{children}</main>

     </div>
     </div>
    </div>
  );
}
/*under main new footer for a new component so you don't reuse when you dont want to */
