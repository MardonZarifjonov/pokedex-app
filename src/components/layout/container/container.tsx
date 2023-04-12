import { PropsWithChildren } from 'react';
import clx from 'classnames';

type ContainerProps = PropsWithChildren<{ className?: string }>;

export function Container({ children, className }: ContainerProps) {
  const classNames = clx(
    'min-h-screen px-1 sm:px-2 md:px-4 xl:px-8 flex flex-col  pt-5 gap-3',
    className
  );

  return (
    <div className={classNames}>
      <h1 className="text-5xl self-center">Pokodex</h1>
      {children}
    </div>
  );
}
