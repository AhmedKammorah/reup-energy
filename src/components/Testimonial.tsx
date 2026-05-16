import { ScrollReveal } from './ScrollReveal'

type TestimonialProps = {
  testimonial:
    | {
        enabled?: boolean | null
        quote?: string | null
        author?: string | null
        role?: string | null
      }
    | null
    | undefined
}

export const Testimonial = ({ testimonial }: TestimonialProps) => {
  if (!testimonial || testimonial.enabled === false || !testimonial.quote) return null

  return (
    <section className="relative py-28 md:py-36">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <ScrollReveal>
          <figure className="relative">
            {/* Giant quote glyph */}
            <span
              aria-hidden
              className="absolute -left-4 -top-12 select-none font-display text-[12rem] leading-none text-reup-spark/15 md:-left-8 md:-top-20 md:text-[18rem]"
            >
              "
            </span>

            <blockquote className="relative z-10">
              <p className="heading-display text-3xl leading-[1.2] text-reup-mist md:text-5xl md:leading-[1.15]">
                {testimonial.quote}
              </p>
            </blockquote>

            {(testimonial.author || testimonial.role) && (
              <figcaption className="mt-10 flex items-center gap-4 border-t border-reup-spark/15 pt-6">
                <div className="h-px w-12 bg-reup-spark" />
                <div>
                  {testimonial.author && (
                    <p className="font-display text-base font-bold text-white md:text-lg">
                      {testimonial.author}
                    </p>
                  )}
                  {testimonial.role && (
                    <p className="text-sm text-reup-mist/55">{testimonial.role}</p>
                  )}
                </div>
              </figcaption>
            )}
          </figure>
        </ScrollReveal>
      </div>
    </section>
  )
}
