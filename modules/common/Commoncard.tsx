import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Link from "next/link";

// Define the props interface
interface CommonCardProps {
  cardId: string;
  title: string;
  description: string;
  onDelete: (cardId: string) => void; // Prop to handle deletion
}

const CommonCard: React.FC<CommonCardProps> = ({
  cardId,
  title,
  description,
  onDelete,
}) => {
  return (
    // 345
    <Card sx={{ maxWidth: 300 }} className="h-full mt-2 justify-between flex flex-col">
      <CardActionArea>
        <CardMedia
        className=""
          component="img"
          height="10"
          image="/rf-logo1.jpg" 
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} className="!text-[16px]">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Link href={`/card/${cardId}`} passHref>
        <Button size="small" color="primary">
          Edit
        </Button>
        </Link>

        {/* <Button size="small" color="primary">
        Delete
        </Button> */}

        <Button
          size="small"
          color="error"
          onClick={() => onDelete(cardId)} // Call onDelete with cardId
        >
          Delete
        </Button>

      </CardActions>
    </Card>
  );
};

export default CommonCard;


    {/* <Button className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none disabled:opacity-50">
          Delete
        </Button> */}


        
        {/* <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none disabled:opacity-50"
        >
          Delete
        </button> */}
