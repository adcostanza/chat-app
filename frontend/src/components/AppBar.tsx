import * as React from "react";
import { useState } from "react";
import { createStyles, WithStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import NavDrawer from "./NavDrawer";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = createStyles({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

export interface Props extends WithStyles<typeof styles> {}

function ButtonAppBar(props: Props) {
  const [navActive, setNavActive] = useState(false);
  const { classes } = props;
  return (
    <div className={classes.root} style={{ width: "100%" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={() => setNavActive(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
           Chat App
          </Typography>
        </Toolbar>
      </AppBar>
      <NavDrawer open={navActive} toggle={() => setNavActive(!navActive)} />
    </div>
  );
}

export default withStyles(styles)(ButtonAppBar);