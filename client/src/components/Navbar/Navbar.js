import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Link, useLocation, useNavigate } from "react-router-dom";
import decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import * as actionType from "../../constants/actionTypes";
import "./navbar.css";
import { searchProducts } from "../../actions/allProducts";
import { Button } from "@mui/material";
import Upload from "../Upload/Upload";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  // pointerEvents: "none",
  zIndex:99,
  right:0,
  cursor:"pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function NewBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const [searchParam, setsearchParam] = React.useState("");
  const [showUploadPopup, setShowUploadPopUp] = React.useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useNavigate();
  const cart = useSelector(state=> state.cart)
  const searchRef = React.useRef("");
  
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    handleMenuClose()
    history.push("/");

    setUser(null);
  };

  React.useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);


  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSearch = (e)=>{
    history.push("/search")
    dispatch(searchProducts(searchRef.current.value));
    searchRef.current.value = ""
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {user ? (
        <>
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </>
      ) : (
        <>
          <MenuItem onClick={handleMenuClose}>
            <Link className="login-link" to="/sign-up">
              Sign Up
            </Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link className="login-link" to="/login">
              Login
            </Link>
          </MenuItem>
        </>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
        {user ? (<>
      <MenuItem>
      <Link to="/cart">
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={cart.length} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        </Link>
        <Link to="/cart">Cart</Link>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      </>) : <>
      <MenuItem onClick={handleMenuClose}>
            <Link className="login-link" to="/sign-up">
              Sign Up
            </Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link className="login-link" to="/login">
              Login
            </Link>
          </MenuItem>
          </>}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed" color="primary" /* className={show? "header" : "header sticky"} */
      >
         <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "block", sm: "none" },color:"white", textAlign:"center", margin:"10px 0 -5px 0" }}
          >
            <Link to="/" className="title">Video Sharing</Link>
          </Typography>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block"},  color:"white" }}
          >
            <Link to="/" className="title">Video Sharing</Link>
          </Typography>
          <Search>
            <SearchIconWrapper onClick={handleSearch}>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onKeyPress={(e)=>e.key=="Enter" && handleSearch()}
              inputRef={searchRef}
            />
          </Search>
          <Button onClick={()=>setShowUploadPopUp(true)}>+</Button>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {user && (
                <Link to="/cart">
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={cart.length} color="error">
                  <ShoppingCartIcon sx={{color:"white"}}/>
                </Badge>
              </IconButton>
              </Link>
            )}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Upload show={showUploadPopup} setShow={setShowUploadPopUp}/>
    </Box>
  );
}


