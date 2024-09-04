/* TODO: send an email to the user then resets the password inserted. */
"use client"

export default function Reset() {
    
  return (
      <>
  <div className="flex flex-col flex-1">
    <div className="relative flex flex-1 flex-col items-center justify-center pb-16 pt-12">
    <p className="mx-auto mb-16 h-6 w-auto">Polyhymnia </p>
    <div className="max-w-sm"> 
    <p className="mb-2 text-center text-sm font-semibold text-gray-900"> Reset your password </p>
    <p className="mb-10 text-center text-sm"> Enter your email and we'll send you a link to reset your password. </p>
    <div className="mb-6">
          <label htmlFor="email">
            Email address
          </label>
          <input
            type="email"
            id="email"
    className={`w-full px-2 py-1 text-sm mt-2 leading-tight text-black border {
            } rounded appearance-none focus:outline-none focus:shadow-outline`}
          />
          </div>
          <p className="mt-8 text-center">
          <button
          type="submit"
          className=
          "inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 mt-6 w-full"
          >
         Reset your password 
          </button>
          </p>
        </div>
        </div>
        <footer className="relative shrink-0"> 
        <div className="space-y-4 text-sm sm:flex sm:items-center sm:justify-center sm:space-x-4 sm:space-y-0">
        <p className="text-center sm:text-left">Don't have an account?</p>
        <span> "Register " <span aria-hidden="true">→</span>
        </span>
        </div>
        </footer>
      </div>
      </>
  );
}
