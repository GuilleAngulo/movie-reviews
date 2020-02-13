import React, { useContext } from "react";
import Switch from "react-switch";
import { shade } from 'polished';
import { ThemeContext } from 'styled-components';


const SwitchButton= ({ toggleTheme }) => {
    const { colors, title } = useContext(ThemeContext);
  
    return (
        <Switch
          onChange={toggleTheme}
          checked={title === 'dark'}
          checkedIcon={false}
          uncheckedIcon={false}
          height={15}
          width={40}
          handleDiameter={20}
          offColor={shade(0.10, colors.primary)}
          onColor={colors.secondary}
          offHandleColor={colors.secondary}
          onHandleColor={colors.primary}
        />
    );
  };
  
  export default SwitchButton;