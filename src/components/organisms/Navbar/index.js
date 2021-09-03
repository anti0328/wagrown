import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { iconsTypes } from '../../../helpers/iconsTypes';
import { routes } from '../../../helpers/routes';
import useScrollEvent from '../../../hooks/useScrollEvent';
import RootContext from '../../../context/RootContext';
import AuthContext from '../../../context/AuthContext';
import Button from '../../atoms/Button';
import Logo from '../../atoms/Logo';
import NavigationLink from '../../atoms/NavigationLink';
import UserMenu from '../../molecules/UserMenu';
import Hamburger from '../../atoms/Hamburger';
import DrawerMenu from '../DrawerMenu';
import {
  StyledNavbar,
  StyledNavButtons,
  StyledNavListItem,
  StyledNavList,
  StyledButtonWrapper,
  StyledNotificationCount,
  StyledLink,
  StyledUserMenuWrapper,
} from './StyledNavbar';

const Navbar = () => {
  const {
    cartProductsQuantity,
    isHomeRendered,
    isMenuOpen,
    toggleMenuOpen,
    setSearchVisibility,
    setCartVisibility,
  } = useContext(RootContext);
  const { currentUser } = useContext(AuthContext);

  const [whiteColor, setWhiteColor] = useState(true);
  const [small, setSmall] = useState(false);

  const scrollEvent = useScrollEvent();

  useEffect(() => {
    const scrollPosition = document.scrollingElement.scrollTop;

    if (scrollPosition === 0 && isHomeRendered) {
      setWhiteColor(true);
      setSmall(false);
    } else if (scrollPosition === 0 && !isHomeRendered) {
      setWhiteColor(false);
      setSmall(false);
    } else {
      setWhiteColor(false);
      setSmall(true);
    }
  }, [scrollEvent, isHomeRendered]);

  return (
    <StyledNavbar small={small} transparent={whiteColor}>
      <Link to={routes.home}>
        <Logo whiteIcon={whiteColor} />
      </Link>

      <StyledNavList white={whiteColor}>
        <StyledNavListItem>
          <NavigationLink to={routes.home}>Home</NavigationLink>
        </StyledNavListItem>
        <StyledNavListItem>
          <NavigationLink to={routes.products}>Products</NavigationLink>
        </StyledNavListItem>
        <StyledNavListItem>
          <NavigationLink to={routes.contact}>Contact</NavigationLink>
        </StyledNavListItem>
      </StyledNavList>

      <StyledNavButtons>
        <Button
          whiteIcon={whiteColor}
          icon={iconsTypes.SearchIcon}
          onClickFn={() => setSearchVisibility(true)}
        />
        <StyledButtonWrapper>
          <Button
            whiteIcon={whiteColor}
            icon={iconsTypes.CartIcon}
            onClickFn={() => setCartVisibility(true)}
          />

          <StyledNotificationCount
            isVisible={cartProductsQuantity !== 0}
            value={cartProductsQuantity}
          />
        </StyledButtonWrapper>
        <StyledUserMenuWrapper>
          {currentUser ? (
            <UserMenu white={whiteColor} />
          ) : (
            <StyledLink to={routes.login}>
              <iconsTypes.AvatarIcon fill={whiteColor ? 'white' : ''} />
            </StyledLink>
          )}
        </StyledUserMenuWrapper>
        <Hamburger
          isOpen={isMenuOpen}
          onClickFn={toggleMenuOpen}
          whiteIcon={whiteColor}
        />
      </StyledNavButtons>
      <DrawerMenu isOpen={isMenuOpen} />
    </StyledNavbar>
  );
};

export default Navbar;
