import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Avatar, Box, Divider, Drawer, List, Typography, makeStyles } from "@material-ui/core";
import { deepOrange, indigo } from "@material-ui/core/colors";
import {
   List as ListIcon,
   BarChart as BarChartIcon,
   Lock as LockIcon,
   Settings as SettingsIcon,
   ShoppingBag as ShoppingBagIcon,
   ShoppingCart as ShoppingCartIcon,
   User as UserIcon,
   UserPlus as UserPlusIcon,
   Briefcase as BriefcaseIcon,
   Users as UsersIcon
} from "react-feather";
import NavItem from "./NavItem";
import { AppContext } from "../../../state/appStateManagement";

const user = {
   avatar: "/static/images/avatars/avatar_6.png",
   jobTitle: "Senior Developer",
   name: "Katarina Smith"
};

const items = [
   {
      href: "/app/dashboard",
      icon: BarChartIcon,
      title: "Dashboard",
      role: ["vendor", "admin"]
   },
   // {
   //    href: "/app/customers",
   //    icon: UsersIcon,
   //    title: "Customers",
   //    role: ["admin"]
   // },
   {
      href: "/app/products",
      icon: ShoppingBagIcon,
      title: "Products",
      role: ["customer", "vendor", "admin"]
   },
   {
      href: "/app/account",
      icon: UserIcon,
      title: "Account",
      role: ["customer", "vendor", "admin"]
   },
   // {
   //    href: "/app/vendors",
   //    icon: BriefcaseIcon,
   //    title: "Vendors",
   //    role: ["admin"]
   // },
   // {
   //    href: "/app/orders",
   //    icon: ListIcon,
   //    title: "Orders",
   //    role: ["customer", "vendor", "admin"]
   // },
   {
      href: "/app/cart",
      icon: ShoppingCartIcon,
      title: "Cart",
      role: ["customer"]
   }

   //  {
   //     href: "/app/settings",
   //     icon: SettingsIcon,
   //     title: "Settings",
   //  },
   //  {
   //     href: "/login",
   //     icon: LockIcon,
   //     title: "Login"
   //  },
   //  {
   //     href: "/register",
   //     icon: UserPlusIcon,
   //     title: "Register"
   //  },
   //  {
   //     href: "/404",
   //     icon: AlertCircleIcon,
   //     title: "Error"
   //  }
];

const useStyles = makeStyles((theme) => ({
   mobileDrawer: {
      width: 256
   },
   desktopDrawer: {
      width: 256,
      top: 64,
      height: "calc(100% - 64px)"
   },
   avatar: {
      cursor: "pointer",
      width: 50,
      height: 50,
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: indigo[300]
   },
   name: {
      paddingTop: "8px"
   }
}));

const NavBar = () => {
   const classes = useStyles();
   const {
      state: {
         role,
         tokenData: { userInfo }
      }
   } = useContext(AppContext);

   const initials = userInfo?.firstName?.substring(0, 1) + userInfo?.lastName?.substring(0, 1);

   const content = (
      <Box height="100%" display="flex" flexDirection="column">
         <Box alignItems="center" display="flex" flexDirection="column" p={2}>
            <Avatar className={classes.avatar} component={RouterLink} to="/app/account">
               {initials ? initials : "A"}
            </Avatar>
            <Typography className={classes.name} color="textPrimary" variant="h5">
               {initials ? userInfo.firstName + userInfo.lastName : "Admin"}
            </Typography>
         </Box>
         <Divider />
         <Box p={2}>
            <List>
               {items
                  .filter((item) => item.role.includes(role))
                  .map((item) => (
                     <NavItem
                        href={item.href}
                        key={item.title}
                        title={item.title}
                        icon={item.icon}
                     />
                  ))}
            </List>
         </Box>
      </Box>
   );

   return (
      <>
         <Drawer anchor="left" classes={{ paper: classes.desktopDrawer }} open variant="persistent">
            {content}
         </Drawer>
      </>
   );
};

export default NavBar;
