import { ArrowUpRight, Leaf, User } from 'lucide-react'

export default function FreshHero({ onExplore }: { onExplore: () => void }) {
  return <section className="fresh-hero" aria-label="Fresh produce promotion">
    <img className="fresh-hero-photo" src={`${import.meta.env.BASE_URL}images/fresh-produce.png`} alt="Crisp green vegetables, pears and limes in natural sunlight" />
    <div className="fresh-hero-wash" />
    <div className="fresh-brand"><Leaf size={23} strokeWidth={1.8}/><span>migros<span>online</span></span></div>
    <button type="button" aria-label="Profile" className="fresh-profile"><User size={20}/></button>
    <div className="fresh-hero-title"><span className="fresh-eyebrow">A FRESH START, EVERY DAY</span><h1>Good things.<br/><em>Freshly picked.</em></h1></div>
    <div className="fresh-offer"><span>THIS WEEK’S FRESH PICKS</span><strong>Up to 20% off</strong></div>
    <button type="button" className="fresh-explore" aria-label="See promotions" onClick={onExplore}><ArrowUpRight size={24}/></button>
  </section>
}
