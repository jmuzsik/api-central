import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import Popover from "../Reuseable/Popover";
import { wordPoemCode } from "../../codeSnippets";

const styles = (theme) => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    margin: `${theme.spacing.unit * 3}px auto`,
  }),
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  poem: {
    whiteSpace: "break-spaces",
  },
  [theme.breakpoints.up("sm")]: {
    root: {
      width: "75%",
    },
  },
  popover: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  [theme.breakpoints.up("md")]: {
    root: {
      width: "50%",
    },
  },
});

function Poem(props) {
  const { classes, poem } = props;

  return (
    <React.Fragment>
      <Paper className={classes.root} elevation={4}>
        <Typography align="center" variant="headline" gutterBottom>
          <i>Poem</i>
        </Typography>
        <div className={classes.container}>
          <Typography component="p" className={classes.poem}>
            {poem}
          </Typography>
        </div>
      </Paper>
      <Typography className={classes.popover}>
        Code Snippet: <Popover text={wordPoemCode} />{" "}
      </Typography>
    </React.Fragment>
  );
}

Poem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Poem);
