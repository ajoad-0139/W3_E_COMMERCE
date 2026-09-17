interface DescriptionFeature {
  title: string;
  description: string;
}

interface DescriptionSectionProps {
  eyebrow?: string;
  heading: string;
  body: string;
  features?: DescriptionFeature[];
}

const DEFAULT_FEATURES: DescriptionFeature[] = [
  {
    title: "Free shipping & returns",
    description: "Free standard shipping on every order, plus 30 days to return it if it's not the right fit.",
  },
  {
    title: "Secure checkout",
    description: "Your payment and personal details are encrypted end-to-end, every time you check out.",
  },
  {
    title: "Quality guaranteed",
    description: "Each item is checked before it ships, backed by a 1-year warranty against defects.",
  },
];

export default function DescriptionSection({
  eyebrow = "Why shop with us",
  heading = "Quality products, delivered without the hassle",
  body = "We source from trusted manufacturers and put every item through quality checks before it reaches you. From browsing to checkout to delivery, we've streamlined the experience so you can shop with confidence and get exactly what you ordered, on time.",
  features = DEFAULT_FEATURES,
}: Partial<DescriptionSectionProps>) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
          {eyebrow}
        </span>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {heading}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base lg:max-w-none">
          {body}
        </p>
      </div>

      {/* {features.length > 0 && (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:shadow-md"
            >
              <h3 className="text-sm font-semibold text-card-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      )} */}
    </section>
  );
}