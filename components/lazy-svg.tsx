import dynamic from 'next/dynamic';
import { ComponentProps } from "react";


interface LazySvgProps extends ComponentProps<"svg"> {
  type: string;
  letter: string;
}

export function LazySvg({ type, letter, ...props }: LazySvgProps) {
  const Svg = dynamic(
    () => import(`@/assets/letters/${type}/${letter}.svg`),
    {
      loading: () => <div></div>,
    }
  );
  return <Svg {...props} />;
}
