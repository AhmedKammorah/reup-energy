import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { Strip } from '@/components/Strip'
import { HowItWorks } from '@/components/HowItWorks'
import { Numbers } from '@/components/Numbers'
import { PilotMarinas } from '@/components/PilotMarinas'
import { Audiences } from '@/components/Audiences'
import { WhyReUP } from '@/components/WhyReUP'
import { Testimonial } from '@/components/Testimonial'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { Backdrop } from '@/components/Backdrop'

export const dynamic = 'force-dynamic'

export default async function LandingPage() {
  const payload = await getPayload({ config: configPromise })
  const data = await payload.findGlobal({ slug: 'landing-page', depth: 1 })

  return (
    <>
      <Backdrop />
      <Nav navLinks={data?.navLinks ?? []} />
      <main>
        <Hero hero={data?.hero} />
        <Strip items={data?.strip ?? []} />
        <Numbers numbers={data?.numbers} />
        <HowItWorks how={data?.how} />
        <PilotMarinas pilotMarinas={data?.pilotMarinas} />
        <Audiences audiences={data?.audiences} />
        <WhyReUP why={data?.why} />
        <Testimonial testimonial={data?.testimonial} />
        <Contact contact={data?.contact} />
      </main>
      <Footer footer={data?.footer} />
    </>
  )
}
