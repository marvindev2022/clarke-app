import { useSupplier } from "../Context/supplier.context";
import { AnimationControls, TargetAndTransition, VariantLabels, motion } from "framer-motion";
interface IControlProps {
    controls: boolean | AnimationControls | TargetAndTransition | VariantLabels | undefined;
}

export default function AnimationContainer({controls}:IControlProps ){
const {submited} = useSupplier();

    return(
        <motion.div
        className="mt-16"
        animate={controls}
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 1 }}
      >
        {!submited && (
          <div className="flex flex-col w-[40rem] justify-start mt-8 gap-2 text-justify">
            <span className="text-white">
              #o<strong>futuro</strong>é<strong>livre</strong>
            </span>
            <span className="text-7xl text-white pb-2">
              Economize até 40% na conta de luz da sua empresa sem precisar
              investir
            </span>
            <span className="text-2xl text-white pb-2">
              Se o seu negócio gasta mais de R$ 10 mil por mês com energia,
              a Clarke pode te ajudar a economizar com o Mercado Livre de
              Energia.
            </span>
          </div>
        )}
      </motion.div>
    )
}