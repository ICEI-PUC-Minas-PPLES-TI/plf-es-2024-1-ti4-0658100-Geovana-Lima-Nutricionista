import React from 'react'
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';
import { Button } from 'antd';

type ToggleThemeType = () => void;

interface ToggleThemeButtonProps {
  ToggleTheme: ToggleThemeType;
   darkTheme: boolean;
}

const ToggleThemeButton: React.FC<ToggleThemeButtonProps> = ({ ToggleTheme, darkTheme }) => {
  return (
    <div className="toggle-theme-btn">
        <Button onClick={ToggleTheme}>
            {darkTheme ? <HiOutlineSun/> :
            <HiOutlineMoon />}
        </Button>
    </div>
  )
}

export default ToggleThemeButton