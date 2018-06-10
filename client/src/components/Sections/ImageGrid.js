import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import GridList from "@material-ui/core/GridList"
import GridListTile from "@material-ui/core/GridListTile"
// import tileData from './tileData';

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {},
  subheader: {
    width: "100%",
  },
  [theme.breakpoints.up("md")]: {
    root: {
      justifyContent: "flex-end",
      width: "50%",
    },
  },
})

// The example data is structured as follows:
const tileData = [
  {
    img:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/LH_95.jpg/440px-LH_95.jpg",
    title: "Image",
    author: "author",
    cols: 1,
  },
  {
    img:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/LH_95.jpg/440px-LH_95.jpg",
    title: "Image",
    author: "author",
    cols: 1,
  },
  {
    img:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/LH_95.jpg/440px-LH_95.jpg",
    title: "Image",
    author: "author",
    cols: 1,
  },
  {
    img:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/LH_95.jpg/440px-LH_95.jpg",
    title: "Image",
    author: "author",
    cols: 1,
  },
  {
    img:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/LH_95.jpg/440px-LH_95.jpg",
    title: "Image",
    author: "author",
    cols: 1,
  },
  {
    img:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/LH_95.jpg/440px-LH_95.jpg",
    title: "Image",
    author: "author",
    cols: 1,
  },
  {
    img:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/LH_95.jpg/440px-LH_95.jpg",
    title: "Image",
    author: "author",
    cols: 1,
  },
  {
    img:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/LH_95.jpg/440px-LH_95.jpg",
    title: "Image",
    author: "author",
    cols: 1,
  },
]
function ImageGrid(props) {
  const { classes } = props

  return (
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={2}>
        {tileData.map(tile => (
          <GridListTile key={tile.img} cols={tile.cols || 1}>
            <img src={tile.img} alt={tile.title} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}

ImageGrid.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ImageGrid)
