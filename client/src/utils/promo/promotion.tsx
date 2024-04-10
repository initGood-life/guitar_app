import type { PromoTypes } from '@/types/utils.types';

import { Utils } from '..';

const { WavesButton } = Utils;

const Promotion: React.FC<PromoTypes> = ({ title, description, button }): JSX.Element => (
  <div className="relative flex h-96 w-full flex-col items-center justify-center p-6 text-center">
    <div className="absolute inset-0 bg-promo brightness-75" />
    <div className="relative h-fit rounded-xl bg-white/20 p-6 shadow-2xl backdrop-blur-sm neon-glow">
      <h2 className="pointer-events-none mb-4 text-balance font-oswald text-6xl font-bold uppercase text-yellow-600">
        {title}
      </h2>
      <p className="pointer-events-none mb-4 text-pretty text-4xl font-normal text-gray-300">
        {description}
      </p>
      <div className="mt-20">
        <WavesButton
          isLinked
          label={button.label}
          link={button.link}
          styled="bg-white cursor-pointer px-4 py-2 font-rubik uppercase tracking-wider text-2xl font-semibold text-black border-2 border-black rounded-md shadow-lg hover:bg-gray-900 hover:text-white hover:border-white transition-all duration-500 ease-in-out"
        />
      </div>
    </div>
  </div>
);

export default Promotion;
