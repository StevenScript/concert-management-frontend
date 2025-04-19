import React from "react";
import {
  Card as MuiCard,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * A reusable content card displaying an optional image, title,
 * description, and an optional action button.
 */

const StyledCard = styled(MuiCard)`
  max-width: 345px;
  margin: 16px;
`;

const Card = ({ image, title, description, onActionClick, actionLabel }) => {
  return (
    <StyledCard>
      {image && (
        <CardMedia component="img" height="140" image={image} alt={title} />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        {description && (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}
      </CardContent>
      {onActionClick && actionLabel && (
        <CardActions>
          <Button size="small" onClick={onActionClick}>
            {actionLabel}
          </Button>
        </CardActions>
      )}
    </StyledCard>
  );
};

Card.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  onActionClick: PropTypes.func,
  actionLabel: PropTypes.string,
};

Card.defaultProps = {
  image: "",
  description: "",
  onActionClick: null,
  actionLabel: "",
};

export default Card;
