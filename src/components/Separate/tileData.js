import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import PaletteIcon from '@material-ui/icons/Palette'
import HomeIcon from '@material-ui/icons/Home'
import BookIcon from '@material-ui/icons/Book'
import { Link } from 'react-router-dom'

export const navLinks = (
  <div>
    <Link to="/" style={{ textDecoration: 'none' }}>
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </Link>
    <Link to="/cooper-hewitt" style={{ textDecoration: 'none' }}>
      <ListItem button>
        <ListItemIcon>
          <PaletteIcon />
        </ListItemIcon>
        <ListItemText primary="Museum" />
      </ListItem>
    </Link>
    <Link to="/words" style={{ textDecoration: 'none' }}>
      <ListItem button>
        <ListItemIcon>
          <BookIcon />
        </ListItemIcon>
        <ListItemText primary="Words" />
      </ListItem>
    </Link>
  </div>
)
