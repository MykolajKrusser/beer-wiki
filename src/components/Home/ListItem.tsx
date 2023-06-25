import Tooltip from "@mui/material/Tooltip";
import {Checkbox, Link} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import type {Beer} from '../../types';
import {ChangeEvent, Fragment, MouseEvent} from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

interface AddFn {
  (beer: Beer, event: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>, checked: boolean): any;
}

const ListItem = (props: { beer: Beer; addFn: AddFn; action: string }) => {
  return (
    <li>
      {
        props.action === 'add' &&
        <Fragment>
          <Tooltip placement="left" title="Save beer company">
            <Checkbox
              checked={props.beer.checked}
              onChange={(event, checked) => props.addFn(props.beer, event, checked)}/>
          </Tooltip>
          <Link component={RouterLink} to={`/beer/${props.beer.id}`}>
            {props.beer.name}
          </Link>
        </Fragment>
      }
      {
        props.action === 'remove' &&
        <Fragment>
          <Tooltip placement="left" title="Remove beer company">
            <IconButton
              aria-label="delete"
              onClick={(event) => props.addFn(props.beer, event, false)}>
              <DeleteIcon/>
            </IconButton>
          </Tooltip>
          <Link component={RouterLink} to={`/beer/${props.beer.id}`}>
            {props.beer.name}
          </Link>
        </Fragment>
      }
    </li>
  )
}

export default ListItem
