import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, LinearGradient, Stop, ClipPath } from 'react-native-svg';

export const FacebookIcon = (props: SvgProps) => (
  <Svg width={'100%'} height={'100%'} viewBox='0 0 25 25' fill='none' {...props}>
    <G clipPath='url(#a)'>
      <Path
        fill='url(#b)'
        d='M12 .75c-6.628 0-12 5.372-12 12s5.372 12 12 12 12-5.372 12-12-5.372-12-12-12Z'
      />
      <Path
        fill='#fff'
        d='M13.729 17.608h3.256l.512-3.308h-3.768V12.49c0-1.374.449-2.592 1.734-2.592h2.066V7.012c-.363-.05-1.13-.156-2.581-.156-3.029 0-4.805 1.6-4.805 5.243V14.3H7.03v3.308h3.113v9.093c.616.092 1.241.155 1.882.155.58 0 1.146-.053 1.704-.128v-9.12Z'
      />
    </G>
    <Defs>
      <LinearGradient
        id='b'
        x1={3.596}
        x2={21.969}
        y1={4.346}
        y2={22.719}
        gradientUnits='userSpaceOnUse'>
        <Stop stopColor='#2AA4F4' />
        <Stop offset={1} stopColor='#007AD9' />
      </LinearGradient>
      <ClipPath id='a'>
        <Path fill='#fff' d='M0 .75h24v24H0z' />
      </ClipPath>
    </Defs>
  </Svg>
);
