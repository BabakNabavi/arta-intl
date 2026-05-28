import Link from "next/link";

// 404 rendered inside the [locale] layout. Kept locale-neutral (bilingual
// label) since notFound() boundaries do not receive route params.
export default function NotFound() {
  return (
    <section className="container-wide flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <span className="font-display bg-gradient-to-br from-navy-900 to-turquoise-600 bg-clip-text text-7xl font-bold text-transparent sm:text-8xl">
        404
      </span>
      <h1 className="font-display mt-6 text-2xl font-semibold text-navy-900 sm:text-3xl">
        Page not found · صفحه پیدا نشد
      </h1>
      <p className="mt-3 max-w-md text-navy-500">
        The page you are looking for may have moved or no longer exists.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/en"
          className="rounded-full bg-turquoise-500 px-6 py-3 text-sm font-semibold text-white shadow-glow transition-colors hover:bg-turquoise-600"
        >
          Back to home
        </Link>
        <Link
          href="/fa"
          className="rounded-full bg-navy-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
        >
          بازگشت به خانه
        </Link>
      </div>
    </section>
  );
}
