import React, {
  ComponentPropsWithoutRef,
  ComponentType,
} from 'react';

import PropTypes from 'prop-types';

import styled, { css } from 'styled-components';

import { getTheme } from '../utilities';

import Icon from '../Icon';

const fontSize = {
  xsmall: `12px`,
  small: `14px`,
  medium: `16px`,
  large: `18px`,
  xlarge: `20px`,
};

const btnPadding = {
  xsmall: `2px 8px`,
  small: `2px 10px`,
  medium: `2px 12px`,
  large: `2px 14px`,
  xlarge: `2px 16px`,
};

const btnPaddingOutline = {
  xsmall: `0px 10px`,
  small: `0px 12px`,
  medium: `0px 14px`,
  large: `0px 16px`,
  xlarge: `0px 18px`,
};

const btnLH = {
  xsmall: `1`,
  small: `1`,
  medium: `1`,
  large: `1`,
  xlarge: `1`,
};

const btnHeight = {
  xsmall: `22px`,
  small: `30px`,
  medium: `38px`,
  large: `46px`,
  xlarge: `54px`,
};

const buttonGap = {
  xsmall: '4px',
  small: '6px',
  medium: '8px',
  large: '10px',
  xlarge: '12px',
};

const StyledButtonInner = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledButtonLabel = styled.span`
  line-height: 1;
  white-space: nowrap;
`;

const StyledButton = styled.button<
  Required<Omit<ButtonProps, 'icon' | 'suffixIcon'>>
>`
  font-family: ${(props) => getTheme(props, `base.fontFamily`)};
  font-weight: 700;
  font-size: ${(props) => fontSize[props.size]};
  padding: ${(props) => btnPadding[props.size]};
  line-height: ${(props) => btnLH[props.size]};
  height: ${(props) =>
    props.size ? btnHeight[props.size] : btnHeight['medium']};
  gap: ${(props) =>
    props.size ? buttonGap[props.size] : buttonGap['medium']};
  margin: 0;
  border: 0;
  border-radius: 3px;
  display: inline-flex;
  text-decoration: none;
  transition: all 0.3s ease;
  align-items: center;
  justify-content: center;

  ${(props) => props.fullWidth && `width: 100%`}

  &:hover {
    cursor: pointer;
    text-decoration: none;
  }

  &:focus {
    outline: 0;
  }

  ${(props) =>
    props.color &&
    `
      background: ${getTheme(
        props,
        `button[${props.color}].background`
      )} ;
      color: ${getTheme(props, `button[${props.color}].color`)};
      span svg path {
        fill:  ${getTheme(
          props,
          `button[${props.color}].color`
        )} !important
      }
      &:hover{
        color: ${getTheme(props, `button[${props.color}].color`)};
        span svg path {
          fill:  ${getTheme(
            props,
            `button[${props.color}].color`
          )} !important
        }
        background: ${lighten(
          '0.075',
          getTheme(props, `button[${props.color}].background`)
        )};
      }
    `}

  &:disabled {
    cursor: default;
    background: ${(props) =>
      getTheme(props, `button[${props.color}].background`)};
    color: ${(props) =>
      getTheme(props, `button[${props.color}].color`)};
    opacity: 0.6;
  }
  &:active {
    background: ${(props) =>
      darken(
        '0.05',
        getTheme(props, `button[${props.color}].background`)
      )};
  }

  ${(props) => {
    const { color, background } = getTheme(
      props,
      `button[${props.color}].outline`
    );

    if (props.appearance === 'outline') {
      return `
          color: ${color};
          span svg path {
            fill:  ${color} !important
          }
          border: 2px solid ${background};
          background: none;
          padding: ${btnPaddingOutline[props.size]};
          &:hover{
            background: ${background};
            border: 2px solid ${background};
            color: #fff;
            span svg path {
              fill:  #fff !important
            }
          }
          &:active {
            background: ${lighten('0.075', background)};
          }
          }`;
    }

    if (props.appearance === 'ghost') {
      const { color, background } = getTheme(
        props,
        `button[${props.color}].ghost`
      );

      return `
          background: none;
          color: ${color};
          span svg path {
            fill:  ${color} !important
          }
          &:hover{
            color: ${color};
            span svg path {
              fill:  ${color} !important
            }
            background: ${background};
          }
          &:active {
            background: ${darken('0.15', background)};
          }
          }`;
    }

    if (props.appearance === 'text') {
      const { color, background } = getTheme(
        props,
        `button[${props.color}]`
      );

      return `
          color: ${color};

          background: none;
          &:hover{
            color: ${color};
            background: ${getTheme(
              props,
              `button[${props.color}].ghost.background`
            )};
          }
          }`;
    }
  }}

  ${(props) => {
    return (
      props.disabled &&
      css`
        cursor: default;
        background: ${getTheme(
          props,
          `button.background[${props.color}]`
        )};
        color: #cbced1;
      `
    );
  }}
`;

const iconSize = {
  xsmall: '14px',
  small: '18px',
  medium: '20px',
  large: '24px',
  xlarge: '28px',
};

const colors = [
  'primary',
  'secondary',
  'complementary',
  'warning',
  'danger',
  'success',
];

type ButtonProps = {
  /**
   * Disable the button
   */
  disabled?: boolean;
  /**
   * The child element
   */
  children?: React.ReactNode;
  /**
   * Set the size of the Button
   */
  size?: keyof typeof iconSize;
  /**
   * Place the icon before button text or an icon on its own
   */
  icon?: string;
  /**
   * Place the icon after  the button text
   */
  suffixIcon?: string;
  /**
   * Set the color of the Button
   */
  color?:
    | string
    | 'default'
    | 'primary'
    | 'secondary'
    | 'complementary'
    | 'warning'
    | 'danger'
    | 'success';
  /**
   * Change the component type of the Button, this could be `button`, `a`,`span`, `div` or a React component
   */
  as?: string | ComponentType<any>;
  /**
   * Set the appearance of the Button
   */
  appearance?: 'solid' | 'outline' | 'ghost' | 'disabled' | 'text';
  /**
   * Set the button fullWidth
   */
  fullWidth?: boolean;
};

const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & ComponentPropsWithoutRef<'button'>
>(
  (
    {
      children,
      size = 'medium',
      icon = undefined,
      suffixIcon = undefined,
      color = 'default',
      as = 'button',
      appearance = 'solid',
      fullWidth = undefined,
      disabled = false,
      ...props
    },
    ref
  ) => (
    <StyledButton
      ref={ref}
      appearance={appearance}
      fullWidth={fullWidth}
      color={color}
      size={size}
      disabled={disabled}
      as={as}
      {...props}
    >
      <StyledButtonInner>
        {icon && (
          <Icon
            size={size ? iconSize[size] : iconSize['medium']}
            icon={icon}
            color="#fff"
          />
        )}
        {children && (
          <StyledButtonLabel>{children}</StyledButtonLabel>
        )}
        {suffixIcon && (
          <Icon
            size={size ? iconSize[size] : iconSize['medium']}
            icon={suffixIcon}
            color="#fff"
          />
        )}
      </StyledButtonInner>
    </StyledButton>
  )
);

Button.propTypes = {
  /**
   * The child element
   */
  children: PropTypes.node,
  /**
   * Set the size of the Button
   */
  size: PropTypes.oneOf([
    'xsmall',
    'small',
    'medium',
    'large',
    'xlarge',
  ]),
  /**
   * Set the color of the Button
   */
  color: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'complementary',
    'warning',
    'danger',
    'success',
  ]),
  /**
   * Set the appearance of the Button
   */
  appearance: PropTypes.oneOf([
    'solid',
    'outline',
    'ghost',
    'disabled',
    'text',
  ]),
  /**
   * Change the component type of the Button, this could be `button`, `a`,`span`, `div` or a React component
   */
  as: PropTypes.elementType,
  /**
   * Place the icon before button text or an icon on its own
   */
  icon: PropTypes.string,
  /**
   * Place the icon after  the button text
   */
  suffixIcon: PropTypes.string,
  /**
   * Set the button fullWidth
   */
  fullWidth: PropTypes.bool,
  /**
   * Disable the button
   */
  disabled: PropTypes.bool,
};

export default Button;
