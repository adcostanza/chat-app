import * as React from "react";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToApp from "@material-ui/icons/ExitToApp";

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
};

const TemporaryDrawer = (
  props: WithStyles<typeof styles> & { toggle: () => void; open: boolean }
) => {
  const { classes } = props;

  const sideList = (
    <div className={classes.list}>
      <List>
        <ListItem
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            location.reload();
          }}
          button
        >
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary={"Logout"} />
        </ListItem>
      </List>
    </div>
  );
  return (
    <div>
      <Drawer open={props.open} onClose={props.toggle}>
        <div
          tabIndex={0}
          role="button"
          onClick={props.toggle}
          onKeyDown={props.toggle}
        >
          {sideList}
        </div>
      </Drawer>
    </div>
  );
};

export default withStyles(styles)(TemporaryDrawer);
