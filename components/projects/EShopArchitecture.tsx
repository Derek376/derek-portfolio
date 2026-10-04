function Arrow({ className = "h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 32" className={`mx-auto w-5 ${className}`} aria-hidden="true">
      <path d="M10 0v29m-4-5 4 5 4-5" fill="none" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

const integrations = [
  { name: "PostgreSQL", platform: "Neon", purpose: "Application data" },
  { name: "Stripe", platform: "Payment API", purpose: "Payment verification" },
  { name: "Cloudinary", platform: "Media storage", purpose: "Product images" },
];

export default function EShopArchitecture() {
  return (
    <figure aria-label="E-Shop system architecture" className="mt-6">
      <div className="border-y border-neutral-200 py-8 text-center text-neutral-400 sm:py-10">
        <div className="mx-auto max-w-72 border border-neutral-200 px-4 py-4">
          <p className="text-xs leading-5 text-neutral-500">Frontend · Vercel</p>
          <p className="mt-1 text-base font-medium leading-6 text-neutral-900">React storefront</p>
        </div>

        <div className="relative py-2">
          <Arrow className="h-12" />
          <span className="absolute left-[calc(50%+1rem)] top-5 text-xs leading-5 text-neutral-500">HTTPS · REST</span>
        </div>

        <div className="mx-auto max-w-72 border border-[var(--accent-border)] bg-[var(--accent-soft)] px-4 py-4">
          <p className="text-xs leading-5 text-neutral-500">Backend · Docker / Northflank</p>
          <p className="accent-text mt-1 text-base font-medium leading-6">Spring Boot API</p>
          <p className="mt-2 text-xs leading-5 text-neutral-600">Controllers · Services · JPA</p>
        </div>

        <div className="mx-auto h-8 w-px bg-neutral-300" aria-hidden="true" />
        <div className="mx-auto w-2/3 border-t border-neutral-300" aria-hidden="true" />
        <div className="grid grid-cols-3">
          {integrations.map((integration) => (
            <div key={integration.name} className="min-w-0">
              <Arrow />
              <div className="mx-1 border border-neutral-200 px-2 py-3 sm:mx-3 sm:px-4 sm:py-4">
                <p className="text-sm font-medium leading-6 text-neutral-900 sm:text-base">{integration.name}</p>
                <p className="mt-1 text-xs leading-5 text-neutral-500">{integration.platform}</p>
              </div>
              <p className="mt-2 text-xs leading-5 text-neutral-500">{integration.purpose}</p>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-4 text-sm leading-6 text-neutral-500">
        The API manages application data, verifies payments with Stripe, and stores product images in Cloudinary.
        The storefront also uses Stripe.js to confirm payments.
      </figcaption>
    </figure>
  );
}
