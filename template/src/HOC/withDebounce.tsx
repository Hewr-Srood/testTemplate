import React, { ComponentType, useRef, useState } from 'react';

const timer = 300;
export function withDebounce<TProps extends { [key: string]: any }>(
  WrappedComponent: ComponentType<TProps>,
): React.FC<TProps> {
  const WithDebounce: React.FC<TProps> = props => {
    const buttonRef = useRef<number | null>(null);
    const [disabled, setDisabled] = useState(false);
    const debouncedHandlePress = (e: any) => {
      if (buttonRef.current) {
        clearTimeout(buttonRef.current);
      }
      if (!disabled) {
        setDisabled(true);
        props.onPress?.(e);
      }
      buttonRef.current = setTimeout(() => {
        setDisabled(false);
        buttonRef.current = null;
      }, timer);
    };
    return (
      <WrappedComponent {...(props as TProps)} onPress={debouncedHandlePress} disabled={disabled} />
    );
  };
  return WithDebounce;
}
